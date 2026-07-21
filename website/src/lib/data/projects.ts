export type ProjectCategory = "commercial" | "residential";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  type: string;
  location: string;
  year: string;
  /** Not known for every project — only render this field when present. */
  duration?: string;
  summary: string;
  description: string[];
  /** Paths under /public, in display order. First image is used as the cover. */
  images: string[];
  testimonial?: { quote: string; name: string; role: string };
};

// Real projects and photography. A handful of recent, well-photographed jobs —
// Reno Box has delivered 300+ projects overall (see site.stats), most from
// before the team started keeping a consistent photo record.
export const projects: Project[] = [
  {
    slug: "kfc-plq",
    title: "KFC Paya Lebar Quarter",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "Paya Lebar Quarter",
    year: "2025",
    summary:
      "A full KFC storefront and dining fit-out at Paya Lebar Quarter, from the entrance through to branded booth seating.",
    description: [
      "This fit-out covered the complete customer journey — storefront entrance, order counter, and dining room — built to brand standard while holding up to daily quick-service volume.",
      "Red-and-black booth seating, a wood-panelled feature wall, and a backlit “11 Herbs & Spices” wall anchor the dining area, finished to a standard that photographs as well as it performs.",
    ],
    images: [
      "/images/portfolio/kfc-plq/1.jpg",
      "/images/portfolio/kfc-plq/2.jpg",
      "/images/portfolio/kfc-plq/3.jpg",
      "/images/portfolio/kfc-plq/4.jpg",
      "/images/portfolio/kfc-plq/5.jpg",
      "/images/portfolio/kfc-plq/6.jpg",
    ],
  },
  {
    slug: "kfc-amk",
    title: "KFC Ang Mo Kio",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "Ang Mo Kio",
    year: "2026",
    summary:
      "A KFC dining room and storefront fit-out in Ang Mo Kio, with branded feature walls and booth seating throughout.",
    description: [
      "Following the same brand playbook as our other KFC fit-outs, this outlet pairs a backlit storefront sign with a dining room built around “Original Recipe” booth seating and a wordmark feature wall.",
      "A backlit “Herbs & Spices” wall and coordinated pendant lighting complete the dining area, delivered to the same finish standard across every table.",
    ],
    images: [
      "/images/portfolio/kfc-amk/1.jpg",
      "/images/portfolio/kfc-amk/2.jpg",
      "/images/portfolio/kfc-amk/3.jpg",
      "/images/portfolio/kfc-amk/4.jpg",
    ],
  },
  {
    slug: "kfc-downtown-east",
    title: "KFC Downtown East",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "Downtown East",
    year: "2026",
    summary:
      "A KFC storefront and dining fit-out at Downtown East, with a backlit exterior sign and branded dining nooks.",
    description: [
      "This outlet's fit-out centres on a backlit exterior sign and an open dining room finished with branded wall graphics and seating nooks.",
      "Custom dining nooks with graphic wall art and a feature wall give the space personality beyond a standard quick-service layout.",
    ],
    images: [
      "/images/portfolio/kfc-downtown-east/1.jpg",
      "/images/portfolio/kfc-downtown-east/2.jpg",
      "/images/portfolio/kfc-downtown-east/3.jpg",
      "/images/portfolio/kfc-downtown-east/4.jpg",
    ],
  },
  {
    slug: "kfc-csp",
    title: "KFC CSP",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "CSP",
    year: "2026",
    summary:
      "A KFC storefront and dining fit-out, with a night-lit exterior sign and branded dining nooks.",
    description: [
      "The exterior sign and order-kiosk zone were built for high visibility and fast throughput, with the dining room finished in the same branded language as our other KFC projects.",
      "Circular graphic wall art and star-motif decor give the dining nooks a distinct identity within the standard KFC fit-out template.",
    ],
    images: [
      "/images/portfolio/kfc-csp/1.jpg",
      "/images/portfolio/kfc-csp/2.jpg",
      "/images/portfolio/kfc-csp/3.jpg",
      "/images/portfolio/kfc-csp/4.jpg",
    ],
  },
  {
    slug: "pizza-hut-tiong-bahru",
    title: "Pizza Hut Tiong Bahru",
    category: "commercial",
    type: "F&B — Restaurant",
    location: "Tiong Bahru",
    year: "2026",
    summary:
      "A vibrant Pizza Hut fit-out in Tiong Bahru, with neon branded walls and communal dining tables.",
    description: [
      "This fit-out brought Pizza Hut's refreshed brand identity to life — neon signage, a graphic feature wall, and communal table seating built for groups.",
      "The storefront and dining room were finished to the same standard, giving the outlet a strong street-level presence as well as an inviting space to sit in.",
    ],
    images: [
      "/images/portfolio/pizza-hut-tiong-bahru/1.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/2.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/3.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/4.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/5.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/6.jpg",
    ],
  },
  {
    slug: "office-mbfc",
    title: "Corporate Office Fit-Out, MBFC",
    category: "commercial",
    type: "Office",
    location: "Marina Bay Financial Centre",
    year: "2026",
    summary:
      "A high-end corporate office fit-out at MBFC, spanning reception, breakout lounge, and boardroom.",
    description: [
      "This fit-out delivered a full corporate office floor — reception, breakout lounge, and boardroom — finished with warm timber panelling and a skyline-facing banquette lounge.",
      "The boardroom was built to host large meetings comfortably, with a materials palette that carries through consistently from the reception area.",
    ],
    images: [
      "/images/portfolio/office-mbfc/1.jpg",
      "/images/portfolio/office-mbfc/2.jpg",
      "/images/portfolio/office-mbfc/3.jpg",
      "/images/portfolio/office-mbfc/4.jpg",
    ],
  },
  {
    slug: "residential-bidadari",
    title: "HDB Home, Bidadari",
    category: "residential",
    type: "HDB Flat",
    location: "Bidadari",
    year: "2026",
    summary:
      "A dark-editorial HDB renovation in Bidadari — a matte-black kitchen, a fluted timber feature wall, and travertine-toned bathrooms.",
    description: [
      "This renovation reworked the flat into an open-plan living, dining, and kitchen space wrapped in a restrained dark palette — a wood-panelled TV feature wall, cove lighting, and a matte-black kitchen with a stone-look peninsula.",
      "Custom carpentry carries the palette through, from a fluted timber wall with a backlit display niche to travertine-toned bathrooms finished with stone vessel sinks and backlit mirrors.",
    ],
    images: [
      "/images/portfolio/residential-bidadari/1.jpg",
      "/images/portfolio/residential-bidadari/2.jpg",
      "/images/portfolio/residential-bidadari/3.jpg",
      "/images/portfolio/residential-bidadari/4.jpg",
      "/images/portfolio/residential-bidadari/5.jpg",
      "/images/portfolio/residential-bidadari/6.jpg",
    ],
  },
  {
    slug: "residential-jalan-kemboja",
    title: "Landed Home, Jalan Kemboja",
    category: "residential",
    type: "Landed Property",
    location: "Jalan Kemboja",
    year: "2026",
    summary:
      "A full landed-property renovation with a double-height living room, home theatre lounge, and private lift.",
    description: [
      "This landed home renovation spans a double-height living room with floor-to-ceiling windows, a dedicated home theatre lounge, and a marble-clad foyer with a bronze-framed private lift.",
      "Custom carpentry runs throughout — from mirrored wardrobes in the foyer to a full built-in wardrobe wall along the corridor — finished to a consistent standard across every room.",
    ],
    images: [
      "/images/portfolio/residential-jalan-kemboja/1.jpg",
      "/images/portfolio/residential-jalan-kemboja/2.jpg",
      "/images/portfolio/residential-jalan-kemboja/3.jpg",
      "/images/portfolio/residential-jalan-kemboja/4.jpg",
      "/images/portfolio/residential-jalan-kemboja/5.jpg",
      "/images/portfolio/residential-jalan-kemboja/6.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
