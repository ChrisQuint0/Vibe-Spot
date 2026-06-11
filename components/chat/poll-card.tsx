"use client";

import React, { useState } from "react";
import {
  BarChart2,
  Check,
  Plus,
  X,
} from "lucide-react";
import type { Message, PollOption } from "./types";
import { MY_ID, getUserAvatar, getUserName } from "./mock-data";

// ─── Props ──────────────────────────────────────────────────────────────────
interface PollCardProps {
  message: Message;
  onToggleVote: (messageId: string, optionId: string) => void;
  onAddOption: (messageId: string, optionText: string) => void;
  onShowVoters: (label: string, voters: string[]) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function PollCard({
  message,
  onToggleVote,
  onAddOption,
  onShowVoters,
}: PollCardProps) {
  const [addingOption, setAddingOption] = useState(false);
  const [newOptionText, setNewOptionText] = useState("");

  if (!message.poll) return null;

  const { question, options } = message.poll;
  const totalVotes = options.reduce((acc, curr) => acc + curr.voters.length, 0) || 1;

  const handleSubmitOption = () => {
    if (!newOptionText.trim()) return;
    onAddOption(message.id, newOptionText.trim());
    setNewOptionText("");
    setAddingOption(false);
  };

  return (
    <div
      className={`bg-white border border-stone-200 p-4 rounded-2xl shadow-sm w-72 md:w-80 ${
        message.isMe ? "rounded-br-sm" : "rounded-bl-sm"
      }`}
    >
      {/* Question */}
      <h4 className="font-bold text-stone-800 mb-4 flex items-start gap-2 text-base leading-tight">
        <BarChart2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
        {question}
      </h4>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const percent = Math.round((opt.voters.length / totalVotes) * 100);
          const hasVoted = opt.voters.includes(MY_ID);
          const displayVoters = opt.voters.slice(0, 2);
          const extraVoters = opt.voters.length - 2;

          return (
            <div
              key={opt.id}
              className="relative group cursor-pointer"
              onClick={() => onToggleVote(message.id, opt.id)}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 rounded-xl transition-all ${
                  hasVoted
                    ? "bg-emerald-50 border border-emerald-300"
                    : "bg-stone-50 border border-transparent hover:bg-stone-100"
                }`}
              />
              {/* Progress bar */}
              <div
                className="absolute inset-y-0 left-0 bg-emerald-200/40 rounded-xl transition-all duration-500"
                style={{
                  width: `${opt.voters.length > 0 ? percent : 0}%`,
                }}
              />
              {/* Content */}
              <div className="relative p-2.5 flex justify-between items-center z-10">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      hasVoted
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-stone-300 bg-white"
                    }`}
                  >
                    {hasVoted && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span
                    className={`text-sm truncate ${
                      hasVoted
                        ? "font-bold text-emerald-900"
                        : "font-medium text-stone-700"
                    }`}
                  >
                    {opt.label}
                  </span>
                </div>
                {opt.voters.length > 0 && (
                  <div
                    className="flex items-center -space-x-1.5 shrink-0 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowVoters(opt.label, opt.voters);
                    }}
                  >
                    {displayVoters.map((voterId, i) => (
                      <img
                        key={i}
                        src={getUserAvatar(voterId)}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                        alt="Voter"
                      />
                    ))}
                    {extraVoters > 0 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-[9px] font-bold text-stone-600">
                        +{extraVoters}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add option */}
      {addingOption ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            autoFocus
            value={newOptionText}
            onChange={(e) => setNewOptionText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmitOption();
              if (e.key === "Escape") setAddingOption(false);
            }}
            placeholder="Type option..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleSubmitOption}
            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Check size={14} />
          </button>
          <button
            onClick={() => setAddingOption(false)}
            className="p-2 bg-stone-100 text-stone-500 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingOption(true)}
          className="mt-3 w-full py-2 bg-stone-50 hover:bg-stone-100 text-emerald-600 border border-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
        >
          <Plus size={14} /> Add Option
        </button>
      )}
    </div>
  );
}
