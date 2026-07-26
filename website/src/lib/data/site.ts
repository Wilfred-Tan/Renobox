// Placeholder domain — update once the real domain is live (also update DNS / hosting).
export const siteUrl = "https://www.renobox.com.sg";

export const site = {
  name: "Reno Box",
  legalName: "Reno Box Pte Ltd",
  tagline: "Renovation & Design, Singapore",
  shortDescription:
    "We design and build commercial fit-outs and residential renovations across Singapore — from first sketch to handover.",
  phoneDisplay: "+65 9679 1538",
  phoneHref: "tel:+6596791538",
  // Office landline — shown alongside the mobile number on the Contact page.
  landlinePhoneDisplay: "+65 6789 7338",
  landlinePhoneHref: "tel:+6567897338",
  whatsappNumber: "6596791538",
  whatsappDefaultMessage:
    "Hi Reno Box, I'd like to enquire about a renovation project.",
  email: "william@renobox.com.sg",
  address: {
    line1: "Block 3018 Bedok North Street 5, #04-36 East Link",
    line2: "Singapore 486132",
  },
  uen: "198500568M",
  socials: {
    // PLACEHOLDER — swap in real profile URLs when available.
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
  // PLACEHOLDER — confirm which of these certifications actually apply before launch.
  // Claiming a licence/accreditation the company doesn't hold is a real compliance risk.
  certifications: [
    { label: "BCA Registered Contractor" },
    { label: "CaseTrust Accredited" },
  ],
  // Only using stats we can actually stand behind. UEN 198500568M implies an
  // incorporation year of 1985 (pending confirmation) — ask for 1-2 more real
  // stats (e.g. repeat-client rate, team size, F&B outlets count) to round this out.
  stats: [
    { value: 40, suffix: "+", label: "Years in Business" },
    { value: 300, suffix: "+", label: "Projects Delivered" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappDefaultMessage,
)}`;

// Confirmed against the business's actual Google Maps listing (search "Reno Box
// Singapore" — a "Reno Box Pte. Ltd." carpenter listing at this exact address).
export const googleMapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.legalName}, ${site.address.line1}, ${site.address.line2}`,
)}&output=embed`;
