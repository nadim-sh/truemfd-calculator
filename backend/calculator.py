from models import SIPResult, YearlyBreakdown
from typing import List, Tuple


def calculate_sip(
    monthly_investment: float,
    annual_return_rate: float,
    duration_years: float
) -> SIPResult:
    r        = annual_return_rate / 12 / 100
    n        = duration_years * 12
    P        = monthly_investment
    maturity = P * ((pow(1 + r, n) - 1) / r) * (1 + r)
    invested = P * n
    gains    = maturity - invested
    return SIPResult(
        total_invested=round(invested),
        estimated_returns=round(gains),
        maturity_amount=round(maturity),
        wealth_gained_percent=f"{(gains / invested * 100):.2f}",
    )


def calculate_step_up_sip(
    monthly_investment: float,
    annual_return_rate: float,
    duration_years: int,
    annual_step_up_percent: float,
) -> Tuple[SIPResult, List[YearlyBreakdown]]:
    r            = annual_return_rate / 12 / 100
    step         = annual_step_up_percent / 100
    total_months = duration_years * 12
    current_sip  = monthly_investment
    total_invested = 0.0
    total_maturity = 0.0
    yearly_data: List[YearlyBreakdown] = []

    for year in range(1, duration_years + 1):
        year_invested = 0.0
        year_maturity = 0.0
        for month in range(1, 13):
            months_elapsed   = (year - 1) * 12 + month
            months_remaining = total_months - months_elapsed
            fv               = current_sip * pow(1 + r, months_remaining + 1)
            year_invested   += current_sip
            year_maturity   += fv
        total_invested += year_invested
        total_maturity += year_maturity
        yearly_data.append(YearlyBreakdown(
            year=year,
            monthly_sip=round(current_sip),
            invested_so_far=round(total_invested),
            maturity_value=round(total_maturity),
        ))
        current_sip = current_sip * (1 + step)

    gains = total_maturity - total_invested
    return SIPResult(
        total_invested=round(total_invested),
        estimated_returns=round(gains),
        maturity_amount=round(total_maturity),
        wealth_gained_percent=f"{(gains / total_invested * 100):.2f}",
    ), yearly_data


def calculate_lumpsum(
    investment_amount: float,
    annual_return_rate: float,
    duration_years: float
) -> SIPResult:
    P        = investment_amount
    r        = annual_return_rate / 100
    n        = duration_years
    maturity = P * pow(1 + r, n)
    gains    = maturity - P
    return SIPResult(
        total_invested=round(P),
        estimated_returns=round(gains),
        maturity_amount=round(maturity),
        wealth_gained_percent=f"{(gains / P * 100):.2f}",
    )


def calculate_comparison(
    monthly_investment: float,
    annual_return_rate: float,
    duration_years: float,
) -> dict:
    sip_result     = calculate_sip(monthly_investment, annual_return_rate, duration_years)
    lumpsum_amount = monthly_investment * 12 * duration_years
    lumpsum_result = calculate_lumpsum(lumpsum_amount, annual_return_rate, duration_years)
    winner         = "SIP" if sip_result.maturity_amount > lumpsum_result.maturity_amount else "Lumpsum"
    difference     = abs(sip_result.maturity_amount - lumpsum_result.maturity_amount)
    return {
        "sip":     sip_result.model_dump(),
        "lumpsum": lumpsum_result.model_dump(),
        "comparison": {
            "same_total_investment":  round(lumpsum_amount),
            "better_option":          winner,
            "difference_in_maturity": difference,
            "insight": (
                f"Lumpsum wins by ₹{difference:,} because full corpus compounds from Day 1."
                if winner == "Lumpsum"
                else f"SIP wins by ₹{difference:,} due to disciplined monthly compounding."
            ),
        },
    }
