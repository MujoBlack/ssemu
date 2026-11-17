export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  group: "technical" | "field";
  image: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    slug: "ssenyonjo-mubaraka",
    name: "Ssenyonjo Mubaraka",
    title: "Managing Director",
    group: "technical",
    image:
      "https://static.readdy.ai/image/a640633edfbdf1109c1b0b3486e64127/a19bb50fedfcd34e0f1ccbddd1483973.jpeg",
    bio: "Ssenyonjo Mubaraka founded Ssemu Cleaning Services Ltd and leads the company's strategy, client relationships and quality standards. He believes a service company is only as good as the discipline of its team, and he built Ssemu around supervised, uniformed staff and honest, clearly quoted work across Kampala and Uganda.",
  },
  {
    slug: "kazibwe-bashil",
    name: "Kazibwe Bashil",
    title: "Operations Director",
    group: "technical",
    image:
      "https://static.readdy.ai/image/a640633edfbdf1109c1b0b3486e64127/12e32a6721fb3f0a0df489c5979b79ac.jpeg",
    bio: "Kazibwe Bashil oversees day-to-day operations, scheduling and logistics — making sure crews, equipment and chemicals reach every site on time. He coordinates waste collection routes, scaffolding and crane hire jobs and the high-rise window cleaning teams, keeping every project safe and on programme.",
  },
  {
    slug: "brian-kasule",
    name: "Brian Kasule",
    title: "Vector Control Officer / Entomologist",
    group: "field",
    image:
      "https://static.readdy.ai/image/a640633edfbdf1109c1b0b3486e64127/fed193c286107aa48d7f27f9b02f0ba5.jpeg",
    bio: "Brian Kasule is Ssemu's trained entomologist, leading fumigation and pest control. He surveys properties for cockroaches, bed bugs, termites, rodents and mosquitoes, selects the safest effective products and supervises every treatment in full PPE, then advises clients on keeping pests away for good.",
  },
  {
    slug: "nagawa-jovia-lukwanzi",
    name: "Nagawa Jovia Lukwanzi",
    title: "Finance & Administration Officer",
    group: "field",
    image:
      "https://static.readdy.ai/image/a640633edfbdf1109c1b0b3486e64127/fe1fba8c7a64409cb6fa8696ffd2ee24.jpeg",
    bio: "Nagawa Jovia Lukwanzi keeps Ssemu's finances and administration running smoothly — from clear, transparent quotations to invoicing, staff records and supplier management. She is often the friendly voice clients hear first when they request a quote or book a visit.",
  },
];