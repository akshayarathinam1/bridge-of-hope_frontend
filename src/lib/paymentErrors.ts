/* Donor-friendly wording for payment errors. Raw gateway text is never shown. */

export const NETWORK_ERROR_MESSAGE =
  "We couldn't reach our servers. Please check your internet connection and try again.";

export const VERIFY_ERROR_MESSAGE =
  "We couldn't confirm your payment just yet. If money was deducted from your account, please don't pay again. Contact us and we'll sort it out.";

const DEFAULT_FAILURE =
  "Your payment didn't go through. You haven't been charged. Please try again or use a different payment method.";

interface RazorpayFailure {
  code?: string;
  reason?: string;
  description?: string;
}

/** Map a Razorpay `payment.failed` event payload to short, plain-language text. */
export function friendlyPaymentError(resp: unknown): string {
  const err = (resp as { error?: RazorpayFailure } | undefined)?.error;
  const text = `${err?.reason ?? ''} ${err?.description ?? ''}`.toLowerCase();

  if (text.includes('international')) {
    return "This card can't be used for this donation. Please try an Indian card, UPI or netbanking.";
  }
  if (text.includes('insufficient')) {
    return "Your account doesn't have enough balance for this payment. Please try another payment method.";
  }
  if (text.includes('cancel')) {
    return 'The payment was cancelled. You haven\'t been charged.';
  }
  if (text.includes('otp') || text.includes('authentication')) {
    return "We couldn't verify your payment with your bank. Please try again.";
  }
  if (text.includes('declin') || text.includes('rejected') || text.includes('expired')) {
    return "Your bank declined this payment. You haven't been charged. Please try another card or payment method.";
  }
  return DEFAULT_FAILURE;
}
