"use client";

import React from "react";
import {
  ArrowLeft,
  Menu,
  MoreVertical,
  Users,
  Edit2,
  Camera,
  X,
  Trash2,
} from "lucide-react";
import type { ChatSession } from "./types";
import { getDmPartner } from "./mock-data";

// ─── Props ──────────────────────────────────────────────────────────────────
interface ChatHeaderProps {
  chat: ChatSession;
  isMobile: boolean;
  onBack: () => void;
  onOpenAppSidebar: () => void;
  onOpenMembers: () => void;
  onOpenRename: () => void;
  onGroupPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteChat: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChatHeader({
  chat,
  isMobile,
  onBack,
  onOpenAppSidebar,
  onOpenMembers,
  onOpenRename,
  onGroupPhotoChange,
  onDeleteChat,
}: ChatHeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const settingsRef = React.useRef<HTMLDivElement>(null);

  // Close settings dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSettingsOpen]);

  const dmPartner = getDmPartner(chat);
  const chatAvatar = chat.type === "dm" ? dmPartner?.avatar : chat.photo;
  const isOnline = chat.type === "dm" ? dmPartner?.isOnline : false;

  const subtitle =
    chat.type === "dm"
      ? isOnline
        ? "Online"
        : "Last seen recently"
      : `${chat.members.length} members • Vibe AI Active`;

  return (
    <header className="chat-header h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 relative">
      {/* Left section */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {/* Mobile: Back button + App sidebar trigger */}
        {isMobile && (
          <>
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Back to chat list"
            >
              <ArrowLeft size={20} />
            </button>
          </>
        )}

        {/* Avatar */}
        <div className="relative shrink-0">
          {chatAvatar ? (
            <img
              src={chatAvatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-stone-200"
            />
          ) : (
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
              {chat.type === "group" ? (
                <Users size={18} />
              ) : (
                chat.name.substring(0, 2).toUpperCase()
              )}
            </div>
          )}
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Name + subtitle */}
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-bold text-stone-900 truncate leading-tight">
            {chat.name}
          </h1>
          <p
            className={`text-[11px] font-medium leading-tight ${
              isOnline ? "text-emerald-600" : "text-stone-400"
            }`}
          >
            {chat.isTyping ? (
              <span className="text-emerald-600 italic">typing...</span>
            ) : (
              subtitle
            )}
          </p>
        </div>
      </div>

      {/* Right section: Settings */}
      <div className="flex items-center gap-1">
        {chat.type === "dm" ? (
          <button
            onClick={onDeleteChat}
            className="p-2 text-stone-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
            title="Delete Chat"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl z-50 overflow-hidden chat-dropdown-enter">
                <button
                  onClick={() => {
                    onOpenMembers();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors"
                >
                  <Users size={16} className="text-stone-400" />
                  See Members
                </button>
                <div className="h-px bg-stone-100 mx-3" />
                <button
                  onClick={() => {
                    onOpenRename();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors"
                >
                  <Edit2 size={16} className="text-stone-400" />
                  Rename Group
                </button>
                <button
                  onClick={() => {
                    document.getElementById("chatGroupPhotoUpload")?.click();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors"
                >
                  <Camera size={16} className="text-stone-400" />
                  Change Group Photo
                </button>
                <div className="h-px bg-stone-100 mx-3" />
                <button
                  onClick={() => {
                    onDeleteChat();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                  Delete Group
                </button>
              </div>
            )}
            <input
              type="file"
              id="chatGroupPhotoUpload"
              accept="image/*"
              className="hidden"
              onChange={onGroupPhotoChange}
            />
          </div>
        )}
      </div>
    </header>
  );
}
