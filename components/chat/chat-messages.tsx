"use client";

import React, { useRef, useEffect } from "react";
import type { ChatSession, PlaceData } from "./types";
import MessageBubble from "./message-bubble";

// ─── Props ──────────────────────────────────────────────────────────────────
interface ChatMessagesProps {
  chat: ChatSession;
  onExpandImage: (url: string) => void;
  onExpandPlace: (place: PlaceData) => void;
  onToggleVote: (messageId: string, optionId: string) => void;
  onAddPollOption: (messageId: string, optionText: string) => void;
  onShowVoters: (label: string, voters: string[]) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChatMessages({
  chat,
  onExpandImage,
  onExpandPlace,
  onToggleVote,
  onAddPollOption,
  onShowVoters,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 minimal-scrollbar chat-messages-area">
      {/* Welcome message area */}
      {chat.messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
            <span className="text-2xl">💬</span>
          </div>
          <p className="font-semibold text-stone-500">No messages yet</p>
          <p className="text-sm">Send a message to start the conversation!</p>
        </div>
      )}

      {/* Messages */}
      {chat.messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          onExpandImage={onExpandImage}
          onExpandPlace={onExpandPlace}
          onToggleVote={onToggleVote}
          onAddPollOption={onAddPollOption}
          onShowVoters={onShowVoters}
        />
      ))}

      {/* Typing indicator */}
      {chat.isTyping && (
        <div className="flex items-center gap-2.5 chat-msg-enter">
          <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0" />
          <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div className="chat-typing-dots flex gap-1">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
