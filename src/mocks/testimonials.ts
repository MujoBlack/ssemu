export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Owek. Prof. Hajji Badiru Kateregga",
    role: "Client",
    quote:
      "The workers are selfless, they really like what they're doing. The management meets the target & we are always impressed.",
  },
  {
    name: "Godfrey Kirumira",
    role: "Chairperson, Kwagalana Group",
    quote:
      "I wish to thank Ssemu and his team for their services, that are better than what we've been seeing. Even the feedback I get from my friends shows they agree.",
  },
  {
    name: "Omuk. William Kajoba",
    role: "Client",
    quote:
      "I am pleased with Ssemu Cleaning services and I often contract them. They do great work yet the workload is big. They're proof that youth can be innovative & I look forward to continue working with them.",
  },
];

export const trustStats = [
  { value: "15", label: "Years in business" },
  { value: "500+", label: "Jobs completed" },
  { value: "17+", label: "Institutional clients" },
];

export const checkPills = [
  "Professionalism",
  "Affordability",
  "Dynamism",
  "Quality products",
  "Supervised staff",
];