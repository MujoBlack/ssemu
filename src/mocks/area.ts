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
      "https://readdy.ai/api/search-image?query=Busy%20downtown%20Kampala%20Uganda%20city%20centre%20street%20with%20shops%20and%20tall%20buildings%2C%20bright%20daylight%2C%20realistic%20editorial%20photography&width=560&height=720&seq=ssemu-area-kampala-01&orientation=portrait",
  },
  {
    name: "Lweza & Entebbe Road",
    note: "Branch at Kigo Road Shopping Center.",
    image:
      "https://readdy.ai/api/search-image?query=Roadside%20view%20along%20Entebbe%20Road%20in%20Uganda%20with%20shops%20and%20green%20greenery%20on%20a%20bright%20day%2C%20realistic%20editorial%20photography&width=560&height=720&seq=ssemu-area-lweza-02&orientation=portrait",
  },
  {
    name: "Wakiso",
    note: "Homes, schools and institutions.",
    image:
      "https://readdy.ai/api/search-image?query=Suburban%20neighbourhood%20in%20Wakiso%20Uganda%20with%20homes%20and%20green%20trees%20on%20a%20bright%20day%2C%20realistic%20editorial%20photography&width=560&height=720&seq=ssemu-area-wakiso-03&orientation=portrait",
  },
  {
    name: "Mukono & Upcountry",
    note: "Projects across Uganda on request.",
    image:
      "https://readdy.ai/api/search-image?query=Rural%20Ugandan%20countryside%20landscape%20with%20green%20hills%2C%20small%20buildings%20and%20a%20road%2C%20bright%20daylight%2C%20realistic%20editorial%20photography&width=560&height=720&seq=ssemu-area-mukono-04&orientation=portrait",
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