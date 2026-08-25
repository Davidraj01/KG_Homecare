// Single source of truth for KG Home Care business info.

export const BUSINESS = {
  name: "KG Home Care",
  tagline: "Washing Machine Service & Repair",
  address: {
    line1: "7/1, Kovil Street,",
    line2: "Pudukkottai – 628103",
    city: "Tuticorin",
  },
  hours: "Mon – Sun · 8:00 AM – 9:00 PM",
};

// WhatsApp-only contact number — used on the contact page. Clicking it opens
// WhatsApp, not the phone dialer.
export const WHATSAPP_RAW = "918122931402";
export const PHONE_DISPLAY = "+91 81229 31402";

export function waHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_RAW}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const BRANDS = [] as const;

export const SERVICES = [
  {
    slug: "washing-machine-service",
    name: "Washing Machine Service",
    short: "Expert service for all front-load & top-load washing machines.",
    image: "washing_machine",
  },
  {
    slug: "installation",
    name: "Installation Service",
    short: "Safe, certified installation with hose, leveling & test cycle.",
    image: "installation_new",
  },
  {
    slug: "drum-cleaning",
    name: "Drum Cleaning",
    short: "Deep drum cleaning to remove detergent residue, mold & odor.",
    image: "drum_cleaning",
  },
  {
    slug: "pcb-repair",
    name: "PCB Complaint",
    short: "Control board diagnosis, component-level soldering & service.",
    image: "pcb",
  },
  {
    slug: "motor-repair",
    name: "Motor Complaint",
    short: "Motor rewinding, bearing & coupling replacement.",
    image: "motor",
  },
  {
    slug: "leakage-repair",
    name: "Water Leakage Issue",
    short: "Find & fix hose, gasket, valve & tub leaks the same day.",
    image: "leakage",
  },
  {
    slug: "door-lock-repair",
    name: "Door Lock Issue",
    short: "Door lock, latch & interlock replacement for all brands.",
    image: "pcb",
  },
  {
    slug: "spare-parts",
    name: "Spare Parts Replacement",
    short: "Genuine OEM spare parts for all major brands.",
    image: "repair",
  },
] as const;

export type Service = (typeof SERVICES)[number];
