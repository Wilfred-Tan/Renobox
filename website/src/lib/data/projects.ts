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
//
// Order is reverse-chronological (most recently completed first), driven by
// the "YYYY MM" prefix on each project's source photo folder — not by
// category. Ties at month granularity keep a stable relative order.
export const projects: Project[] = [
  {
    slug: "september-coffee",
    title: "September Coffee",
    category: "commercial",
    type: "F&B — Café",
    location: "Craig Road",
    year: "2026",
    summary:
      "A café fit-out on Craig Road, built around warm timber panelling, terracotta hex tiling, and a covered al fresco courtyard.",
    description: [
      "This fit-out delivered a full café build-out spanning indoor and al fresco seating, unified by warm oak panelling, terracotta hex tile flooring, and woven-fabric pendant lighting throughout.",
      "A covered outdoor courtyard extends the dining room onto Craig Road, while a terracotta-tiled host stand and timber-clad washroom carry the same material palette through the rest of the space.",
    ],
    images: [
      "/images/portfolio/september-coffee/1.jpg",
      "/images/portfolio/september-coffee/2.jpg",
      "/images/portfolio/september-coffee/3.jpg",
      "/images/portfolio/september-coffee/4.jpg",
      "/images/portfolio/september-coffee/5.jpg",
      "/images/portfolio/september-coffee/6.jpg",
      "/images/portfolio/september-coffee/7.jpg",
      "/images/portfolio/september-coffee/8.jpg",
      "/images/portfolio/september-coffee/9.jpg",
      "/images/portfolio/september-coffee/10.jpg",
    ],
  },
  {
    slug: "office-suntec-city",
    title: "Corporate Office Fit-Out, Suntec City",
    category: "commercial",
    type: "Office",
    location: "Suntec City",
    year: "2026",
    summary:
      "A corporate office fit-out at Suntec City, delivered end-to-end from design through handover.",
    description: [
      "This project covered a full office floor fit-out — partitioning, joinery, and M&E coordination — completed to the client's brand and workplace-standard specification.",
      "As with a number of our corporate clients, photography from this project isn't available for publication; details are available on request.",
    ],
    images: [],
  },
  {
    slug: "kfc-csp",
    title: "KFC CSP",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "CSP",
    year: "2026",
    summary:
      "A KFC fit-out with a night-lit storefront and a self-order kiosk zone under an exposed services ceiling.",
    description: [
      "The night-lit storefront sign and glazed frontage were built for visibility from the walkway, opening onto a self-order kiosk zone sized for fast throughput.",
      "Inside, a self-order kiosk bank and the “Meant to be Shared” feature wall sit under an exposed services ceiling, finished in the same branded language as our other KFC projects.",
    ],
    images: [
      "/images/portfolio/kfc-csp/1.jpg",
      "/images/portfolio/kfc-csp/2.jpg",
    ],
  },
  {
    slug: "office-toa-payoh",
    title: "Corporate Office Fit-Out, Toa Payoh",
    category: "commercial",
    type: "Office",
    location: "Toa Payoh",
    year: "2026",
    summary:
      "A corporate office fit-out in Toa Payoh, with a wood-slat feature corridor and a built-in planter divider.",
    description: [
      "A wood-slat “skyline” feature wall runs the length of the main corridor, turning a functional walkway into the floor's visual centrepiece.",
      "A built-in credenza topped with a living-wall planter divides the open office area, carrying the same warm-timber material language through the workspace.",
    ],
    images: [
      "/images/portfolio/office-toa-payoh/1.jpg",
      "/images/portfolio/office-toa-payoh/2.jpg",
    ],
  },
  {
    // Residential projects are always genericised to the district — never the
    // street, block, or unit — so a client's home address can't be identified.
    slug: "residential-potong-pasir",
    title: "Landed Home, Potong Pasir",
    category: "residential",
    type: "Landed Property",
    location: "Potong Pasir",
    year: "2026",
    summary:
      "A full landed-property renovation with a double-height living room, home theatre lounge, and private lift.",
    description: [
      "This landed home renovation spans a double-height living room with floor-to-ceiling windows and a fluted stone feature wall, a dedicated home theatre lounge, and a marble-clad foyer with a bronze-framed private lift.",
      "Custom carpentry runs throughout — from a full built-in wardrobe wall along the corridor to a bedroom wardrobe finished with inlaid bronze detailing — kept to a consistent standard across every room.",
    ],
    images: [
      "/images/portfolio/residential-potong-pasir/1.jpg",
      "/images/portfolio/residential-potong-pasir/2.jpg",
      "/images/portfolio/residential-potong-pasir/3.jpg",
      "/images/portfolio/residential-potong-pasir/4.jpg",
      "/images/portfolio/residential-potong-pasir/5.jpg",
      "/images/portfolio/residential-potong-pasir/6.jpg",
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
      "A KFC dining fit-out at Downtown East, built around an exposed services ceiling, a neon feature wall, and booth seating.",
    description: [
      "The dining room was designed to sit under an exposed services ceiling, with red and timber battens run across it to turn the plant above into part of the look rather than something to hide.",
      "A neon KFC wall with backlit rooster artwork anchors one side, a “Meant to be Shared” feature wall and red banquette the other, with a free-standing order-kiosk island keeping the queue clear of the seating.",
    ],
    images: [
      "/images/portfolio/kfc-downtown-east/1.jpg",
      "/images/portfolio/kfc-downtown-east/2.jpg",
      "/images/portfolio/kfc-downtown-east/3.jpg",
      "/images/portfolio/kfc-downtown-east/4.jpg",
    ],
  },
  {
    slug: "pizza-hut-downtown-east",
    title: "Pizza Hut Downtown East",
    category: "commercial",
    type: "F&B — Restaurant",
    location: "Downtown East",
    year: "2026",
    summary:
      "A Pizza Hut dining fit-out at Downtown East, with booth seating, statement pendant lighting, and a pizza-mural feature wall.",
    description: [
      "The dining room pairs booth seating with red ball-pendant lamps under an angled ceiling, with a full-height pizza-mural wall anchoring one side of the room.",
      "A quieter bench nook continues the same mural and checkerboard floor, giving the space a smaller-group seating option alongside the main dining area.",
    ],
    images: [
      "/images/portfolio/pizza-hut-downtown-east/1.jpg",
      "/images/portfolio/pizza-hut-downtown-east/2.jpg",
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
      "A Pizza Hut dining fit-out in Tiong Bahru, with red booth seating and bold slogan feature walls.",
    description: [
      "The dining room pairs red banquette booths with marble-top tables under a black-and-red exposed ceiling, giving the space a bright, high-energy feel.",
      "A run of bold slogan feature walls — “Layers of Joy”, “Sliced for Sharing”, “Stacked with Joy” — turns the main wall into the room's centrepiece, finished to brand standard throughout.",
    ],
    images: [
      "/images/portfolio/pizza-hut-tiong-bahru/1.jpg",
      "/images/portfolio/pizza-hut-tiong-bahru/2.jpg",
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
      "A dark-editorial HDB renovation in Bidadari — a matte-black kitchen, a fluted timber feature wall, and two bathrooms in contrasting stone and walnut.",
    description: [
      "This renovation reworked the flat into an open-plan living, dining, and kitchen space wrapped in a restrained dark palette — a wood-panelled TV feature wall, cove lighting, and a matte-black kitchen with a stone-look peninsula that doubles as a breakfast bar.",
      "Custom carpentry carries the palette through, from a fluted timber wall with a backlit display niche to two bathrooms finished in deliberately different materials: travertine-toned tile with a stone vessel sink and backlit mirror in one, walnut-clad walls and a black rainfall shower in the other.",
    ],
    images: [
      "/images/portfolio/residential-bidadari/1.jpg",
      "/images/portfolio/residential-bidadari/2.jpg",
      "/images/portfolio/residential-bidadari/3.jpg",
      "/images/portfolio/residential-bidadari/4.jpg",
      "/images/portfolio/residential-bidadari/5.jpg",
      "/images/portfolio/residential-bidadari/6.jpg",
      "/images/portfolio/residential-bidadari/7.jpg",
    ],
  },
  {
    slug: "kfc-compass-vale",
    title: "KFC Compass Vale",
    category: "commercial",
    type: "F&B — Quick Service Restaurant",
    location: "Compass Vale",
    year: "2026",
    summary:
      "A KFC quick-service fit-out at Compass Vale, centred on a self-order kiosk corridor for fast, queue-free ordering.",
    description: [
      "This fit-out delivered a full quick-service KFC unit, with a self-order kiosk corridor as the centrepiece of the customer flow.",
      "Branded wall graphics and a promotional display screen line the corridor, finished in the same materials palette as our other KFC projects.",
    ],
    images: ["/images/portfolio/kfc-compass-vale/1.jpg"],
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
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
