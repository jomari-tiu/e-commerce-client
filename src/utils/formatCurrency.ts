/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @param options.currency - The currency code (default: 'PHP')
 * @param options.locale - The locale to use for formatting (default: 'en-PH')
 * @param options.showCurrency - Whether to display the currency symbol (default: true)
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // "₱1,234.56"
 * formatCurrency(1234.56, { showCurrency: false }) // "1,234.56"
 * formatCurrency(1234.56, { currency: 'USD', locale: 'en-US' }) // "$1,234.56"
 */
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
