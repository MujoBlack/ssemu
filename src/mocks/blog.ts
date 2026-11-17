export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const blogCategories = [
  "Health & Hygiene",
  "COVID-19",
  "Pest Control Tips",
  "Waste Management",
  "Company News",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-office-cleaning-matters-in-kampala",
    title: "Why professional office cleaning matters for Kampala businesses",
    category: "Health & Hygiene",
    date: "2026-08-12",
    author: "Ssenyonjo Mubaraka",
    excerpt:
      "A clean office is not a luxury. Here is how a proper cleaning routine protects your staff, your clients and your reputation.",
    image:
      "/media/stock-ssemu-blog-office-01.webp",
    body: [
      "In a busy Kampala office, dust, shared surfaces and crowded washrooms are where sickness spreads fastest. A predictable cleaning routine is one of the cheapest ways to keep your team healthy and productive.",
      "At Ssemu we build a simple checklist for every client — floors and high-touch surfaces daily, deep cleans weekly, and washrooms checked throughout the day. Nothing is left to memory.",
      "The result is more than a tidy office. Fewer sick days, a better first impression for visitors, and equipment that lasts longer because it is properly maintained.",
    ],
  },
  {
    slug: "disinfecting-public-spaces-covid-19",
    title: "Disinfecting public spaces: lessons we still use after COVID-19",
    category: "COVID-19",
    date: "2026-07-28",
    author: "Kazibwe Bashil",
    excerpt:
      "The habits we built during the pandemic still make offices, schools and events safer today.",
    image:
      "/media/stock-ssemu-blog-covid-02.webp",
    body: [
      "When COVID-19 hit, Ssemu teams moved quickly to support schools, hotels and offices with deep disinfection. Those methods are still part of our service today.",
      "We focus on high-touch points — door handles, railings, switches, lift buttons and shared desks — using products that are effective and safe when applied correctly.",
      "For events we still install hand-washing stations and sanitiser points, and keep clean-as-you-go crews on site. Good hygiene never goes out of fashion.",
    ],
  },
  {
    slug: "signs-you-have-a-pest-problem",
    title: "Five signs you have a pest problem before it gets serious",
    category: "Pest Control Tips",
    date: "2026-07-05",
    author: "Brian Kasule",
    excerpt:
      "Cockroaches, bed bugs, termites and rodents all leave early clues. Spotting them quickly saves money.",
    image:
      "/media/stock-ssemu-blog-pest-03.webp",
    body: [
      "Pests rarely appear overnight. By the time you see a cockroach in the kitchen light, there is usually a colony behind the cupboards.",
      "Watch for droppings, greasy smear marks along skirting, small holes in wood or fabric, a musty smell, and pets that keep staring at one spot behind a wall.",
      "If you notice any of these, book an inspection early. Early treatment is far cheaper and safer than dealing with a full infestation later.",
    ],
  },
  {
    slug: "managing-waste-responsibly",
    title: "Managing waste responsibly at home and at work",
    category: "Waste Management",
    date: "2026-06-18",
    author: "Kazibwe Bashil",
    excerpt:
      "Integrated waste management protects health and the environment — and it starts with sorting.",
    image:
      "/media/stock-ssemu-blog-waste-04.webp",
    body: [
      "Waste that is dumped or burned creates disease, pollutes water and spoils the neighbourhood. Proper collection and disposal is a public-health service, not just housekeeping.",
      "We help clients separate general waste, recyclables and hazardous items, then collect on a fixed schedule so bins never overflow.",
      "For institutions we also carry out simple waste audits, pointing out where volumes can be cut — saving money while protecting the environment.",
    ],
  },
  {
    slug: "high-rise-window-cleaning-safely",
    title: "How we clean high-rise windows safely",
    category: "Company News",
    date: "2026-06-02",
    author: "Ssenyonjo Mubaraka",
    excerpt:
      "Scaffolding, cranes and trained crews: the safety behind a spotless glass facade.",
    image:
      "/media/stock-ssemu-blog-highrise-05.webp",
    body: [
      "Cleaning tall buildings is skilled, safety-critical work. Every job starts with a method statement, harness checks and a trained supervisor on the ground.",
      "Depending on the building we use suspended gondolas, scaffolding platforms or crane-supported access, and we hire out scaffolding and cranes to other contractors too.",
      "The finish matters as much as the safety — streak-free glass and clean frames, delivered without disrupting the people inside.",
    ],
  },
  {
    slug: "ssemu-cleaning-services-csr",
    title: "Ssemu Cleaning Services: giving back to our community",
    category: "Company News",
    date: "2026-05-20",
    author: "Nagawa Jovia Lukwanzi",
    excerpt:
      "From youth employment to clean-up drives, we are proud to serve Kampala in more ways than one.",
    image:
      "/media/stock-ssemu-blog-csr-06.webp",
    body: [
      "Ssemu Cleaning Services Ltd grew from a small youth-run team into a company trusted by banks, universities, hotels and communities across Uganda.",
      "We are committed to creating dignified jobs for young people and to keeping the spaces we clean — and the communities around them — healthy.",
      "Thank you to every client who has supported us. Our promise stays the same: customer's satisfaction, our priority.",
    ],
  },
];