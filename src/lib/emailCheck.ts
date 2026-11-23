/* Light client-side email checks for the donate form. The backend still validates. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Common misspellings of popular email domains → the domain the donor most likely meant. */
const DOMAIN_FIXES: Record<string, string> = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.om': 'gmail.com',
  'gmail.in': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yahoo.con': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmail.con': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'outlook.con': 'outlook.com',
  'outlok.com': 'outlook.com',
  'rediffmail.con': 'rediffmail.com',
  'rediffmai.com': 'rediffmail.com',
  'icloud.con': 'icloud.com',
};

/** Suggested correction for a likely typo, or null when the address looks fine. */
export function suggestEmailFix(value: string): string | null {
  const trimmed = value.trim();
  const at = trimmed.lastIndexOf('@');
  if (at < 1) return null;
  const domain = trimmed.slice(at + 1).toLowerCase();
  const fixed = DOMAIN_FIXES[domain];
  return fixed ? `${trimmed.slice(0, at)}@${fixed}` : null;
}

/* The thank-you page shows where the receipt was sent. The address is kept in this tab's
   sessionStorage (never in the URL) and read once on the thank-you page. */
const RECEIPT_EMAIL_KEY = 'boh:receipt-email';

export function rememberReceiptEmail(email: string): void {
  try {
    sessionStorage.setItem(RECEIPT_EMAIL_KEY, email.trim());
  } catch {
    /* storage unavailable (private mode) — the thank-you page falls back to generic text */
  }
}

export function readReceiptEmail(): string | null {
  try {
    return sessionStorage.getItem(RECEIPT_EMAIL_KEY);
  } catch {
    return null;
  }
}
