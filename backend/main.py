from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (SIPRequest, StepUpSIPRequest, LumpsumRequest,
                    CompareRequest, XIRRRequest, IRRRequest,
                    GoalSIPRequest, SWPRequest, PPFRequest)
from calculator import (calculate_sip, calculate_step_up_sip,
                        calculate_lumpsum, calculate_comparison,
                        calculate_goal_sip, calculate_swp, calculate_ppf)
from xirr import xirr, irr

app = FastAPI(
    title="SIP Calculator API",
    description="Standard SIP · Step-Up SIP · Lumpsum · Comparison · XIRR/IRR",
    version="3.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DISCLAIMER = (
    "Mutual fund investments are subject to market risks. "
    "Returns shown are illustrative and not guaranteed."
)

@app.get("/", tags=["Health"])
def root():
    return {"status": "✅ SIP Calculator API v3.0.0 running"}

@app.post("/sip/calculate", tags=["SIP"])
def sip_post(req: SIPRequest):
    result = calculate_sip(req.monthly_investment, req.annual_return_rate, req.duration_years)
    return {"type": "Standard SIP", "inputs": req.model_dump(),
            "results": result.model_dump(), "currency": "INR", "disclaimer": DISCLAIMER}

@app.get("/sip/calculate", tags=["SIP"])
def sip_get(
    monthly_investment: float = Query(..., gt=0),
    annual_return_rate: float = Query(..., gt=0),
    duration_years: float     = Query(..., gt=0),
):
    result = calculate_sip(monthly_investment, annual_return_rate, duration_years)
    return {"type": "Standard SIP",
            "inputs": {"monthly_investment": monthly_investment,
                       "annual_return_rate": annual_return_rate,
                       "duration_years": duration_years},
            "results": result.model_dump(), "currency": "INR", "disclaimer": DISCLAIMER}

@app.post("/sip/step-up", tags=["Step-Up SIP"])
def step_up_post(req: StepUpSIPRequest):
    result, breakdown = calculate_step_up_sip(
        req.monthly_investment, req.annual_return_rate,
        req.duration_years, req.annual_step_up_percent)
    return {"type": "Step-Up SIP", "inputs": req.model_dump(),
            "results": result.model_dump(),
            "yearly_breakdown": [y.model_dump() for y in breakdown],
            "currency": "INR", "disclaimer": DISCLAIMER}

@app.get("/sip/step-up", tags=["Step-Up SIP"])
def step_up_get(
    monthly_investment: float     = Query(..., gt=0),
    annual_return_rate: float     = Query(..., gt=0),
    duration_years: int           = Query(..., gt=0),
    annual_step_up_percent: float = Query(..., ge=0, le=100),
):
    result, breakdown = calculate_step_up_sip(
        monthly_investment, annual_return_rate, duration_years, annual_step_up_percent)
    return {"type": "Step-Up SIP",
            "inputs": {"monthly_investment": monthly_investment,
                       "annual_return_rate": annual_return_rate,
                       "duration_years": duration_years,
                       "annual_step_up_percent": annual_step_up_percent},
            "results": result.model_dump(),
            "yearly_breakdown": [y.model_dump() for y in breakdown],
            "currency": "INR", "disclaimer": DISCLAIMER}

@app.post("/lumpsum/calculate", tags=["Lumpsum"])
def lumpsum_post(req: LumpsumRequest):
    result = calculate_lumpsum(req.investment_amount, req.annual_return_rate, req.duration_years)
    return {"type": "Lumpsum", "inputs": req.model_dump(),
            "results": result.model_dump(), "currency": "INR", "disclaimer": DISCLAIMER}

@app.get("/lumpsum/calculate", tags=["Lumpsum"])
def lumpsum_get(
    investment_amount: float  = Query(..., gt=0),
    annual_return_rate: float = Query(..., gt=0),
    duration_years: float     = Query(..., gt=0),
):
    result = calculate_lumpsum(investment_amount, annual_return_rate, duration_years)
    return {"type": "Lumpsum",
            "inputs": {"investment_amount": investment_amount,
                       "annual_return_rate": annual_return_rate,
                       "duration_years": duration_years},
            "results": result.model_dump(), "currency": "INR", "disclaimer": DISCLAIMER}

@app.post("/compare", tags=["Comparison"])
def compare_post(req: CompareRequest):
    data = calculate_comparison(
        req.monthly_investment, req.annual_return_rate, req.duration_years)
    return {"type": "SIP vs Lumpsum Comparison", "inputs": req.model_dump(),
            **data, "currency": "INR", "disclaimer": DISCLAIMER}

@app.get("/compare", tags=["Comparison"])
def compare_get(
    monthly_investment: float = Query(..., gt=0),
    annual_return_rate: float = Query(..., gt=0),
    duration_years: float     = Query(..., gt=0),
):
    data = calculate_comparison(monthly_investment, annual_return_rate, duration_years)
    return {"type": "SIP vs Lumpsum Comparison",
            "inputs": {"monthly_investment": monthly_investment,
                       "annual_return_rate": annual_return_rate,
                       "duration_years": duration_years},
            **data, "currency": "INR", "disclaimer": DISCLAIMER}

@app.post("/xirr", tags=["XIRR / IRR"])
def calculate_xirr(req: XIRRRequest):
    try:
        cashflows = [(cf.date, cf.amount) for cf in req.cashflows]
        rate = xirr(cashflows)
        return {"xirr_percent": round(rate * 100, 4),
                "xirr_decimal": round(rate, 6),
                "interpretation": f"Your investment earned {rate*100:.2f}% annualized return.",
                "disclaimer": DISCLAIMER}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/irr", tags=["XIRR / IRR"])
def calculate_irr(req: IRRRequest):
    try:
        rate_per_period = irr(req.cashflows)
        annual_rate     = pow(1 + rate_per_period, req.periods_per_year) - 1
        return {"irr_per_period_percent": round(rate_per_period * 100, 4),
                "annualized_irr_percent": round(annual_rate * 100, 4),
                "periods_per_year": req.periods_per_year,
                "interpretation": f"Annualized IRR = {annual_rate*100:.2f}%",
                "disclaimer": DISCLAIMER}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

