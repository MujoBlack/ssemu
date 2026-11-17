export interface PriceRow {
  service: string;
  note: string;
  icon: string;
  price: string;
}

export const priceRows: PriceRow[] = [
  { service: "Site assessment", note: "We visit or call to measure the space and the job.", icon: "ri-map-pin-2-line", price: "Free quote" },
  { service: "Office & commercial cleaning", note: "Daily, weekly or one-off contracts.", icon: "ri-building-2-line", price: "Free quote" },
  { service: "Home deep clean", note: "Full deep cleans and regular home visits.", icon: "ri-home-4-line", price: "Free quote" },
  { service: "Event sanitation", note: "Hand-washing, sanitiser points and clean-up teams.", icon: "ri-group-line", price: "Free quote" },
  { service: "Garbage collection", note: "Scheduled collection, transport and disposal.", icon: "ri-recycle-line", price: "Free quote" },
  { service: "Fumigation & pest control", note: "Trained fumigators in PPE with premium products.", icon: "ri-bug-line", price: "Free quote" },
  { service: "Scaffolding & crane hire", note: "Scaffolding, crane hire and high-rise windows.", icon: "ri-building-line", price: "Free quote" },
];