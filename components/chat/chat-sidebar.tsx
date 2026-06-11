"use client";

import React from "react";
import { Search, Plus, Users, MessageSquare } from "lucide-react";
import type { ChatSession, FilterTab } from "./types";
import { MY_ID, getDmPartner, FRIENDS } from "./mock-data";

// ─── Props ──────────────────────────────────────────────────────────────────
interface ChatSidebarProps {
  chats: ChatSession[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterTab: FilterTab;
  onFilterChange: (tab: FilterTab) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  searchQuery,
  onSearchChange,
  filterTab,
  onFilterChange,
}: ChatSidebarProps) {
  // Filter chats by tab and search query
  const filteredChats = chats.filter((chat) => {
    // Tab filter
    if (filterTab === "groups" && chat.type !== "group") return false;
    if (filterTab === "direct" && chat.type !== "dm") return false;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const nameMatch = chat.name.toLowerCase().includes(query);
      const lastMsg = chat.messages[chat.messages.length - 1];
      const msgMatch = lastMsg?.text?.toLowerCase().includes(query) || false;
      return nameMatch || msgMatch;
    }
    return true;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "groups", label: "Groups" },
    { key: "direct", label: "Direct" },
  ];

  return (
    <div className="chat-sidebar flex flex-col h-full bg-white">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="chat-sidebar-header shrink-0 p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Messages
          </h2>
          <button
            onClick={onNewChat}
            className="chat-new-btn w-9 h-9 flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="New conversation"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={16}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex bg-stone-100 rounded-xl p-1 gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                filterTab === tab.key
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat List ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto minimal-scrollbar px-2 pb-2">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-stone-400">
            <MessageSquare size={32} className="mb-2 opacity-50" />
            <p className="text-sm font-medium">No conversations found</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredChats.map((chat) => {
              const isActive = chat.id === activeChatId;
              const lastMessage = chat.messages[chat.messages.length - 1];
              const dmPartner = getDmPartner(chat);
              const chatAvatar =
                chat.type === "dm" ? dmPartner?.avatar : chat.photo;
              const isOnline =
                chat.type === "dm" ? dmPartner?.isOnline : false;

              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`chat-list-item group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-emerald-50 border border-emerald-200/60"
                      : "hover:bg-stone-50 border border-transparent"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {chatAvatar ? (
                      <img
                        src={chatAvatar}
                        alt={chat.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 transition-colors ${
                          isActive ? "border-emerald-300" : "border-stone-200"
                        }`}
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          isActive
                            ? "bg-emerald-200 text-emerald-800 border-2 border-emerald-300"
                            : "bg-stone-200 text-stone-600 border-2 border-stone-200"
                        }`}
                      >
                        {chat.type === "group" ? (
                          <Users size={18} />
                        ) : (
                          chat.name.substring(0, 2).toUpperCase()
                        )}
                      </div>
                    )}
                    {/* Online status dot */}
                    {isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full chat-online-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3
                        className={`font-semibold truncate text-sm ${
                          isActive ? "text-emerald-900" : "text-stone-800"
                        } ${chat.unreadCount > 0 ? "font-bold" : ""}`}
                      >
                        {chat.name}
                      </h3>
                      <span
                        className={`text-[11px] shrink-0 ml-2 ${
                          chat.unreadCount > 0
                            ? "text-emerald-600 font-semibold"
                            : "text-stone-400"
                        }`}
                      >
                        {chat.lastActivity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-xs truncate ${
                          chat.unreadCount > 0
                            ? "text-stone-700 font-medium"
                            : "text-stone-500"
                        }`}
                      >
                        {chat.isTyping ? (
                          <span className="text-emerald-600 font-medium italic">
                            typing...
                          </span>
                        ) : lastMessage ? (
                          <>
                            {lastMessage.senderId === MY_ID
                              ? "You: "
                              : chat.type === "group"
                                ? `${lastMessage.sender.split(" ")[0]}: `
                                : ""}
                            {lastMessage.type === "place"
                              ? "Shared a place 📍"
                              : lastMessage.type === "image"
                                ? "Sent an image 🖼️"
                                : lastMessage.type === "poll"
                                  ? "Created a poll 📊"
                                  : lastMessage.text}
                          </>
                        ) : (
                          "No messages yet"
                        )}
                      </p>
                      {/* Unread badge */}
                      {chat.unreadCount > 0 && (
                        <span className="chat-unread-badge ml-2 shrink-0 min-w-[20px] h-5 flex items-center justify-center bg-emerald-500 text-white text-[10px] font-bold rounded-full px-1.5">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
