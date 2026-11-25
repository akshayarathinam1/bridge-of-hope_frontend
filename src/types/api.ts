/**
 * TypeScript types matching the Bridge of Hope backend API responses.
 * Keep in sync with the DRF serializers in bridge-of-hope-backend.
 */

// ─── Shared ──────────────────────────────────────────────────────────────────

/** DRF paginated list response wrapper. */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─── Campaigns ───────────────────────────────────────────────────────────────

export interface PresetAmount {
  id: number;
  amount_paise: number;
  amount_inr: number;
  label: string;
  is_default: boolean;
}

export interface Campaign {
  id?: number;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  cover_image: string | null;
  /** Human-readable program name, e.g. "Education" */
  program_name?: string;
  /** Program slug, e.g. "education" */
  program?: string | null;
  goal_inr?: number | null;
  raised_inr?: number | null;
  progress_percent?: number;
  donor_count?: number;
  status: 'active' | 'paused' | 'completed' | 'archived';
  is_featured: boolean;
}

export interface CampaignDetail extends Campaign {
  icon?: string;
  allow_custom_amount?: boolean;
  preset_amounts?: PresetAmount[];
  ends_at?: string | null;
  created_at?: string;
}

// ─── Content – FAQs ──────────────────────────────────────────────────────────

export interface FAQ {
  id?: number;
  question: string;
  answer: string;
  display_order?: number;
}

// ─── Content – Events ────────────────────────────────────────────────────────

export interface Event {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  cover_image: string | null;
  location?: string;
  event_date: string;        // ISO 8601
  end_date?: string | null;
  /** Human-readable time, e.g. "9:00 AM – 2:00 PM" (stored in model) */
  time_label?: string;
  /** Computed by backend: uses time_label or derives from event_date */
  display_time?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  is_featured: boolean;
  registration_link?: string | null;
}

// ─── Content – Gallery ───────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  title: string;
  caption?: string;
  image: string;
  program?: string | null;   // program slug
  category?: string;
  is_active?: boolean;
}

export interface GalleryCategory {
  value: string;
  label: string;
}

// ─── Content – Team ──────────────────────────────────────────────────────────

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  bio?: string;
  photo?: string | null;
  image?: string;
  linkedin?: string | null;
  display_order?: number;
  is_active?: boolean;
}

// ─── Content – Programs ──────────────────────────────────────────────────────

export interface ProgramStat {
  id: number;
  value: string;
  label: string;
  display_order?: number;
}

/** Lightweight shape returned by GET /content/programs/ */
export interface ProgramListItem {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  cover_image?: string | null;
  /**
   * React icon name. One of:
   * FiBookOpen | FiHeart | FiActivity | FiUsers | FiHome | FiAward | FiSmile | FiStar
   */
  icon?: string;
  is_active?: boolean;
  display_order?: number;
}

/** Full shape returned by GET /content/programs/<slug>/ */
export interface Program extends ProgramListItem {
  long_description?: string;
  stats?: ProgramStat[];
}

// ─── Content – Impact Stats ──────────────────────────────────────────────────

export interface ImpactStat {
  id?: number;
  /** Display value, e.g. "5,000+" (the API's field is `value`). */
  value: string;
  label: string;
  /** Optional sub-label below the main label */
  subtext?: string;
  /** An emoji from the dashboard, or a react-icons name like FiSmile (see ProgramIcon). */
  icon: string;
  display_order?: number;
}

// ─── Content – Hero / About ──────────────────────────────────────────────────

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_link: string;
  background_image: string | null;
}

export interface AboutSection {
  id: number;
  section_type: 'mission' | 'vision' | 'story' | 'values';
  title: string;
  content: string;
  image: string | null;
}

// ─── Content – Site Info ─────────────────────────────────────────────────────

export interface SiteInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  pan: string;
  registration_80g: string;
  registration_12a: string;
  darpan_id: string;
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

export type InquiryType =
  | 'general'
  | 'volunteer'
  | 'csr'
  | 'donation'
  | 'media'
  | 'other';

export interface InquiryPayload {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiry_type: InquiryType;
  subject: string;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
}

// ─── Donations ───────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  full_name: string;
  email: string;
  phone?: string;
  address_line1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pan_number?: string;
  wants_updates?: boolean;
  is_anonymous?: boolean;
  amount: number;             // INR integer
  campaign_slug: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message?: string;
  donation_id: string;
  razorpay_order_id?: string;
  razorpay_key_id: string;
  amount_paise: number;
  currency: string;
  donor: { name: string; email: string; phone: string };
  campaign: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  donation_id?: string | null;
}

export interface DonationStatusResponse {
  success: boolean;
  donation_id: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  amount_inr: number;
  campaign: string;
  donor_first_name: string;
  paid_at: string | null;
  receipt: {
    status: 'pending' | 'generated' | 'sent' | 'cancelled' | 'failed';
    receipt_number: string | null;
    download_url: string | null;
  };
}
