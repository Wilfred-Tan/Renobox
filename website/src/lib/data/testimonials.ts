export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  category: "Commercial" | "Residential";
};

// PLACEHOLDER TESTIMONIALS — replace with real client quotes (with permission) before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood that every day we weren't open was lost revenue. The site team moved fast without cutting corners on finishing.",
    name: "Placeholder Client",
    role: "Founder, F&B Brand — Tanjong Pagar",
    category: "Commercial",
  },
  {
    quote:
      "We changed our minds twice during the design stage and they never made us feel bad about it — just re-quoted clearly and kept moving.",
    name: "Placeholder Client",
    role: "Homeowner — Tampines",
    category: "Residential",
  },
  {
    quote:
      "One point of contact from licensing to final handover. For a multi-outlet rollout, that consistency mattered more than price.",
    name: "Placeholder Client",
    role: "Operations Director, Restaurant Group",
    category: "Commercial",
  },
  {
    quote:
      "The 3D visualisation meant there were no surprises on-site. What we approved on screen is exactly what got built.",
    name: "Placeholder Client",
    role: "Homeowner — Bishan",
    category: "Residential",
  },
];
