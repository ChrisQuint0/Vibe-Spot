// lib/mock-data.ts

// ─── Types ─────────────────────────────────────────────────────────────────

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  images: string[];
  category: string;
  description: string;
  address: string;
  price: string;
  tags: string[];
  hours: string;
}

export interface Recommendation {
  id: string;
  title: string;
  locations: Location[];
  mode: "anywhere" | "near";
}

// Simulated user location (Kapitolyo, Pasig) used for "Near Me" mode
export const USER_LOCATION = { lat: 14.5795, lng: 121.0614 };

// ─── Top 5 Coffee Shops (main showcase) ────────────────────────────────────

export const TOP_COFFEE_SHOPS: Location[] = [
  {
    id: "coffee_1",
    name: "Kape Sina Una",
    lat: 14.5802,
    lng: 121.0614,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "A quiet, rustic cafe tucked away in Kapitolyo. Known for its locally sourced beans and reliable high-speed WiFi. Perfect for long focused work sessions.",
    address: "3rd St, Kapitolyo, Pasig City",
    price: "₱150 – ₱300 per person",
    tags: ["WiFi", "Quiet", "Local Beans"],
    hours: "8:00 AM - 10:00 PM",
  },
  {
    id: "coffee_2",
    name: "The Glasshouse Hub",
    lat: 14.5855,
    lng: 121.0588,
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Co-working Cafe",
    description:
      "Modern, sunlit co-working cafe offering specialty lattes and ergonomic seating. The ambient lo-fi music creates an excellent creative vibe.",
    address: "Ortigas Center, Pasig City",
    price: "₱350 – ₱600 per person",
    tags: ["Ergonomic", "Specialty Coffee", "Lots of Outlets"],
    hours: "7:00 AM - 11:00 PM",
  },
  {
    id: "coffee_3",
    name: "Brew & Books",
    lat: 14.5724,
    lng: 121.0599,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe / Library",
    description:
      "A hybrid library and cafe featuring floor-to-ceiling bookshelves and incredible matcha lattes. Very strict noise rules make it a haven for studying.",
    address: "Estancia Mall, Pasig City",
    price: "₱120 – ₱280 per person",
    tags: ["Matcha", "Library", "No Talking Zone"],
    hours: "10:00 AM - 9:00 PM",
  },
  {
    id: "coffee_4",
    name: "Kopi & Co.",
    lat: 14.577,
    lng: 121.063,
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "Minimalist cafe with a great city view, lots of natural light, and excellent pour-overs. A go-to for those who appreciate clean, simple coffee craft.",
    address: "Shaw Blvd, Pasig City",
    price: "₱130 – ₱250 per person",
    tags: ["Pour-over", "Minimalist", "Views"],
    hours: "9:00 AM - 9:00 PM",
  },
  {
    id: "coffee_5",
    name: "Bean & Yolk",
    lat: 14.582,
    lng: 121.06,
    images: [
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "Specialty coffee paired with amazing egg-based brunch meals. High-speed internet is available, making it a great spot for remote workers.",
    address: "West Capitol Drive, Pasig",
    price: "₱150 – ₱320 per person",
    tags: ["Brunch", "Fast WiFi", "Specialty Coffee"],
    hours: "8:00 AM - 8:00 PM",
  },
];

// ─── 5 More Coffee Shops (for "More Recommendations" cards) ────────────────

export const MORE_COFFEE_SHOPS: Location[] = [
  {
    id: "coffee_6",
    name: "Flat White Society",
    lat: 14.5835,
    lng: 121.0565,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", // Replaced with a working cafe interior image
    ],
    category: "Specialty Cafe",
    description:
      "Aussie-inspired specialty cafe known for its velvety flat whites and cold brew on tap. A bright, airy space with communal tables perfect for catching up over coffee.",
    address: "Capitol Commons, Pasig City",
    price: "₱300 – ₱550 per person",
    tags: ["Flat White", "Cold Brew", "Airy Space"],
    hours: "7:30 AM - 9:00 PM",
  },
  {
    id: "coffee_7",
    name: "Mugshot Coffee Bar",
    lat: 14.5763,
    lng: 121.0641,
    images: [
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "Industrial-chic coffee bar with exposed brick and vintage decor. Famous for its signature dirty espresso and house-made syrups. Great for afternoon hangs.",
    address: "Brixton St, Kapitolyo, Pasig",
    price: "₱100 – ₱240 per person",
    tags: ["Dirty Coffee", "Industrial", "Instagrammable"],
    hours: "9:00 AM - 10:00 PM",
  },
  {
    id: "coffee_8",
    name: "Siphon & Co.",
    lat: 14.5791,
    lng: 121.0578,
    images: [
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Third-wave Cafe",
    description:
      "A third-wave coffee sanctuary offering siphon-brewed single origins and cupping sessions on weekends. Ideal for coffee geeks who want to explore the science behind the brew.",
    address: "United St, Pasig City",
    price: "₱350 – ₱600 per person",
    tags: ["Siphon Brew", "Single Origin", "Cupping"],
    hours: "9:00 AM - 8:00 PM",
  },
  {
    id: "coffee_9",
    name: "The Perch Cafe",
    lat: 14.5748,
    lng: 121.0612,
    images: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Rooftop Cafe",
    description:
      "A rooftop cafe with stunning Pasig skyline views. Serves refreshing cold coffees and craft sodas. The sunset hour is absolutely magical here.",
    address: "East Capitol Drive, Pasig City",
    price: "₱120 – ₱260 per person",
    tags: ["Rooftop", "Skyline View", "Sunset Spot"],
    hours: "10:00 AM - 11:00 PM",
  },
  {
    id: "coffee_10",
    name: "Arabica District",
    lat: 14.5812,
    lng: 121.0629,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "A neighborhood cafe celebrating Philippine coffee culture. Sources its beans directly from Benguet and Sagada farmers. Cozy, warm, and authentically local.",
    address: "Ortigas Ave Ext, Pasig City",
    price: "₱100 – ₱220 per person",
    tags: ["Local Beans", "Benguet", "Community Cafe"],
    hours: "8:00 AM - 9:00 PM",
  },
];

// ─── Near Me coffee shops (within 7.5 km of USER_LOCATION) ────────────────

export const NEAR_ME_COFFEE_SHOPS: Location[] = [
  {
    id: "near_1",
    name: "Kape Sina Una",
    lat: 14.5802,
    lng: 121.0614,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "A quiet, rustic cafe tucked away in Kapitolyo. Known for its locally sourced beans and reliable high-speed WiFi. Only 0.1 km from your location — practically your backyard cafe.",
    address: "3rd St, Kapitolyo, Pasig City",
    price: "₱150 – ₱300 per person",
    tags: ["WiFi", "Quiet", "Local Beans", "Closest to You"],
    hours: "8:00 AM - 10:00 PM",
  },
  {
    id: "near_2",
    name: "Mugshot Coffee Bar",
    lat: 14.5763,
    lng: 121.0641,
    images: [
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "Industrial-chic coffee bar with exposed brick and vintage decor. Famous for its signature dirty espresso and house-made syrups. About 0.4 km away.",
    address: "Brixton St, Kapitolyo, Pasig",
    price: "₱100 – ₱240 per person",
    tags: ["Dirty Coffee", "Industrial", "Instagrammable"],
    hours: "9:00 AM - 10:00 PM",
  },
  {
    id: "near_3",
    name: "Arabica District",
    lat: 14.5812,
    lng: 121.0629,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "A neighborhood cafe celebrating Philippine coffee culture. Sources beans directly from Benguet and Sagada farmers. About 0.3 km from you.",
    address: "Ortigas Ave Ext, Pasig City",
    price: "₱100 – ₱220 per person",
    tags: ["Local Beans", "Benguet", "Community Cafe"],
    hours: "8:00 AM - 9:00 PM",
  },
  {
    id: "near_4",
    name: "Kopi & Co.",
    lat: 14.577,
    lng: 121.063,
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Cafe",
    description:
      "Minimalist cafe with great city views, lots of natural light, and excellent pour-overs. About 1 km away — a short walk or a quick ride.",
    address: "Shaw Blvd, Pasig City",
    price: "₱130 – ₱250 per person",
    tags: ["Pour-over", "Minimalist", "Views"],
    hours: "9:00 AM - 9:00 PM",
  },
  {
    id: "near_5",
    name: "The Glasshouse Hub",
    lat: 14.5855,
    lng: 121.0588,
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Co-working Cafe",
    description:
      "Modern, sunlit co-working cafe with specialty lattes and ergonomic seating. About 0.7 km north of your location — great for a productive morning.",
    address: "Ortigas Center, Pasig City",
    price: "₱350 – ₱600 per person",
    tags: ["Ergonomic", "Specialty Coffee", "Lots of Outlets"],
    hours: "7:00 AM - 11:00 PM",
  },
];

// ─── Base recommendation objects ────────────────────────────────────────────

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec_coffee_pasig",
    title: "Top Coffee Shops in Pasig",
    locations: TOP_COFFEE_SHOPS,
    mode: "anywhere",
  },
  {
    id: "rec_coffee_near",
    title: "Coffee Shops Near You",
    locations: NEAR_ME_COFFEE_SHOPS,
    mode: "near",
  },
];
