// ─── Chat Module Type Definitions ───────────────────────────────────────────
// Central type system for the Vibe Spot chat feature.
// All chat components import types from this single source of truth.

export type PollOption = {
  id: string;
  label: string;
  voters: string[];
};

export type PlaceData = {
  name: string;
  category: string;
  description: string;
  image: string;
  price: string;
  distance: string;
  address: string;
  tags: string[];
  hours: string;
};

export type MessageType = "text" | "image" | "poll" | "place" | "ai";

export type Message = {
  id: string;
  sender: string;
  senderId: string;
  time: string;
  isMe: boolean;
  avatar?: string;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  poll?: {
    question: string;
    options: PollOption[];
  };
  place?: PlaceData;
  isDeletedForEveryone?: boolean;
  deletedForUsers?: string[];
  editCount?: number;
  isEdited?: boolean;
  editHistory?: { text: string; time: string }[];
};

export type ChatType = "group" | "dm";

export type ChatSession = {
  id: string;
  name: string;
  type: ChatType;
  creatorId?: string;
  photo?: string;
  members: string[];
  messages: Message[];
  lastActivity: string;
  unreadCount: number;
  isTyping: boolean;
};

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

export type MobileView = "list" | "chat";

export type FilterTab = "all" | "groups" | "direct";

export type VotersModalData = {
  label: string;
  voters: string[];
} | null;
