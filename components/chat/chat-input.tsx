"use client";

import React, { useRef, useState } from "react";
import {
  Send,
  Smile,
  Image as ImageIcon,
  BarChart2,
  X,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

// ─── Props ──────────────────────────────────────────────────────────────────
interface ChatInputProps {
  onSendMessage: (text: string, imageUrl?: string) => void;
  onOpenPollModal: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChatInput({
  onSendMessage,
  onOpenPollModal,
}: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedImagePreview, setAttachedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Close emoji picker on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const handleSend = () => {
    if (!inputText.trim() && !attachedImagePreview) return;
    onSendMessage(inputText.trim(), attachedImagePreview || undefined);
    setInputText("");
    setAttachedImagePreview(null);
    setShowEmojiPicker(false);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedImagePreview(URL.createObjectURL(file));
    // Reset so the same file can be selected again
    e.target.value = "";
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  const canSend = inputText.trim() || attachedImagePreview;

  return (
    <div className="chat-input-area p-3 md:p-4 bg-white border-t border-stone-200 shrink-0 z-20">
      {/* Attached image preview */}
      {attachedImagePreview && (
        <div className="mb-2 flex items-start gap-2 chat-msg-enter">
          <div className="relative">
            <img
              src={attachedImagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-stone-200"
            />
            <button
              onClick={() => setAttachedImagePreview(null)}
              className="absolute -top-1.5 -right-1.5 bg-stone-800 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2 bg-stone-50 border border-stone-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-emerald-400/20 focus-within:border-emerald-400 transition-all relative">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Left action buttons */}
        <div className="flex gap-0.5 pb-1 px-0.5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            title="Attach image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={onOpenPollModal}
            className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            title="Create poll"
          >
            <BarChart2 size={18} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleTextareaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2.5 px-2 text-sm text-stone-700 placeholder:text-stone-400 minimal-scrollbar outline-none leading-relaxed"
          placeholder="Type a message..."
          rows={1}
        />

        {/* Emoji picker */}
        {showEmojiPicker && (
          <div
            ref={emojiRef}
            className="absolute bottom-16 right-0 md:right-14 z-50 chat-dropdown-enter shadow-2xl rounded-2xl overflow-hidden border border-stone-200"
          >
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setInputText((prev) => prev + emojiData.emoji);
              }}
              autoFocusSearch={false}
              skinTonesDisabled
              searchDisabled
              width={280}
              height={320}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}

        {/* Right action buttons */}
        <div className="flex gap-0.5 pb-1 px-0.5 items-center">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-2 rounded-xl transition-colors ${
              showEmojiPicker
                ? "text-amber-500 bg-amber-50"
                : "text-stone-400 hover:text-amber-500 hover:bg-amber-50"
            }`}
            title="Emoji"
          >
            <Smile size={18} />
          </button>
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="w-9 h-9 flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100"
            title="Send"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
