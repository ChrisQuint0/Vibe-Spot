// ─── Chat Mock Data ─────────────────────────────────────────────────────────
// Centralized mock data for the chat feature.
// Provides friends, group chats, DM conversations, and helper utilities.

import type { Friend, ChatSession } from "./types";

// ─── Identity ───────────────────────────────────────────────────────────────
export const MY_ID = "me";
export const MY_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop";

// ─── Friends List ───────────────────────────────────────────────────────────
export const FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Alex Rivera",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    isOnline: true,
  },
  {
    id: "2",
    name: "Sam Chen",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    isOnline: true,
  },
  {
    id: "3",
    name: "Jordan Reyes",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    isOnline: false,
  },
  {
    id: "4",
    name: "Taylor Swift",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    isOnline: true,
  },
  {
    id: "5",
    name: "Chris Evans",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    isOnline: false,
  },
];

// ─── Helper Utilities ───────────────────────────────────────────────────────
export const getUserAvatar = (id: string): string =>
  id === MY_ID ? MY_AVATAR : FRIENDS.find((f) => f.id === id)?.avatar || "";

export const getUserName = (id: string): string =>
  id === MY_ID ? "You" : FRIENDS.find((f) => f.id === id)?.name || "Unknown";

export const getFriend = (id: string): Friend | undefined =>
  FRIENDS.find((f) => f.id === id);

// ─── Emoji Palette ──────────────────────────────────────────────────────────
export const EMOJIS = ["👍", "❤️", "😂", "🔥", "✨", "☕", "🍕", "🚀", "🎉", "💯", "😍", "🤔", "👏", "🙌", "💪", "🌟"];

// ─── DM Helper ──────────────────────────────────────────────────────────────
/** Get the other member's ID in a DM chat */
export const getDmPartnerId = (chat: ChatSession): string | undefined =>
  chat.type === "dm" ? chat.members.find((id) => id !== MY_ID) : undefined;

/** Get the DM partner's Friend object */
export const getDmPartner = (chat: ChatSession): Friend | undefined => {
  const partnerId = getDmPartnerId(chat);
  return partnerId ? getFriend(partnerId) : undefined;
};

