from pydantic import BaseModel, Field
from typing import List
from datetime import date


class SIPRequest(BaseModel):
    monthly_investment: float = Field(..., gt=0)
    annual_return_rate: float = Field(..., gt=0)
    duration_years: float     = Field(..., gt=0)


class StepUpSIPRequest(BaseModel):
    monthly_investment: float     = Field(..., gt=0)
    annual_return_rate: float     = Field(..., gt=0)
    duration_years: int           = Field(..., gt=0)
    annual_step_up_percent: float = Field(..., ge=0, le=100)


class LumpsumRequest(BaseModel):
    investment_amount: float  = Field(..., gt=0)
    annual_return_rate: float = Field(..., gt=0)
    duration_years: float     = Field(..., gt=0)


class CompareRequest(BaseModel):
    monthly_investment: float = Field(..., gt=0)
    annual_return_rate: float = Field(..., gt=0)
    duration_years: float     = Field(..., gt=0)


class CashFlow(BaseModel):
    date: date
    amount: float


class XIRRRequest(BaseModel):
    cashflows: List[CashFlow] = Field(..., min_length=2)


class IRRRequest(BaseModel):
    cashflows: List[float] = Field(..., min_length=2)
    periods_per_year: int  = Field(12, ge=1)


class SIPResult(BaseModel):
    total_invested: int
    estimated_returns: int
    maturity_amount: int
    wealth_gained_percent: str


class YearlyBreakdown(BaseModel):
    year: int
    monthly_sip: int
    invested_so_far: int
    maturity_value: int
class GoalSIPRequest(BaseModel):
    goal_amount: float        = Field(..., gt=0, description="Target corpus amount in INR")
    annual_return_rate: float = Field(..., gt=0, description="Expected annual return %")
    duration_years: float     = Field(..., gt=0, description="Duration in years")


class SWPRequest(BaseModel):
    corpus_amount: float      = Field(..., gt=0, description="Starting corpus in INR")
    monthly_withdrawal: float = Field(..., gt=0, description="Monthly withdrawal amount")
    annual_return_rate: float = Field(..., gt=0, description="Expected annual return %")
    duration_years: int       = Field(..., gt=0, description="Duration in years")


class PPFRequest(BaseModel):
    annual_investment: float  = Field(..., gt=0, le=150000,
                                      description="Annual PPF investment (max ₹1.5L)")
    duration_years: int       = Field(15, ge=15, le=50,
                                      description="Min 15 years, extendable in blocks of 5")
    class SIPLumpsumRequest(BaseModel):
    lumpsum_amount:    float = Field(..., gt=0, description="One-time lumpsum investment in INR")
    monthly_sip:       float = Field(..., gt=0, description="Monthly SIP amount in INR")
    annual_return_rate: float = Field(..., gt=0, description="Expected annual return %")
    duration_years:    float = Field(..., gt=0, description="Investment duration in years")
class SIPLumpsumRequest(BaseModel):
    lumpsum_amount:     float = Field(..., gt=0, description="One-time lumpsum investment in INR")
    monthly_sip:        float = Field(..., gt=0, description="Monthly SIP amount in INR")
    annual_return_rate: float = Field(..., gt=0, description="Expected annual return %")
    duration_years:     float = Field(..., gt=0, description="Investment duration in years")

