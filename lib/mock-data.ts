export const MOCK_LOCATIONS = [
  {
    id: "loc-1",
    name: "Kendo Creative Space",
    category: "Coworking Café",
    description:
      "This cozy café is ideal for students and remote workers due to its reliable WiFi, comfortable seating, and affordable menu. Tucked away in Kapitolyo, it offers a distraction-free zone.",
    tags: ["Quiet", "Good WiFi", "Student Friendly"],
    address: "East Capitol Drive, Kapitolyo, Pasig",
    hours: "8:00 AM - 10:00 PM",
    price: "₱200-₱500",
    lat: 14.5764,
    lng: 121.0596,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "loc-2",
    name: "Talisay The Garden Cafe",
    category: "Restaurant",
    description:
      "A beautiful garden setting perfect for intimate conversations. Known for their elevated local cuisine and relaxing ambiance away from the city noise.",
    tags: ["Outdoor Seating", "Date Night", "Scenic"],
    address: "Maginhawa St, Kapitolyo, Pasig",
    hours: "11:00 AM - 9:00 PM",
    price: "₱500-₱1,000",
    lat: 14.5731,
    lng: 121.0615,
    images: [
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "loc-3",
    name: "Candid Coffee",
    category: "Coffee Shop",
    description:
      "A vibrant spot with premium locally roasted beans. It has an energetic vibe that's great for casual meetups and brainstorming sessions.",
    tags: ["Great Coffee", "Pet Friendly", "Lively"],
    address: "Greenfield District, Mandaluyong/Pasig",
    hours: "7:00 AM - 11:00 PM",
    price: "Under ₱200",
    lat: 14.5772,
    lng: 121.0536,
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: "rec-1",
    title: "Hidden Cafés for Deep Work",
    locations: MOCK_LOCATIONS,
  },
  {
    id: "rec-2",
    title: "Weekend Nature Escape",
    locations: [...MOCK_LOCATIONS].reverse(),
  },
  {
    id: "rec-3",
    title: "Food Crawl Around the City",
    locations: [MOCK_LOCATIONS[1], MOCK_LOCATIONS[2], MOCK_LOCATIONS[0]],
  },
];