// ─── Initial Chat Sessions ──────────────────────────────────────────────────
export const INITIAL_CHATS: ChatSession[] = [
  // ── Group Chat: Saturday Coffee Run ─────────────────────────────────────
  {
    id: "chat-1",
    name: "Saturday Coffee Run",
    type: "group",
    creatorId: MY_ID,
    members: [MY_ID, "1", "2", "3"],
    lastActivity: "10:15 AM",
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "m1",
        sender: "Alex Rivera",
        senderId: "1",
        time: "10:02 AM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[0].avatar,
        text: "Hey everyone! Ready to plan the weekend? I'm craving good coffee ☕",
      },
      {
        id: "m2",
        sender: "Sam Chen",
        senderId: "2",
        time: "10:05 AM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[1].avatar,
        text: "Same here! Anyone free this Saturday? ✨",
      },
      {
        id: "m3",
        sender: "You",
        senderId: MY_ID,
        time: "10:08 AM",
        isMe: true,
        type: "place",
        place: {
          name: "Kape Sina Una",
          category: "CAFE",
          price: "P150 - P300",
          distance: "0.1 km away",
          description:
            "A quiet, rustic cafe tucked away in Kapitolyo. Known for its locally sourced beans.",
          image:
            "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80",
          address: "3rd St, Kapitolyo, Pasig City",
          tags: ["Quiet", "Good WiFi", "Rustic"],
          hours: "8:00 AM - 10:00 PM",
        },
      },
      {
        id: "m4",
        sender: "Sam Chen",
        senderId: "2",
        time: "10:12 AM",
        isMe: false,
        type: "place",
        avatar: FRIENDS[1].avatar,
        place: {
          name: "Commune Cafe",
          category: "COFFEE SHOP",
          price: "P200 - P400",
          distance: "1.5 km away",
          description:
            "Famous for their 3D latte art and cozy ambiance. Great for catching up.",
          image:
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80",
          address: "Polaris St, Poblacion",
          tags: ["Aesthetic", "Latte Art", "Lively"],
          hours: "9:00 AM - 11:00 PM",
        },
      },
      {
        id: "m5",
        sender: "Alex Rivera",
        senderId: "1",
        time: "10:15 AM",
        isMe: false,
        type: "poll",
        avatar: FRIENDS[0].avatar,
        poll: {
          question: "Which cafe should we visit?",
          options: [
            { id: "o1", label: "Kape Sina Una", voters: ["1", "2", "3"] },
            { id: "o2", label: "Commune Cafe", voters: ["1"] },
          ],
        },
      },
      {
        id: "m6",
        sender: "Alex Rivera",
        senderId: "1",
        time: "10:16 AM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[0].avatar,
        text: "@vibe can you recommend a good dessert place near Kapitolyo?",
      },
      {
        id: "m7",
        sender: "VibeSpot AI",
        senderId: "vibe",
        time: "10:16 AM",
        isMe: false,
        type: "ai",
        avatar: "/vibespot_logo_white_nobg.png",
        text: "I found a highly-rated dessert place near Kapitolyo for you!",
        place: {
          name: "Lia's Cakes in Season",
          category: "DESSERT",
          price: "P150 - P300",
          distance: "0.3 km away",
          description: "Famous for their Avocado Cake and seasonal fruit creations.",
          image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80",
          address: "25 A East Capitol Drive, Pasig City",
          tags: ["Avocado Cake", "Cozy", "Dessert"],
          hours: "10:00 AM - 10:00 PM",
        },
      },
    ],
  },

  // ── Group Chat: Food Trip Crew ──────────────────────────────────────────
  {
    id: "chat-2",
    name: "Food Trip Crew 🍕",
    type: "group",
    creatorId: "4",
    members: [MY_ID, "2", "4", "5"],
    lastActivity: "Yesterday",
    unreadCount: 3,
    isTyping: false,
    messages: [
      {
        id: "ft1",
        sender: "Taylor Swift",
        senderId: "4",
        time: "6:30 PM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[3].avatar,
        text: "Who's up for some ramen this weekend? 🍜",
      },
      {
        id: "ft2",
        sender: "Chris Evans",
        senderId: "5",
        time: "6:45 PM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[4].avatar,
        text: "I'm in! I know a spot in Poblacion that's amazing.",
      },
      {
        id: "ft3",
        sender: "Sam Chen",
        senderId: "2",
        time: "7:00 PM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[1].avatar,
        text: "Count me in too! Let's set a time 🙌",
      },
      {
        id: "ft4",
        sender: "Sam Chen",
        senderId: "2",
        time: "7:05 PM",
        isMe: false,
        type: "image",
        avatar: FRIENDS[1].avatar,
        text: "Look at this ramen from last week! 🤤",
        imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&q=80",
      },
    ],
  },

  // ── DM: Alex Rivera ────────────────────────────────────────────────────
  {
    id: "dm-1",
    name: "Alex Rivera",
    type: "dm",
    members: [MY_ID, "1"],
    lastActivity: "9:30 AM",
    unreadCount: 1,
    isTyping: false,
    messages: [
      {
        id: "dm1-1",
        sender: "Alex Rivera",
        senderId: "1",
        time: "9:15 AM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[0].avatar,
        text: "Hey! Have you been to that new cafe near Kapitolyo? I heard it's really good.",
      },
      {
        id: "dm1-2",
        sender: "You",
        senderId: MY_ID,
        time: "9:20 AM",
        isMe: true,
        type: "text",
        text: "Not yet! But I've been meaning to check it out. Want to go together?",
      },
      {
        id: "dm1-3",
        sender: "Alex Rivera",
        senderId: "1",
        time: "9:30 AM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[0].avatar,
        text: "Yes! Let's plan for this week. I'll send you the details 📍",
      },
    ],
  },

  // ── DM: Taylor Swift ──────────────────────────────────────────────────
  {
    id: "dm-2",
    name: "Taylor Swift",
    type: "dm",
    members: [MY_ID, "4"],
    lastActivity: "2 days ago",
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "dm2-1",
        sender: "You",
        senderId: MY_ID,
        time: "3:00 PM",
        isMe: true,
        type: "text",
        text: "Hey Taylor! Check out this place I found for our meetup 👇",
      },
      {
        id: "dm2-2",
        sender: "You",
        senderId: MY_ID,
        time: "3:01 PM",
        isMe: true,
        type: "place",
        place: {
          name: "Lomi King",
          category: "RESTAURANT",
          price: "P100 - P250",
          distance: "0.8 km away",
          description:
            "The best lomi in Pasig. A local favorite with generous portions and homestyle cooking.",
          image:
            "https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&q=80",
          address: "C. Raymundo Ave, Pasig City",
          tags: ["Local Fave", "Budget", "Comfort Food"],
          hours: "7:00 AM - 9:00 PM",
        },
      },
      {
        id: "dm2-3",
        sender: "Taylor Swift",
        senderId: "4",
        time: "4:15 PM",
        isMe: false,
        type: "text",
        avatar: FRIENDS[3].avatar,
        text: "Omg this looks amazing! 😍 Let's definitely go here. What day works for you?",
      },
    ],
  },
];
