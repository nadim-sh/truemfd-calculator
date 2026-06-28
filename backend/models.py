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
