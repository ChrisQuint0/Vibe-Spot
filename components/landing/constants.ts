export interface SpotInfo {
  spotId: number;
  group: string;
  msg: string;
  side: "left" | "right";
  top: string;
}

export const spotData: Record<number, SpotInfo> = {
  1: {
    spotId: 1,
    group: "Date Night Selection 🕯️",
    msg: "Haru Sushi garden seating is leading our poll tonight!",
    side: "left",
    top: "15%",
  },
  2: {
    spotId: 2,
    group: "Commons Chillouts 🍹",
    msg: "Sunset view spot found! 4 group members are within walking distance.",
    side: "left",
    top: "44%",
  },
  3: {
    spotId: 3,
    group: "Midnight Munchies 🌮",
    msg: "AI located 3 highly-rated 24/7 diners that can seat 10 people.",
    side: "left",
    top: "72%",
  },
  4: {
    spotId: 4,
    group: "Ortigas Tech Squad 💻",
    msg: "AI selected spots with dual-ISP WiFi & plenty of backup power outlets!",
    side: "right",
    top: "15%",
  },
  5: {
    spotId: 5,
    group: "Friday Getaways 🚗",
    msg: "Searching group hotspots with parking accommodations for 6 cars.",
    side: "right",
    top: "44%",
  },
  6: {
    spotId: 6,
    group: "Barkada Bites 🍢",
    msg: "Poll Update: Mang Larry's Ihaw leads by 4 group votes!",
    side: "right",
    top: "72%",
  },
};

export const spotsOrder = [1, 4, 2, 5, 3, 6];

export const phrases = [
  "Barkada Hangout",
  "Sunday Bikers Brunch",
  "Co-Working Grind",
  "Romantic Dinner Night",
  "Weekend Brew Run",
];
