export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  guests: string;
  image: string;
  features: string[];
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface DiningVenue {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
}

export const hotelInfo = {
  name: "Aurelia House",
  tagline: "A slower way to stay.",
  description:
    "Aurelia House is a refined boutique hotel created for travelers who appreciate beautiful spaces, thoughtful service, and the luxury of time.",
  address: "12 Ocean View Avenue, Lagos, Nigeria",
  phone: "+234 800 123 4567",
  email: "hello@aureliahouse.com",
};

export const navigation = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/about" },
  { label: "Dining", path: "/dining" },
  { label: "Experiences", path: "/experiences" },
  { label: "Contact", path: "/contact" },
];

export const rooms: Room[] = [
  {
    id: 1,
    name: "The Garden Room",
    description:
      "A serene retreat overlooking our tropical gardens, designed with natural textures and warm, understated details.",
    price: 320,
    size: "42 m²",
    guests: "2 guests",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    features: [
      "King-size bed",
      "Garden terrace",
      "Rainfall shower",
      "Complimentary breakfast",
    ],
  },
  {
    id: 2,
    name: "Ocean Suite",
    description:
      "An expansive suite with sweeping ocean views, a private sitting room, and a terrace made for long afternoons.",
    price: 480,
    size: "68 m²",
    guests: "2 guests",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    features: [
      "King-size bed",
      "Ocean terrace",
      "Separate living room",
      "Butler service",
    ],
  },
  {
    id: 3,
    name: "Aurelia Residence",
    description:
      "Our signature residence combines complete privacy with generous living spaces and a private plunge pool.",
    price: 720,
    size: "110 m²",
    guests: "4 guests",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    features: [
      "Private pool",
      "Two bedrooms",
      "Private dining room",
      "Personal concierge",
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Morning by the Sea",
    description:
      "Begin the day with a private breakfast on the shore as the city slowly wakes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "The Aurelia Spa",
    description:
      "A quiet sanctuary of restorative treatments, warm oils, and unhurried rituals.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Private City Table",
    description:
      "Discover the city's best flavors through a personalized culinary journey.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",
  },
];

export const diningVenues: DiningVenue[] = [
  {
    id: 1,
    name: "Mare",
    type: "All-day dining",
    description:
      "A light-filled restaurant celebrating coastal ingredients, seasonal produce, and simple cooking.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "The Veranda",
    type: "Cocktails & conversation",
    description:
      "An intimate evening bar serving elegant cocktails, small plates, and live acoustic sessions.",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "The Garden Table",
    type: "Private dining",
    description:
      "An intimate outdoor dining experience surrounded by palms, candlelight, and greenery.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  },
];

export const amenities = [
  "24-hour concierge",
  "Infinity pool",
  "Aurelia spa",
  "Fitness studio",
  "Complimentary Wi-Fi",
  "Airport transfers",
  "Daily breakfast",
  "Private beach access",
];

export const stats = [
  { value: "28", label: "Private rooms & suites" },
  { value: "12", label: "Years of hospitality" },
  { value: "24/7", label: "Personal service" },
  { value: "4.9", label: "Guest rating" },
];