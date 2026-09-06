/**
 * SIH Artisan Project — Shared Formatters
 */

/**
 * Format amount to Indian Rupee (INR)
 * @param {number} amount
 * @returns {string} e.g. "₹2,450"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format ISO date string or timestamp
 * @param {string|Date} date
 * @returns {string} e.g. "12 Oct 2026"
 */
export function formatDate(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Format number with compact suffixes (e.g. 1.4k, 2.8M)
 * @param {number} num
 * @returns {string}
 */
export function formatCompactNumber(num) {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

/**
 * Truncate long text strings cleanly
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text || '';
  return text.substring(0, length).trim() + '...';
}
