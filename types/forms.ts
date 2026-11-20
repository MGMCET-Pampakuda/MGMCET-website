/** Form types for contact and enquiry forms */

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  message: string;
  /** Honeypot — must be empty on legitimate submissions */
  website?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  message: string;
  /** Honeypot */
  website?: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error" | "unconfigured";

export type EnquiryStatus = "new" | "contacted" | "in-review" | "resolved" | "archived";

export interface EnquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  message: string;
  source: string;
  createdAt: string;
  status: EnquiryStatus;
  notes?: string;
}
