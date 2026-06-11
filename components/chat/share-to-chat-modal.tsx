"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Send,
  Users,
  MessageCircle,
  Check,
  MapPin,
} from "lucide-react";
import { useChatContext } from "@/store/chat-context";
import type { PlaceData } from "@/components/chat/types";
import { getDmPartner, getUserAvatar } from "./mock-data";

// ─── Props ──────────────────────────────────────────────────────────────────
interface ShareToChatModalProps {
  place: PlaceData;
  onClose: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ShareToChatModal({
  place,
  onClose,
}: ShareToChatModalProps) {
  const { chats, sendPlaceToChat } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  // Filter chats by search query
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const q = searchQuery.toLowerCase();
    return chats.filter((chat) => {
      const name =
        chat.type === "dm"
          ? getDmPartner(chat)?.name || chat.name
          : chat.name;
      return name.toLowerCase().includes(q);
    });
  }, [chats, searchQuery]);

  const handleSend = () => {
    if (!selectedChatId) return;
    sendPlaceToChat(selectedChatId, place);
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-2xl z-10 w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden relative"
      >
        {/* ── Sent Success State ─────────────────────────────────────────── */}
        <AnimatePresence>
          {isSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <Check size={32} className="text-emerald-600" />
              </motion.div>
              <div className="text-center">
                <p className="font-bold text-stone-900 text-lg">Sent!</p>
                <p className="text-sm text-stone-500 mt-1">
                  Place shared to conversation
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between p-4 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-lg text-stone-900">
              Share to Chat
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Choose a conversation to share this place
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-stone-50 hover:bg-stone-100 text-stone-500 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Place Preview ──────────────────────────────────────────────── */}
        <div className="px-4 py-3 bg-stone-50/60 border-b border-stone-100 flex items-center gap-3">
          <img
            src={place.image}
            alt={place.name}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-stone-800 truncate">
              {place.name}
            </p>
            <p className="text-[11px] text-stone-400 flex items-center gap-1 truncate">
              <MapPin size={10} className="shrink-0" />
              {place.address}
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md shrink-0">
            {place.category}
          </span>
        </div>

        {/* ── Search ─────────────────────────────────────────────────────── */}
        <div className="px-4 py-3 border-b border-stone-100">
          <div className="flex items-center gap-2 bg-stone-100 rounded-xl px-3 py-2.5">
            <Search size={16} className="text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-stone-700 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* ── Chat List ──────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto minimal-scrollbar p-2">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search size={28} className="text-stone-300 mb-2" />
              <p className="text-stone-400 text-sm font-medium">
                No conversations found
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredChats.map((chat) => {
                const isSelected = selectedChatId === chat.id;
                const isDm = chat.type === "dm";
                const dmPartner = isDm ? getDmPartner(chat) : null;
                const displayName = isDm
                  ? dmPartner?.name || chat.name
                  : chat.name;
                const avatar = isDm
                  ? dmPartner?.avatar || ""
                  : chat.photo ||
                    getUserAvatar(chat.members[1] || chat.members[0]);

                return (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                      isSelected
                        ? "bg-emerald-50 border border-emerald-200 ring-1 ring-emerald-100"
                        : "hover:bg-stone-50 border border-transparent"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={avatar}
                        alt={displayName}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full ${
                          isSelected ? "bg-emerald-50" : "bg-white"
                        }`}
                      >
                        {isDm ? (
                          <MessageCircle
                            size={12}
                            className="text-stone-400"
                          />
                        ) : (
                          <Users size={12} className="text-stone-400" />
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-stone-800 truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-stone-400 truncate">
                        {isDm ? "Direct message" : `${chat.members.length} members`}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-stone-300"
                      }`}
                    >
                      {isSelected && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="p-4 border-t border-stone-100 bg-white">
          <button
            onClick={handleSend}
            disabled={!selectedChatId}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] disabled:shadow-none active:scale-[0.98]"
          >
            <Send size={16} />
            Share to Conversation
          </button>
        </div>
      </motion.div>
    </div>
  );
}
