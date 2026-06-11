"use client";

import React, { useState } from "react";
import { X, Search, Check, MessageSquare, Users } from "lucide-react";
import type { ChatSession, Friend } from "./types";
import { FRIENDS, MY_ID } from "./mock-data";

// ─── Props ──────────────────────────────────────────────────────────────────
interface NewChatModalProps {
  chats: ChatSession[];
  onClose: () => void;
  onCreateDm: (friendId: string) => void;
  onCreateGroup: (memberIds: string[], groupName: string) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function NewChatModal({
  chats,
  onClose,
  onCreateDm,
  onCreateGroup,
}: NewChatModalProps) {
  const [mode, setMode] = useState<"dm" | "group">("dm");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupStep, setGroupStep] = useState<"members" | "details">("members");
  const [groupName, setGroupName] = useState("");

  const filteredFriends = FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedMembers.length === 0) return;
    onCreateGroup(selectedMembers, groupName.trim());
    onClose();
  };

  const handleSelectDm = (friendId: string) => {
    // Check if DM already exists
    const existingDm = chats.find(
      (c) =>
        c.type === "dm" &&
        c.members.includes(friendId) &&
        c.members.includes(MY_ID),
    );
    onCreateDm(friendId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "min(600px, 90vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-stone-900">
              New Conversation
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-stone-100 rounded-xl p-1 gap-0.5 mb-4">
            <button
              onClick={() => {
                setMode("dm");
                setSelectedMembers([]);
                setGroupStep("members");
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mode === "dm"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <MessageSquare size={15} /> New Message
            </button>
            <button
              onClick={() => {
                setMode("group");
                setGroupStep("members");
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mode === "group"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <Users size={15} /> New Group
            </button>
          </div>

          {/* Search (always visible in member selection) */}
          {(mode === "dm" || groupStep === "members") && (
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={16}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all placeholder:text-stone-400"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto minimal-scrollbar px-5 pb-5">
          {/* ── DM Mode: Select one friend ─────────────────────────── */}
          {mode === "dm" && (
            <div className="space-y-1">
              {filteredFriends.length === 0 ? (
                <p className="text-center text-sm text-stone-400 py-8">
                  No friends found
                </p>
              ) : (
                filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => handleSelectDm(friend.id)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200 group"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200"
                      />
                      {friend.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-stone-800 text-sm">
                        {friend.name}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {friend.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                    <div className="text-stone-300 group-hover:text-emerald-500 transition-colors">
                      <MessageSquare size={18} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Group Mode: Member Selection ───────────────────────── */}
          {mode === "group" && groupStep === "members" && (
            <>
              {/* Selected member chips */}
              {selectedMembers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-stone-100">
                  {selectedMembers.map((id) => {
                    const friend = FRIENDS.find((f) => f.id === id);
                    if (!friend) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full pl-1 pr-2 py-1 text-xs font-medium text-emerald-800"
                      >
                        <img
                          src={friend.avatar}
                          className="w-5 h-5 rounded-full object-cover"
                          alt={friend.name}
                        />
                        {friend.name.split(" ")[0]}
                        <button
                          onClick={() => toggleMember(id)}
                          className="ml-0.5 text-emerald-500 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-1">
                {filteredFriends.length === 0 ? (
                  <p className="text-center text-sm text-stone-400 py-8">
                    No friends found
                  </p>
                ) : (
                  filteredFriends.map((friend) => {
                    const isSelected = selectedMembers.includes(friend.id);
                    return (
                      <div
                        key={friend.id}
                        onClick={() => toggleMember(friend.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-50/50"
                            : "border-transparent hover:bg-stone-50"
                        }`}
                      >
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="flex-1 font-medium text-stone-800 text-sm">
                          {friend.name}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-stone-300"
                          }`}
                        >
                          {isSelected && <Check size={13} />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* ── Group Mode: Details ─────────────────────────────────── */}
          {mode === "group" && groupStep === "details" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Weekend Food Trip 🍕"
                  autoFocus
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-sm font-medium focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">
                  Members ({selectedMembers.length + 1})
                </label>
                <div className="flex -space-x-2 pl-1">
                  {selectedMembers.map((id) => {
                    const f = FRIENDS.find((f) => f.id === id);
                    return f ? (
                      <img
                        key={f.id}
                        src={f.avatar}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                        alt={f.name}
                      />
                    ) : null;
                  })}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 shadow-sm z-10">
                    You
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === "group" && (
          <div className="shrink-0 p-5 pt-3 border-t border-stone-100">
            {groupStep === "members" ? (
              <button
                disabled={selectedMembers.length === 0}
                onClick={() => setGroupStep("details")}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold py-3 rounded-xl shadow-sm transition-all"
              >
                Next ({selectedMembers.length} selected)
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setGroupStep("members")}
                  className="px-4 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!groupName.trim()}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold py-3 rounded-xl shadow-sm transition-all"
                >
                  Create Group
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
