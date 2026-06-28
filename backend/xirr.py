from datetime import date
from typing import List, Tuple
import math


def xirr(cashflows: List[Tuple[date, float]], guess: float = 0.1) -> float:
    if not cashflows:
        raise ValueError("No cashflows provided")

    dates, amounts = zip(*cashflows)
    min_date = min(dates)

    def year_fraction(d: date) -> float:
        return (d - min_date).days / 365.0

    t = [year_fraction(d) for d in dates]

    def npv(rate: float) -> float:
        return sum(cf / math.pow(1 + rate, ti) for cf, ti in zip(amounts, t))

    def npv_deriv(rate: float) -> float:
        return sum(
            -ti * cf / math.pow(1 + rate, ti + 1)
            for cf, ti in zip(amounts, t)
        )

    rate = guess
    for _ in range(1000):
        f  = npv(rate)
        f_ = npv_deriv(rate)
        if abs(f_) < 1e-12:
            break
        new_rate = rate - f / f_
        if abs(new_rate - rate) < 1e-8:
            return new_rate
        rate = new_rate

    raise ValueError("XIRR did not converge. Please check your cashflows.")


def irr(cashflows: List[float], guess: float = 0.1) -> float:
    rate = guess
    for _ in range(1000):
        npv  = sum(cf / math.pow(1 + rate, i) for i, cf in enumerate(cashflows))
        npv_ = sum(
            -i * cf / math.pow(1 + rate, i + 1)
            for i, cf in enumerate(cashflows) if i > 0
        )
        if abs(npv_) < 1e-12:
            break
        new_rate = rate - npv / npv_
        if abs(new_rate - rate) < 1e-8:
            return new_rate
        rate = new_rate

    raise ValueError("IRR did not converge. Please check your cashflows.")
