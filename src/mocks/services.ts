export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tag: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
  quote: string;
}

export const quoteOptions = [
  "Office / Commercial Cleaning",
  "Home Cleaning",
  "Event Cleaning",
  "Sanitation & Public Health at Events",
  "Integrated Waste Management",
  "Scaffolding & Crane Hire",
  "High-rise Window Cleaning",
  "Fumigation",
  "Pest Control",
  "Other",
];

export const services: ServiceItem[] = [
  {
    id: "office-commercial-cleaning",
    icon: "ri-building-2-line",
    title: "Office & Commercial Cleaning",
    tag: "COMMERCIAL",
    quote: "Office / Commercial Cleaning",
    description:
      "Daily, weekly or one-off cleaning for offices, banks, shops and institutions.",
    includes: [
      "Scheduled daily, weekly or monthly cleaning",
      "Floors, desks, washrooms and common areas",
      "Trained, supervised and uniformed staff",
      "Quality checklists signed off with your team",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_165018_ceb54c54-5884-462c-8b95-b434a49d23bd.png",
    imageAlt: "Ssemu cleaning crew mopping an office floor in Kampala",
  },
  {
    id: "home-cleaning",
    icon: "ri-home-4-line",
    title: "Home Cleaning",
    tag: "RESIDENTIAL",
    quote: "Home Cleaning",
    description:
      "Deep cleans and regular home cleaning with safe sanitation chemicals.",
    includes: [
      "Full deep cleans and move-in / move-out cleans",
      "Kitchens, bathrooms, bedrooms and living areas",
      "Safe, family-friendly sanitation chemicals",
      "Optional regular weekly or fortnightly visits",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_165529_3aca68e0-f6ed-435b-9a6d-12026025d427.png",
    imageAlt:
      "Ssemu cleaners deep cleaning the living room of a home in Kampala",
  },
  {
    id: "event-cleaning-sanitation",
    icon: "ri-group-line",
    title: "Event Cleaning & Sanitation",
    tag: "EVENTS",
    quote: "Event Cleaning",
    description:
      "Hand-washing stations, sanitiser points, clean-as-you-go teams and post-event cleaning.",
    includes: [
      "Hand-washing stations and sanitiser points",
      "Clean-as-you-go teams during the event",
      "Washroom attendants and hygiene supplies",
      "Full post-event clean-up and waste removal",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_165018_ca41bf84-f791-435b-8b0f-94c700fe06df.png",
    imageAlt:
      "Ssemu sanitation team running hand-washing stations at an event in Uganda",
  },
  {
    id: "integrated-waste-management",
    icon: "ri-recycle-line",
    title: "Integrated Waste Management",
    tag: "COMMERCIAL",
    quote: "Integrated Waste Management",
    description:
      "We collect, transport and dispose of garbage safely to protect health and the environment.",
    includes: [
      "Scheduled garbage collection and transport",
      "Safe disposal and recycling where possible",
      "Bins, skips and site clean-ups",
      "Waste audits for offices and institutions",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_165019_fb26698e-f8f8-475a-b065-db9f31af7126.png",
    imageAlt:
      "Ssemu waste crew collecting and loading garbage for disposal in Kampala",
  },
  {
    id: "scaffolding-crane-high-rise",
    icon: "ri-building-line",
    title: "Scaffolding, Crane Hire & High-rise Windows",
    tag: "HIGH-RISE",
    quote: "High-rise Window Cleaning",
    description:
      "Safe, efficient high-rise window cleaning from scaffolding platforms, plus scaffolding and crane hire.",
    includes: [
      "High-rise window and facade cleaning",
      "Scaffolding erection and crane hire",
      "Trained rope-access and gondola crews",
      "Full safety compliance and supervision",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_163900_3b1f616f-6708-4938-9437-47018a6a9303.png",
    imageAlt:
      "Ssemu high-rise window cleaning crew working from a suspended platform",
  },
  {
    id: "fumigation-pest-control",
    icon: "ri-bug-line",
    title: "Fumigation & Pest Control",
    tag: "PEST CONTROL",
    quote: "Fumigation",
    description:
      "Trained fumigators in PPE, premium products and advice on keeping pests away.",
    includes: [
      "Cockroaches, bed bugs, termites and rodents",
      "Mosquito and vector control programmes",
      "Trained fumigators in full PPE",
      "Follow-up checks and prevention advice",
    ],
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261016_165018_6a68d7a7-5bbd-45fc-a66a-ab7a2b86363c.png",
    imageAlt:
      "Ssemu fumigator in protective equipment treating a room for pests",
  },
];

export const heroServiceCards = [
  {
    id: "cleaning",
    icon: "ri-sparkling-2-fill",
    title: "I need cleaning",
    subtitle:
      "Office, commercial, home and event cleaning by trained, supervised staff.",
    tag: "OFFICES · HOMES · EVENTS",
  },
  {
    id: "fumigation",
    icon: "ri-bug-2-fill",
    title: "I need fumigation or pest control",
    subtitle:
      "Cockroaches, bed bugs, termites, rodents and mosquitoes handled by trained fumigators in PPE.",
    tag: "SAFE PRODUCTS",
  },
  {
    id: "waste-highrise",
    icon: "ri-building-2-fill",
    title: "I need waste or high-rise work",
    subtitle:
      "Garbage collection and disposal, scaffolding and crane hire, high-rise window cleaning.",
    tag: "SCAFFOLDING · CRANES",
  },
];