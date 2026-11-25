/* ─── Razorpay Checkout SDK type declarations ───────────────────────────────
   The Razorpay JS SDK (loaded via <Script src="https://checkout.razorpay.com/v1/checkout.js">)
   attaches itself to `window.Razorpay`. These declarations let TypeScript
   know the shape of that global so we can call it from client components
   without casting to `any`.
   ─────────────────────────────────────────────────────────────────────────── */

interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

interface RazorpayTheme {
  color?: string;
}

interface RazorpayHandlerResponse {
  /** Present for one-time payments */
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  /** Required for one-time payments */
  order_id?: string;
  /** Amount in paise (e.g. 50000 = ₹500).  */
  amount?: number;
  currency?: string;
  name: string;
  description?: string;
  image?: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: RazorpayPrefill;
  theme?: RazorpayTheme;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
  on(event: string, cb: (resp: unknown) => void): void;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
