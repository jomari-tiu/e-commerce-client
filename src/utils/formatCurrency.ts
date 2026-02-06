export function formatCurrency(
  amount: number,
  options?: {
    currency?: string;
    locale?: string;
    showCurrency?: boolean;
  }
): string {
  const {
    currency = "PHP",
    locale = "en-PH",
    showCurrency = true,
  } = options || {};

  const formatter = new Intl.NumberFormat(locale, {
    style: showCurrency ? "currency" : "decimal",
    currency: showCurrency ? currency : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}
