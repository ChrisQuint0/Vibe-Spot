"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { ChatSession, PlaceData } from "@/components/chat/types";
import { INITIAL_CHATS, MY_ID } from "@/components/chat/mock-data";

// ─── Context Type ───────────────────────────────────────────────────────────
interface ChatContextType {
  chats: ChatSession[];
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  sendPlaceToChat: (chatId: string, place: PlaceData) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────────────────
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);

  const sendPlaceToChat = useCallback(
    (chatId: string, place: PlaceData) => {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          const newMessage = {
            id: `shared-${Date.now()}`,
            sender: "You",
            senderId: MY_ID,
            time: new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
            isMe: true,
            type: "place" as const,
            place,
          };
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastActivity: "Just now",
          };
        }),
      );
    },
    [],
  );

  return (
    <ChatContext.Provider value={{ chats, setChats, sendPlaceToChat }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within ChatProvider");
  return context;
};
