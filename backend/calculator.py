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
def calculate_goal_sip(
    goal_amount: float,
    annual_return_rate: float,
    duration_years: float,
) -> dict:
    """
    Reverse SIP: How much monthly SIP needed to reach a goal?
    Formula: P = Goal × r / [((1+r)^n - 1) × (1+r)]
    """
    r = annual_return_rate / 12 / 100
    n = duration_years * 12

    monthly_sip  = goal_amount * r / ((pow(1 + r, n) - 1) * (1 + r))
    total_invest = monthly_sip * n
    total_gains  = goal_amount - total_invest

    return {
        "goal_amount":             round(goal_amount),
        "required_monthly_sip":    round(monthly_sip),
        "total_investment":        round(total_invest),
        "total_gains":             round(total_gains),
        "duration_years":          duration_years,
        "annual_return_rate":      annual_return_rate,
        "wealth_gained_percent":   f"{(total_gains / total_invest * 100):.2f}",
    }


def calculate_swp(
    corpus_amount: float,
    monthly_withdrawal: float,
    annual_return_rate: float,
    duration_years: int,
) -> dict:
    """
    SWP: Monthly withdrawal from a corpus while it keeps earning.
    Simulate month by month.
    """
    r       = annual_return_rate / 12 / 100
    balance = corpus_amount
    total_withdrawn = 0.0
    yearly_data = []

    for year in range(1, duration_years + 1):
        for month in range(1, 13):
            if balance <= 0:
                balance = 0
                break
            balance  = balance * (1 + r) - monthly_withdrawal
            total_withdrawn += monthly_withdrawal

        yearly_data.append({
            "year":             year,
            "balance":          max(round(balance), 0),
            "total_withdrawn":  round(total_withdrawn),
        })

        if balance <= 0:
            break

    months_corpus_lasts = 0
    bal = corpus_amount
    while bal > 0:
        bal = bal * (1 + r) - monthly_withdrawal
        months_corpus_lasts += 1
        if months_corpus_lasts > duration_years * 12:
            break

    return {
        "corpus_amount":         round(corpus_amount),
        "monthly_withdrawal":    round(monthly_withdrawal),
        "annual_return_rate":    annual_return_rate,
        "duration_years":        duration_years,
        "final_balance":         max(round(balance), 0),
        "total_withdrawn":       round(total_withdrawn),
        "corpus_survives":       balance > 0,
        "yearly_breakdown":      yearly_data,
    }


def calculate_ppf(
    annual_investment: float,
    duration_years: int = 15,
) -> dict:
    """
    PPF: 15-year lock-in, 7.1% interest (compounded annually).
    Indian government scheme.
    """
    RATE = 7.1 / 100
    balance      = 0.0
    total_invest = 0.0
    yearly_data  = []

    for year in range(1, duration_years + 1):
        balance      = (balance + annual_investment) * (1 + RATE)
        total_invest += annual_investment
        yearly_data.append({
            "year":          year,
            "invested":      round(total_invest),
            "balance":       round(balance),
        })

    gains = balance - total_invest
    return {
        "annual_investment":      round(annual_investment),
        "duration_years":         duration_years,
        "interest_rate":          7.1,
        "total_invested":         round(total_invest),
        "estimated_returns":      round(gains),
        "maturity_amount":        round(balance),
        "wealth_gained_percent":  f"{(gains / total_invest * 100):.2f}",
        "yearly_breakdown":       yearly_data,
        "tax_benefit":            "Investment qualifies for deduction under Section 80C",
    }
