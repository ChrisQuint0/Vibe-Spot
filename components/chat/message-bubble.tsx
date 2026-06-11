"use client";

import React from "react";
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
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function MessageBubble({
  message,
  onExpandImage,
  onExpandPlace,
  onToggleVote,
  onAddPollOption,
  onShowVoters,
}: MessageBubbleProps) {
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

  return (
    <div
      className={`flex w-full gap-2.5 max-w-2xl chat-msg-enter ${
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
        <p className="text-[11px] text-stone-400 mb-1 mx-1 font-medium">
          {message.sender}
          <span className="mx-1.5 text-stone-300">•</span>
          {message.time}
        </p>

        {/* ── Text Bubble ────────────────────────────────────────── */}
        {message.type === "text" && (
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
      </div>
    </div>
  );
}
