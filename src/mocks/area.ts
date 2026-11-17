export interface AreaItem {
  name: string;
  note: string;
  image: string;
}

export const areas: AreaItem[] = [
  {
    name: "Kampala Central",
    note: "Head office at Original Shauriyako Building.",
    image:
      "/media/stock-ssemu-area-kampala-01.webp",
  },
  {
    name: "Lweza & Entebbe Road",
    note: "Branch at Kigo Road Shopping Center.",
    image:
      "/media/stock-ssemu-area-lweza-02.webp",
  },
  {
    name: "Wakiso",
    note: "Homes, schools and institutions.",
    image:
      "/media/stock-ssemu-area-wakiso-03.webp",
  },
  {
    name: "Mukono & Upcountry",
    note: "Projects across Uganda on request.",
    image:
      "/media/stock-ssemu-area-mukono-04.webp",
  },
];

export const serviceAreas = [
  "Kampala Central",
  "Lweza",
  "Entebbe Road",
  "Wakiso",
  "Mukono",
  "Ntinda",
  "Kololo",
  "Bugolobi",
  "Nakawa",
  "Upcountry on request",
];