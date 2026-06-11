"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  UserPlus,
  UserMinus,
  BarChart2,
  Plus,
} from "lucide-react";
import type { ChatSession, VotersModalData } from "./types";
import { MY_ID, getUserAvatar, getUserName } from "./mock-data";

// ═══════════════════════════════════════════════════════════════════════════
// MEMBERS MODAL
// ═══════════════════════════════════════════════════════════════════════════
interface MembersModalProps {
  chat: ChatSession;
  onClose: () => void;
  onKickMember?: (memberId: string) => void;
}

export function MembersModal({ chat, onClose, onKickMember }: MembersModalProps) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h3 className="font-bold text-stone-900">
            {chat.type === "dm" ? "Profile" : `Members (${chat.members.length})`}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {chat.type === "group" && (
            <button className="w-full py-3 mb-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <UserPlus size={18} /> Add Member
            </button>
          )}
          <div className="max-h-60 overflow-y-auto minimal-scrollbar space-y-1">
            {chat.members.map((id) => (
              <div
                key={id}
                className="flex items-center gap-3 p-2.5 hover:bg-stone-50 rounded-xl transition-colors"
              >
                <img
                  src={getUserAvatar(id)}
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-200"
                  alt="avatar"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-stone-800 text-sm truncate block">
                    {getUserName(id)}
                  </span>
                  {id === MY_ID && (
                    <span className="bg-stone-200 text-stone-500 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase inline-block mt-0.5">
                      You
                    </span>
                  )}
                  {id === chat.creatorId && id !== MY_ID && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase inline-block mt-0.5">
                      Creator
                    </span>
                  )}
                </div>
                {chat.creatorId === MY_ID && id !== MY_ID && onKickMember && (
                  <button
                    onClick={() => onKickMember(id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Kick member"
                  >
                    <UserMinus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RENAME MODAL
// ═══════════════════════════════════════════════════════════════════════════
interface RenameModalProps {
  currentName: string;
  onRename: (newName: string) => void;
  onClose: () => void;
}

export function RenameModal({ currentName, onRename, onClose }: RenameModalProps) {
  const [name, setName] = useState(currentName);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-xl text-stone-900 mb-4">Rename Group</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none mb-6 transition-all"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 font-semibold text-stone-500 hover:bg-stone-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) onRename(name.trim());
              onClose();
            }}
            className="px-6 py-2.5 font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VOTERS MODAL
// ═══════════════════════════════════════════════════════════════════════════
interface VotersModalProps {
  data: NonNullable<VotersModalData>;
  onClose: () => void;
}

export function VotersModal({ data, onClose }: VotersModalProps) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-stone-50 p-4 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-bold text-stone-900 truncate pr-4">
            {data.label}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-2 max-h-60 overflow-y-auto minimal-scrollbar">
          {data.voters.map((id) => (
            <div
              key={id}
              className="flex items-center gap-3 p-2.5 hover:bg-stone-50 rounded-xl transition-colors"
            >
              <img
                src={getUserAvatar(id)}
                className="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <span className="font-medium text-stone-800 text-sm">
                {getUserName(id)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE LIGHTBOX
// ═══════════════════════════════════════════════════════════════════════════
interface ImageLightboxProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageLightbox({ imageUrl, onClose }: ImageLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 chat-modal-enter"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
      >
        <X size={24} />
      </button>
      <a
        href={imageUrl}
        download="shared-image.jpg"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-6 right-20 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors flex items-center gap-2 text-sm font-bold pr-4"
      >
        <Download size={20} /> Download
      </a>
      <img
        src={imageUrl}
        alt="Fullscreen"
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// POLL CREATION MODAL
// ═══════════════════════════════════════════════════════════════════════════
interface PollCreationModalProps {
  onCreatePoll: (question: string, options: string[]) => void;
  onClose: () => void;
}

export function PollCreationModal({
  onCreatePoll,
  onClose,
}: PollCreationModalProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleSubmit = () => {
    const validOptions = options.filter((o) => o.trim() !== "");
    if (!question.trim() || validOptions.length < 2) return;
    onCreatePoll(question.trim(), validOptions);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-stone-900 flex items-center gap-2">
            <BarChart2 className="text-emerald-500" /> Create Poll
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5 block">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What time should we meet?"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5 block">
              Options
            </label>
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[idx] = e.target.value;
                      setOptions(newOpts);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all"
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() =>
                        setOptions(options.filter((_, i) => i !== idx))
                      }
                      className="p-3 text-stone-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setOptions([...options, ""])}
              className="mt-2 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Add another option
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-sm transition-all mt-2"
          >
            Send Poll
          </button>
        </div>
      </div>
    </div>
  );
}
