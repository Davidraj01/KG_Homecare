// Single source of truth for KG Home Care business info.
// Contact happens only through the booking form — no phone/WhatsApp/address is published.

export const BUSINESS = {
  name: "KG Home Care",
  tagline: "Washing Machine Service & Repair",
  hours: "Mon – Sun · 8:00 AM – 9:00 PM",
};

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
