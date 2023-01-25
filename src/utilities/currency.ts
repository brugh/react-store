const CURRENCY = new Intl.NumberFormat(undefined, { currency: "EUR", style: "currency" });

export function currency(number: number) {
    return CURRENCY.format(number);
}