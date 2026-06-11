"use client";

import React, { useState, useCallback } from "react";
import { Menu, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";
import "./chat.css";

// ── Types & Data ────────────────────────────────────────────────────────────
import type {
  ChatSession,
  MobileView,
  FilterTab,
  PlaceData,
  VotersModalData,
} from "@/components/chat/types";
import {
  INITIAL_CHATS,
  MY_ID,
  MY_AVATAR,
  FRIENDS,
  getDmPartner,
} from "@/components/chat/mock-data";

// ── Components ──────────────────────────────────────────────────────────────
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import NewChatModal from "@/components/chat/new-chat-modal";
import { PlaceExpandedModal } from "@/components/chat/place-card";
import {
  MembersModal,
  RenameModal,
  VotersModal,
  ImageLightbox,
  PollCreationModal,
} from "@/components/chat/chat-modals";

// ═══════════════════════════════════════════════════════════════════════════
// CHAT PAGE — Orchestrator
// ═══════════════════════════════════════════════════════════════════════════
export default function ChatPage() {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  // ── Core State ──────────────────────────────────────────────────────────
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CHATS[0].id);
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // ── Mobile Navigation ───────────────────────────────────────────────────
  const [mobileView, setMobileView] = useState<MobileView>("list");

  // ── Sidebar State ───────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");

  // ── Modal State ─────────────────────────────────────────────────────────
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedPlace, setExpandedPlace] = useState<PlaceData | null>(null);
  const [votersModal, setVotersModal] = useState<VotersModalData>(null);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const updateChat = useCallback(
    (chatId: string, updates: Partial<ChatSession>) => {
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, ...updates } : c)),
      );
    },
    [],
  );

  // ── Chat Selection ──────────────────────────────────────────────────────
  const handleSelectChat = useCallback(
    (chatId: string) => {
      setActiveChatId(chatId);
      // Clear unread count
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, unreadCount: 0 } : c,
        ),
      );
      if (isMobile) {
        setMobileView("chat");
      }
    },
    [isMobile],
  );

  const handleMobileBack = useCallback(() => {
    setMobileView("list");
  }, []);

  // ── Send Message ────────────────────────────────────────────────────────
  const handleSendMessage = useCallback(
    (text: string, imageUrl?: string) => {
      if (!text && !imageUrl) return;
      const newMessage = {
        id: Date.now().toString(),
        sender: "You",
        senderId: MY_ID,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        type: (imageUrl && !text ? "image" : "text") as "text" | "image",
        text: text || undefined,
        imageUrl: imageUrl || undefined,
      };
      updateChat(activeChatId, {
        messages: [...activeChat.messages, newMessage],
        lastActivity: "Just now",
      });

      // Simulate typing indicator after 800ms
      setTimeout(() => {
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId ? { ...c, isTyping: true } : c,
          ),
        );
        // Clear typing after 2s
        setTimeout(() => {
          setChats((prev) =>
            prev.map((c) =>
              c.id === activeChatId ? { ...c, isTyping: false } : c,
            ),
          );
        }, 2000);
      }, 800);
    },
    [activeChatId, activeChat.messages, updateChat],
  );

  // ── Create DM ───────────────────────────────────────────────────────────
  const handleCreateDm = useCallback(
    (friendId: string) => {
      // Check if DM already exists
      const existing = chats.find(
        (c) =>
          c.type === "dm" &&
          c.members.includes(friendId) &&
          c.members.includes(MY_ID),
      );
      if (existing) {
        handleSelectChat(existing.id);
        return;
      }
      // Create new DM
      const friend = FRIENDS.find((f) => f.id === friendId);
      if (!friend) return;
      const newDm: ChatSession = {
        id: `dm-${Date.now()}`,
        name: friend.name,
        type: "dm",
        members: [MY_ID, friendId],
        messages: [],
        lastActivity: "Just now",
        unreadCount: 0,
        isTyping: false,
      };
      setChats((prev) => [newDm, ...prev]);
      handleSelectChat(newDm.id);
    },
    [chats, handleSelectChat],
  );

  // ── Create Group ────────────────────────────────────────────────────────
  const handleCreateGroup = useCallback(
    (memberIds: string[], groupName: string) => {
      const newChat: ChatSession = {
        id: `chat-${Date.now()}`,
        name: groupName,
        type: "group",
        members: [MY_ID, ...memberIds],
        messages: [
          {
            id: "sys-1",
            sender: "System",
            senderId: "sys",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMe: false,
            type: "text",
            text: `You created the group "${groupName}".`,
          },
        ],
        lastActivity: "Just now",
        unreadCount: 0,
        isTyping: false,
      };
      setChats((prev) => [newChat, ...prev]);
      handleSelectChat(newChat.id);
    },
    [handleSelectChat],
  );

  // ── Poll Actions ────────────────────────────────────────────────────────
  const handleToggleVote = useCallback(
    (messageId: string, optionId: string) => {
      const updatedMessages = activeChat.messages.map((msg) => {
        if (msg.id === messageId && msg.type === "poll" && msg.poll) {
          const updatedOptions = msg.poll.options.map((opt) => {
            if (opt.id === optionId) {
              const hasVoted = opt.voters.includes(MY_ID);
              return {
                ...opt,
                voters: hasVoted
                  ? opt.voters.filter((id) => id !== MY_ID)
                  : [...opt.voters, MY_ID],
              };
            }
            return opt;
          });
          return { ...msg, poll: { ...msg.poll, options: updatedOptions } };
        }
        return msg;
      });
      updateChat(activeChatId, { messages: updatedMessages });
    },
    [activeChat.messages, activeChatId, updateChat],
  );

  const handleAddPollOption = useCallback(
    (messageId: string, optionText: string) => {
      const updatedMessages = activeChat.messages.map((msg) => {
        if (msg.id === messageId && msg.type === "poll" && msg.poll) {
          return {
            ...msg,
            poll: {
              ...msg.poll,
              options: [
                ...msg.poll.options,
                {
                  id: Math.random().toString(),
                  label: optionText,
                  voters: [],
                },
              ],
            },
          };
        }
        return msg;
      });
      updateChat(activeChatId, { messages: updatedMessages });
    },
    [activeChat.messages, activeChatId, updateChat],
  );

  const handleCreatePoll = useCallback(
    (question: string, options: string[]) => {
      const newPollMessage = {
        id: Date.now().toString(),
        sender: "You",
        senderId: MY_ID,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        type: "poll" as const,
        poll: {
          question,
          options: options.map((opt) => ({
            id: Math.random().toString(),
            label: opt,
            voters: [],
          })),
        },
      };
      updateChat(activeChatId, {
        messages: [...activeChat.messages, newPollMessage],
        lastActivity: "Just now",
      });
    },
    [activeChatId, activeChat.messages, updateChat],
  );

  // ── Group Settings ──────────────────────────────────────────────────────
  const handleRename = useCallback(
    (newName: string) => {
      updateChat(activeChatId, { name: newName });
    },
    [activeChatId, updateChat],
  );

  const handleGroupPhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        updateChat(activeChatId, { photo: URL.createObjectURL(file) });
      }
    },
    [activeChatId, updateChat],
  );

  // ── Delete Chat ─────────────────────────────────────────────────────────
  const handleDeleteChat = useCallback(() => {
    setChats((prev) => prev.filter((c) => c.id !== activeChatId));
    const remaining = chats.filter((c) => c.id !== activeChatId);
    if (remaining.length > 0) {
      setActiveChatId(remaining[0].id);
    } else {
      setActiveChatId("");
      setMobileView("list");
    }
  }, [activeChatId, chats]);

  // ── Kick Member ─────────────────────────────────────────────────────────
  const handleKickMember = useCallback(
    (memberId: string) => {
      if (!activeChat) return;
      updateChat(activeChatId, {
        members: activeChat.members.filter((id) => id !== memberId),
      });
    },
    [activeChat, activeChatId, updateChat]
  );

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════════════

  // ── Sidebar content (shared between mobile and desktop) ─────────────────
  const sidebarContent = (
    <ChatSidebar
      chats={chats}
      activeChatId={activeChatId}
      onSelectChat={handleSelectChat}
      onNewChat={() => setIsNewChatOpen(true)}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filterTab={filterTab}
      onFilterChange={setFilterTab}
    />
  );

  // ── Chat content ────────────────────────────────────────────────────────
  const chatContent = activeChat ? (
    <div className="flex-1 flex flex-col bg-stone-50 relative h-full">
      <ChatHeader
        chat={activeChat}
        isMobile={isMobile}
        onBack={handleMobileBack}
        onOpenAppSidebar={() => setOpenMobile(true)}
        onOpenMembers={() => setIsMembersOpen(true)}
        onOpenRename={() => setIsRenameOpen(true)}
        onGroupPhotoChange={handleGroupPhotoChange}
        onDeleteChat={handleDeleteChat}
      />
      <ChatMessages
        chat={activeChat}
        onExpandImage={setExpandedImage}
        onExpandPlace={setExpandedPlace}
        onToggleVote={handleToggleVote}
        onAddPollOption={handleAddPollOption}
        onShowVoters={(label, voters) => setVotersModal({ label, voters })}
      />
      <ChatInput
        onSendMessage={handleSendMessage}
        onOpenPollModal={() => setIsPollModalOpen(true)}
      />
    </div>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center bg-stone-50">
      <MessageSquare size={48} className="mb-4 text-stone-300" />
      <p className="font-medium text-stone-400">No conversation selected</p>
    </div>
  );

  return (
    <div className="flex h-full bg-stone-50 font-sans text-stone-700 overflow-hidden relative">
      {/* ═══ DESKTOP LAYOUT ═══════════════════════════════════════════════ */}
      {!isMobile && (
        <>
          {/* Sidebar */}
          <aside className="w-80 border-r border-stone-200 shrink-0 h-full overflow-hidden">
            {sidebarContent}
          </aside>
          {/* Chat */}
          <main className="flex-1 flex flex-col h-full max-h-full overflow-hidden">
            {chatContent}
          </main>
        </>
      )}

      {/* ═══ MOBILE LAYOUT ════════════════════════════════════════════════ */}
      {isMobile && (
        <>
          {/* Chat List View */}
          {mobileView === "list" && (
            <div className="chat-mobile-list w-full h-full flex flex-col chat-slide-in-left">
              {/* Mobile header with app sidebar trigger */}
              <div className="h-14 bg-white border-b border-stone-200 flex items-center px-4 shrink-0">
                <button
                  onClick={() => setOpenMobile(true)}
                  className="p-2 -ml-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors mr-3"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                  Messages
                </h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatSidebar
                  chats={chats}
                  activeChatId={activeChatId}
                  onSelectChat={handleSelectChat}
                  onNewChat={() => setIsNewChatOpen(true)}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filterTab={filterTab}
                  onFilterChange={setFilterTab}
                />
              </div>
            </div>
          )}

          {/* Conversation View */}
          {mobileView === "chat" && (
            <div className="chat-mobile-conversation w-full h-full flex flex-col chat-slide-in-right">
              {chatContent}
            </div>
          )}
        </>
      )}

      {/* ═══ MODALS ═══════════════════════════════════════════════════════ */}
      {isNewChatOpen && (
        <NewChatModal
          chats={chats}
          onClose={() => setIsNewChatOpen(false)}
          onCreateDm={handleCreateDm}
          onCreateGroup={handleCreateGroup}
        />
      )}
      {isMembersOpen && activeChat && (
        <MembersModal
          chat={activeChat}
          onClose={() => setIsMembersOpen(false)}
          onKickMember={handleKickMember}
        />
      )}
      {isRenameOpen && activeChat && (
        <RenameModal
          currentName={activeChat.name}
          onRename={handleRename}
          onClose={() => setIsRenameOpen(false)}
        />
      )}
      {isPollModalOpen && (
        <PollCreationModal
          onCreatePoll={handleCreatePoll}
          onClose={() => setIsPollModalOpen(false)}
        />
      )}
      {expandedImage && (
        <ImageLightbox
          imageUrl={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
      )}
      {expandedPlace && (
        <PlaceExpandedModal
          place={expandedPlace}
          onClose={() => setExpandedPlace(null)}
        />
      )}
      {votersModal && (
        <VotersModal
          data={votersModal}
          onClose={() => setVotersModal(null)}
        />
      )}
    </div>
  );
}
