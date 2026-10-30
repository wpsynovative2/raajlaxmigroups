export type LeadFormId = "enquiry" | "contact" | "redevelopment" | "acacia";

export type LeadField =
  | "name"
  | "phone"
  | "email"
  | "project"
  | "location"
  | "units"
  | "interest"
  | "message"
  | "consent";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<LeadField, string>>;
  /** Echo of the submitted values so the form can be re-filled after a validation error. */
  values?: Partial<Record<LeadField, string>>;
};

export const initialLeadState: LeadState = { status: "idle" };

/** Google Sheet tab each form writes to. */
export const sheetNames: Record<LeadFormId, string> = {
  enquiry: "Website Enquiries",
  contact: "Contact Page",
  redevelopment: "Redevelopment",
  acacia: "Acacia Leads",
};

export const requiredFields: Record<LeadFormId, LeadField[]> = {
  enquiry: ["name", "phone"],
  contact: ["name", "phone"],
  redevelopment: ["name", "location", "phone"],
  acacia: ["name", "phone", "consent"],
};

/** Pages a form may send the visitor to after a successful submission. */
export const allowedRedirects = ["/acacia-thankyou/"] as const;
