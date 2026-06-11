"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2, EyeOff } from "lucide-react";
import type { Message, PlaceData } from "./types";
import { PlaceMiniCard } from "./place-card";
import PollCard from "./poll-card";

// ─── Props ──────────────────────────────────────────────────────────────────
interface MessageBubbleProps {
  message: Message;
  onExpandImage: (url: string) => void;
  onExpandPlace: (place: PlaceData) => void;
  onToggleVote: (messageId: string, optionId: string) => void;
  onAddPollOption: (messageId: string, optionText: string) => void;
  onShowVoters: (label: string, voters: string[]) => void;
  onDeleteMessage?: (messageId: string, type: "me" | "everyone") => void;
  onEditMessage?: (messageId: string, newText: string) => void;
  onShowEditHistory?: (history: { text: string; time: string }[]) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function MessageBubble({
  message,
  onExpandImage,
  onExpandPlace,
  onToggleVote,
  onAddPollOption,
  onShowVoters,
  onDeleteMessage,
  onEditMessage,
  onShowEditHistory,
}: MessageBubbleProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(message.text || "");
  
  const menuRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSaveEdit = () => {
    if (editInput.trim() && editInput !== message.text) {
      onEditMessage?.(message.id, editInput.trim());
    }
    setIsEditing(false);
    setShowMenu(false);
  };

  const handleTouchStart = () => {
    touchTimer.current = setTimeout(() => {
      setShowMenu(true);
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }, 400); // 400ms long press to show menu
  };

  const handleTouchEndOrMove = () => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
      touchTimer.current = null;
    }
  };

  // System messages
  if (message.senderId === "sys") {
    return (
      <div className="w-full text-center my-4 chat-msg-enter">
        <span className="bg-stone-200/80 text-stone-500 text-[11px] px-4 py-1.5 rounded-full font-medium">
          {message.text}
        </span>
      </div>
    );
  }

  const contextMenuButton = (
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="hidden md:block opacity-0 group-hover:opacity-100 p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-all shrink-0"
    >
      <MoreVertical size={16} />
    </button>
  );

  const contextMenuDropdown = showMenu && (
    <div className={`absolute bottom-full mb-1 z-20 w-48 bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden py-1 ${message.isMe ? "right-0" : "left-0"}`}>
      {message.isMe && message.type === "text" && (message.editCount || 0) < 5 && !message.isDeletedForEveryone && (
        <button
          onClick={() => { setIsEditing(true); setShowMenu(false); }}
          className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
        >
          <Edit2 size={14} /> Edit Message
        </button>
      )}
      {message.isMe && !message.isDeletedForEveryone && (
        <button
          onClick={() => { onDeleteMessage?.(message.id, "everyone"); setShowMenu(false); }}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <Trash2 size={14} /> Delete for Everyone
        </button>
      )}
      <button
        onClick={() => { onDeleteMessage?.(message.id, "me"); setShowMenu(false); }}
        className="w-full px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50 flex items-center gap-2"
      >
        <EyeOff size={14} /> Delete for Me
      </button>
    </div>
  );

  return (
    <div
      className={`group flex w-full gap-2.5 max-w-2xl chat-msg-enter ${
        message.isMe ? "ml-auto justify-end" : ""
      }`}
    >
      {/* Avatar (other users only) */}
      {!message.isMe && (
        <div className={`w-8 h-8 rounded-full flex-shrink-0 mt-auto border-2 flex items-center justify-center overflow-hidden ${
          message.senderId === "vibe" ? "bg-emerald-500 border-emerald-500 p-0.5" : "border-stone-200"
        }`}>
          <img
            src={message.avatar}
            alt={message.sender}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={`flex flex-col ${
          message.isMe ? "items-end" : "items-start"
        } max-w-[80%] md:max-w-[75%]`}
      >
        {/* Sender name + time */}
        <p className="text-[11px] text-stone-400 mb-1 mx-1 font-medium flex items-center gap-1.5">
          <span>{message.sender}</span>
          <span className="text-stone-300">•</span>
          <span>{message.time}</span>
          {message.isEdited && !message.isDeletedForEveryone && (
            <>
              <span className="text-stone-300">•</span>
              <button 
                onClick={() => message.editHistory && onShowEditHistory?.(message.editHistory)}
                className="text-[10px] text-emerald-600/80 hover:text-emerald-600 underline-offset-2 hover:underline cursor-pointer"
              >
                Edited
              </button>
            </>
          )}
        </p>

        <div 
          ref={menuRef}
          className={`relative flex items-center gap-2 ${message.isMe ? "flex-row-reverse" : "flex-row"}`}
        >
          <div 
            className={`flex flex-col ${message.isMe ? "items-end" : "items-start"}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEndOrMove}
            onTouchMove={handleTouchEndOrMove}
            onContextMenu={(e) => {
              // Prevent default right click menu on mobile if long pressed
              if (window.innerWidth < 768) e.preventDefault();
            }}
          >
            {message.isDeletedForEveryone ? (
              <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm italic ${message.isMe ? "bg-stone-100 text-stone-500 rounded-br-sm" : "bg-stone-50 border border-stone-200 text-stone-400 rounded-bl-sm"}`}>
                This message was deleted.
              </div>
            ) : (
              <>
                {/* ── Text Bubble ────────────────────────────────────────── */}
                {message.type === "text" && (
                  isEditing ? (
                    <div className={`flex flex-col items-end gap-1 px-3 py-2 rounded-2xl shadow-sm bg-white border ${message.isMe ? "border-emerald-200" : "border-stone-200"}`}>
                      <textarea
                        autoFocus
                        className="bg-transparent outline-none text-sm text-stone-700 min-w-[220px] min-h-[60px] resize-none"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSaveEdit();
                          }
                          if (e.key === "Escape") setIsEditing(false);
                        }}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold text-stone-400 hover:text-stone-600">Cancel</button>
                        <button onClick={handleSaveEdit} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">Save</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2.5 rounded-2xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed ${
                        message.isMe
                          ? "bg-emerald-500 text-white rounded-br-sm"
                          : "bg-white border border-stone-200 text-stone-700 rounded-bl-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  )
                )}

                {/* ── Image Bubble ───────────────────────────────────────── */}
                {message.type === "image" && message.imageUrl && (
                  <div className={`flex flex-col gap-1 ${message.isMe ? "items-end" : "items-start"}`}>
                    <div
                      className={`${
                        message.isMe
                          ? ""
                          : "p-1 bg-white border border-stone-200 rounded-2xl rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <img
                        src={message.imageUrl}
                        alt="Attached"
                        onClick={() => onExpandImage(message.imageUrl!)}
                        className={`max-w-[220px] md:max-w-[300px] max-h-[280px] object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                          message.isMe ? "rounded-2xl rounded-br-sm shadow-sm" : "rounded-xl"
                        }`}
                      />
                    </div>
                    {message.text && (
                      <div
                        className={`px-4 py-2.5 rounded-2xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed ${
                          message.isMe
                            ? "bg-emerald-500 text-white rounded-br-sm"
                            : "bg-white border border-stone-200 text-stone-700 rounded-bl-sm"
                        }`}
                      >
                        {message.text}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Place Card ─────────────────────────────────────────── */}
                {message.type === "place" && message.place && (
                  <PlaceMiniCard message={message} onExpand={onExpandPlace} />
                )}

                {/* ── AI Bubble ──────────────────────────────────────────── */}
                {message.type === "ai" && (
                  <div className="flex flex-col gap-2 items-start">
                    {message.text && (
                      <div className="px-4 py-2.5 rounded-2xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed bg-white border border-stone-200 text-stone-700 rounded-bl-sm">
                        {message.text}
                      </div>
                    )}
                    {message.place && (
                      <PlaceMiniCard message={message} onExpand={onExpandPlace} />
                    )}
                  </div>
                )}

                {/* ── Poll Card ──────────────────────────────────────────── */}
                {message.type === "poll" && message.poll && (
                  <PollCard
                    message={message}
                    onToggleVote={onToggleVote}
                    onAddOption={onAddPollOption}
                    onShowVoters={onShowVoters}
                  />
                )}
              </>
            )}
          </div>
          {contextMenuButton}
          {contextMenuDropdown}
        </div>
      </div>
    </div>
  );
}
