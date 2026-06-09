// lib/mock-data.ts

export const MOCK_RECOMMENDATIONS = [
  {
    id: "rec_1",
    title: "Hidden Pasig Cafes for Deep Work",
    locations: [
      {
        id: "loc_1",
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
        price: "₱₱",
        tags: ["WiFi", "Quiet", "Local Beans"],
        hours: "8:00 AM - 10:00 PM",
      },
      {
        id: "loc_2",
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
        price: "₱₱₱",
        tags: ["Ergonomic", "Specialty Coffee", "Lots of Outlets"],
        hours: "7:00 AM - 11:00 PM",
      },
      {
        id: "loc_3",
        name: "Brew & Books",
        lat: 14.5724,
        lng: 121.0599,
        images: [
          "https://images.unsplash.com/photo-1521017430205-025b411d4d02?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Cafe / Library",
        description:
          "A hybrid library and cafe. It features floor-to-ceiling bookshelves and serves incredible matcha lattes. Very strict noise rules make it a haven for studying.",
        address: "Estancia Mall, Pasig City",
        price: "₱₱",
        tags: ["Matcha", "Library", "No Talking Zone"],
        hours: "10:00 AM - 9:00 PM",
      },
      {
        id: "loc_4",
        name: "Kopi & Co.",
        lat: 14.577,
        lng: 121.063,
        images: [
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Cafe",
        description:
          "Minimalist cafe with a great view of the city. Lots of natural light and excellent pour-overs.",
        address: "Shaw Blvd, Pasig City",
        price: "₱₱",
        tags: ["Pour-over", "Minimalist", "Views"],
        hours: "9:00 AM - 9:00 PM",
      },
      {
        id: "loc_5",
        name: "Bean & Yolk",
        lat: 14.582,
        lng: 121.06,
        images: [
          "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Cafe",
        description:
          "Specialty coffee paired with amazing egg-based brunch meals. High-speed internet is available.",
        address: "West Capitol Drive, Pasig",
        price: "₱₱",
        tags: ["Brunch", "Fast WiFi", "Specialty Coffee"],
        hours: "8:00 AM - 8:00 PM",
      },
    ],
  },
  {
    id: "rec_2",
    title: "Kapitolyo Food Crawl",
    locations: [
      {
        id: "loc_6",
        name: "Locavore Kitchen & Drinks",
        lat: 14.5731,
        lng: 121.0583,
        images: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Restaurant",
        description:
          "Famous for its modern twist on Filipino classics, especially the Sizzling Sinigang. A must-visit for foodies exploring the area.",
        address: "10 Brixton St, Kapitolyo, Pasig",
        price: "₱₱₱",
        tags: ["Filipino", "Dinner", "Cocktails"],
        hours: "11:00 AM - 11:00 PM",
      },
      {
        id: "loc_7",
        name: "Poco Deli",
        lat: 14.575,
        lng: 121.059,
        images: [
          "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Deli & Restaurant",
        description:
          "A cozy neighborhood deli offering artisan sausages, cured meats, and an impressive selection of imported beers and wines.",
        address: "21 East Capitol Drive, Kapitolyo, Pasig",
        price: "₱₱",
        tags: ["European", "Sausages", "Wine"],
        hours: "10:00 AM - 10:00 PM",
      },
      {
        id: "loc_8",
        name: "Three Sisters",
        lat: 14.574,
        lng: 121.06,
        images: [
          "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Restaurant",
        description:
          "A Kapitolyo staple known for affordable and delicious pork barbecue and Filipino comfort food.",
        address: "East Capitol Drive, Kapitolyo",
        price: "₱",
        tags: ["BBQ", "Filipino", "Affordable"],
        hours: "10:00 AM - 10:00 PM",
      },
      {
        id: "loc_9",
        name: "Silantro Fil-Mex",
        lat: 14.576,
        lng: 121.057,
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Restaurant",
        description:
          "Hearty, cheesy, and packed with flavor. This Fil-Mex cantina is always bustling with people looking for great quesadillas.",
        address: "75 East Capitol Drive",
        price: "₱₱",
        tags: ["Mexican", "Lively", "Generous Portions"],
        hours: "11:00 AM - 11:00 PM",
      },
    ],
  },
  {
    id: "rec_3",
    title: "Weekend Chill Spots",
    locations: [
      {
        id: "loc_10",
        name: "Rainforest Adventure Park",
        lat: 14.5615,
        lng: 121.0963,
        images: [
          "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Park",
        description:
          "A massive urban park offering a water park, zoo, botanical garden, and plenty of picnic spots. A breath of fresh air in the city.",
        address: "F. Legaspi Ave, Pasig City",
        price: "₱",
        tags: ["Nature", "Family Friendly", "Outdoors"],
        hours: "8:00 AM - 5:00 PM",
      },
      {
        id: "loc_11",
        name: "Pasig City Museum",
        lat: 14.559,
        lng: 121.082,
        images: [
          "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Museum",
        description:
          "Learn about the rich history of Pasig City in this beautifully preserved heritage house.",
        address: "Plaza Rizal, Pasig",
        price: "Free",
        tags: ["History", "Culture", "Indoor"],
        hours: "8:00 AM - 5:00 PM",
      },
      {
        id: "loc_12",
        name: "Ace Water Spa",
        lat: 14.5775,
        lng: 121.0595,
        images: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Spa / Wellness",
        description:
          "Indoor water spa offering hydrotherapy massages, hot pools, and a relaxing sauna experience.",
        address: "United St, Kapitolyo, Pasig",
        price: "₱₱₱",
        tags: ["Relaxation", "Hydrotherapy", "Indoor"],
        hours: "6:00 AM - 10:00 PM",
      },
      {
        id: "loc_13",
        name: "Capitol Commons Park",
        lat: 14.5768,
        lng: 121.0622,
        images: [
          "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
        ],
        category: "Park",
        description:
          "A clean, vibrant open space perfect for walking dogs, jogging, or a late afternoon picnic with friends.",
        address: "Capitol Commons, Pasig",
        price: "Free",
        tags: ["Dog Friendly", "Open Space", "Picnic"],
        hours: "Open 24 Hours",
      },
    ],
  },
];
