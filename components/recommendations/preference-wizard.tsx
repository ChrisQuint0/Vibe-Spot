"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import {
  Coffee,
  BookOpen,
  Sparkles,
  UtensilsCrossed,
  Trees,
  Laptop,
  Wine,
  ShoppingBasket,
  Coins,
  Banknote,
  CreditCard,
  Gem,
  User,
  Heart,
  Users,
  PartyPopper,
  MapPin,
  Building2,
  ScanLine,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Preferences {
  activity: string;
  budget: string;
  groupSize: string;
  scope: "near" | "anywhere";
  radius: number;
}

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = ["activity", "budget", "group", "scope"] as const;

const STEP_META = [
  { label: "Mood", short: "1" },
  { label: "Budget", short: "2" },
  { label: "Group", short: "3" },
  { label: "Area", short: "4" },
];

// Blob configs per step [blob1, blob2, blob3]
const BG_CONFIGS = [
  { blobs: ["#9FE1CB", "#E1F5EE", "#5DCAA5"], dot: "#e1f5ee" },
  { blobs: ["#F5C4B3", "#FAC775", "#F0997B"], dot: "#faeeda" },
  { blobs: ["#B5D4F4", "#9FE1CB", "#85B7EB"], dot: "#e6f1fb" },
  { blobs: ["#CCC0F4", "#9FE1CB", "#F5C4B3"], dot: "#eeedfe" },
];

// Activity chips
const ACTIVITY_CHIPS = [
  { label: "Coffee Shops", Icon: Coffee },
  { label: "Study Spots", Icon: BookOpen },
  { label: "Date Night", Icon: Sparkles },
  { label: "Food Trip", Icon: UtensilsCrossed },
  { label: "Parks", Icon: Trees },
  { label: "Bars & Nightlife", Icon: Wine },
];

// Budget options
const BUDGET_OPTIONS = [
  { label: "Under ₱200", Icon: Coins, desc: "Very budget-friendly" },
  { label: "₱200–₱500", Icon: Banknote, desc: "Everyday casual" },
  { label: "₱500–₱1,000", Icon: CreditCard, desc: "Mid-range quality" },
  { label: "₱1,000+", Icon: Gem, desc: "Treat yourself" },
];

// Group options
const GROUP_OPTIONS = [
  { label: "Solo", Icon: User, desc: "Just me" },
  { label: "Couple", Icon: Heart, desc: "Two of us" },
  { label: "Small Group", Icon: Users, desc: "3–6 people" },
  { label: "Large Group", Icon: PartyPopper, desc: "7 or more" },
];

//Typing hint
const TYPING_EXAMPLES = [
  "Quiet study cafés with good WiFi…",
  "Romantic dinner spot for two…",
  "Chill parks to walk around in…",
  "Late-night food spots open past 10…",
  "Cozy coffee shops to read in…",
];

// ─── Illustration component ───────────────────────────────────────────────────

function StepIllustration({
  imageSrc,
  badge1,
  badge2,
}: {
  imageSrc: string;
  badge1: { text: string; color: string; icon?: React.ReactNode };
  badge2: { text: string; color: string; icon?: React.ReactNode };
}) {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
      {/* Bare floating image — no card container */}
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-32 h-32"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-contain drop-shadow-md"
          loading="eager"
        />
      </motion.div>

      {/* Floating badges */}
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
        className="absolute -top-3 -right-6 bg-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap flex items-center gap-1"
        style={{ color: badge1.color }}
      >
        {badge1.icon}
        {badge1.text}
      </motion.span>
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute -bottom-2 -left-6 bg-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap flex items-center gap-1"
        style={{ color: badge2.color }}
      >
        {badge2.icon}
        {badge2.text}
      </motion.span>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2.5 mb-10">
      {STEP_META.map((step, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={
                i === current
                  ? { scale: 1.15, boxShadow: "0 0 0 4px rgba(22,169,113,0.2)" }
                  : { scale: 1, boxShadow: "0 0 0 0px rgba(22,169,113,0)" }
              }
              transition={{ duration: 0.35 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 ${
                i < current
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : i === current
                    ? "bg-white border-emerald-500 text-emerald-800"
                    : "bg-white/50 border-black/10 text-neutral-400"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </motion.div>
            <span className="absolute -bottom-5 text-[9px] font-semibold text-neutral-400 whitespace-nowrap">
              {step.label}
            </span>
          </div>
          {i < STEP_META.length - 1 && (
            <div className="w-9 h-0.5 rounded-full overflow-hidden bg-black/10">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Option button ────────────────────────────────────────────────────────────

function OptionButton({
  Icon,
  label,
  desc,
  selected,
  onClick,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 6px 18px rgba(22,169,113,0.18)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-3.5 rounded-xl border-[1.5px] text-left transition-colors duration-200 backdrop-blur-sm shadow-sm ${
        selected
          ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500"
          : "bg-white/65 border-black/10 hover:border-emerald-500 hover:bg-white/90"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
          selected ? "bg-emerald-500 text-white" : "bg-black/5 text-neutral-600"
        }`}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="text-sm font-semibold text-neutral-800 leading-tight">
          {label}
        </div>
        <div className="text-[11px] text-neutral-500 mt-0.5">{desc}</div>
      </div>
    </motion.button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PreferenceWizard({ onComplete }: { onComplete: () => void }) {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = TYPING_EXAMPLES[exampleIndex];

    typingRef.current = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setAnimatedPlaceholder(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            // Pause at end before deleting
            setTimeout(() => setIsDeleting(true), 1600);
          }
        } else {
          if (charIndex > 0) {
            setAnimatedPlaceholder(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setExampleIndex((i) => (i + 1) % TYPING_EXAMPLES.length);
          }
        }
      },
      isDeleting ? 30 : 55,
    );

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [charIndex, isDeleting, exampleIndex]);

  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>({
    activity: "",
    budget: "",
    groupSize: "",
    scope: "near",
    radius: 2,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const targetHeight = Math.max(54, Math.min(textarea.scrollHeight, 56));
      textarea.style.height = `${targetHeight}px`;
    }
  }, [preferences.activity, currentStep]);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((prev) => prev + 1);
    else onComplete();
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (preferences.activity.trim()) nextStep();
    }
  };

  const cfg = BG_CONFIGS[currentStep];

  const canContinue =
    currentStep === 0
      ? preferences.activity.trim() !== ""
      : currentStep === 1
        ? preferences.budget !== ""
        : currentStep === 2
          ? preferences.groupSize !== ""
          : true;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 pt-16 pb-8 md:p-6 overflow-hidden relative">
      {/* ── Animated blob background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute rounded-full blur-[60px] opacity-50"
          style={{ width: 380, height: 380, top: -80, left: -60 }}
          animate={{ background: cfg.blobs[0] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-[60px] opacity-50"
          style={{ width: 320, height: 320, bottom: -60, right: -40 }}
          animate={{ background: cfg.blobs[1] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-[60px] opacity-30"
          style={{ width: 240, height: 240, top: "40%", left: "55%" }}
          animate={{ background: cfg.blobs[2] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="w-full max-w-xl relative z-10 flex flex-col items-center text-center">
        <ProgressBar current={currentStep} />

        <AnimatePresence mode="wait">
          {/* Step 1 — Activity */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center w-full"
            >
              <StepIllustration
                imageSrc="/mood.png"
                badge1={{
                  text: "New spots",
                  color: "#085041",
                  icon: <Sparkles size={10} />,
                }}
                badge2={{
                  text: "Near you",
                  color: "#16a971",
                  icon: <MapPin size={10} />,
                }}
              />
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight leading-tight"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                }}
              >
                What are you in the mood for?
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Describe a vibe, or pick from the suggestions below
              </p>
              <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-sm border-[1.5px] border-black/10 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15 shadow-sm rounded-2xl transition-all flex pl-5 pr-3 py-3.5 mb-5">
                {/* Animated placeholder — only shown when input is empty */}
                {!preferences.activity && (
                  <span className="absolute left-5 top-3.5 text-base text-neutral-400 pointer-events-none select-none">
                    {animatedPlaceholder}
                    <span className="inline-block w-px h-4 bg-neutral-400 ml-0.5 animate-pulse align-middle" />
                  </span>
                )}
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder=""
                  onKeyDown={handleKeyDown}
                  className="text-base w-full bg-transparent outline-none resize-none overflow-y-auto text-neutral-800"
                  style={{ maxHeight: "56px" }}
                  value={preferences.activity}
                  onChange={(e) =>
                    setPreferences({ ...preferences, activity: e.target.value })
                  }
                />
              </div>
              <div className="w-full max-w-lg overflow-x-auto scrollbar-none">
                <div className="flex flex-wrap gap-2 justify-center pt-2 pb-1 w-full">
                  {ACTIVITY_CHIPS.map(({ label, Icon }) => (
                    <motion.button
                      key={label}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 4px 14px rgba(22,169,113,0.18)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() =>
                        setPreferences({ ...preferences, activity: label })
                      }
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border-[1.5px] transition-colors duration-200 backdrop-blur-sm whitespace-nowrap flex-shrink-0 ${
                        preferences.activity === label
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                          : "bg-white/65 text-neutral-800 border-black/10 hover:border-emerald-500 hover:bg-white/90"
                      }`}
                    >
                      <Icon size={13} /> {label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Budget */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center w-full"
            >
              <StepIllustration
                imageSrc="/wallet.png"
                badge1={{ text: "₱ Budget-friendly", color: "#854F0B" }}
                badge2={{ text: "Worth it ✓", color: "#533EB7" }}
              />

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                }}
              >
                What's your budget?
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                We'll filter spots that match your comfort zone
              </p>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {BUDGET_OPTIONS.map(({ label, Icon, desc }) => (
                  <OptionButton
                    key={label}
                    Icon={Icon}
                    label={label}
                    desc={desc}
                    selected={preferences.budget === label}
                    onClick={() =>
                      setPreferences({ ...preferences, budget: label })
                    }
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Group */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center w-full"
            >
              <StepIllustration
                imageSrc="/friends.png"
                badge1={{ text: "Solo vibes", color: "#0C447C" }}
                badge2={{ text: "Squad goals", color: "#16a971" }}
              />
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                }}
              >
                Who's coming along?
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                We'll suggest spots with the right size and seating
              </p>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {GROUP_OPTIONS.map(({ label, Icon, desc }) => (
                  <OptionButton
                    key={label}
                    Icon={Icon}
                    label={label}
                    desc={desc}
                    selected={preferences.groupSize === label}
                    onClick={() =>
                      setPreferences({ ...preferences, groupSize: label })
                    }
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4 — Scope */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center w-full"
            >
              <StepIllustration
                imageSrc="/location.png"
                badge1={{ text: "24 spots found", color: "#3C3489" }}
                badge2={{ text: "Loading map…", color: "#16a971" }}
              />

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                }}
              >
                Where should we look?
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Search by radius or explore the whole city
              </p>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-3">
                {(["near", "anywhere"] as const).map((val) => {
                  const isNear = val === "near";
                  const ScopeIcon = isNear ? MapPin : Building2;
                  return (
                    <motion.button
                      key={val}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 6px 18px rgba(22,169,113,0.18)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setPreferences({ ...preferences, scope: val })
                      }
                      className={`flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-[1.5px] transition-colors duration-200 backdrop-blur-sm shadow-sm ${
                        preferences.scope === val
                          ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500"
                          : "bg-white/65 border-black/10 hover:border-emerald-500 hover:bg-white/90"
                      }`}
                    >
                      <span
                        className={`transition-colors duration-200 ${
                          preferences.scope === val
                            ? "text-emerald-500"
                            : "text-neutral-400"
                        }`}
                      >
                        <ScopeIcon size={24} />
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">
                        {isNear ? "Near me" : "All of Pasig"}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {isNear ? "Within a set radius" : "Explore everywhere"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {preferences.scope === "near" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-md bg-white/60 backdrop-blur-sm border-[1.5px] border-white/90 rounded-xl p-4 shadow-sm overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
                        <ScanLine size={14} className="text-neutral-500" />
                        Search radius
                      </span>
                      <span className="text-base font-bold text-emerald-600">
                        {preferences.radius.toFixed(1)} km
                      </span>
                    </div>
                    <Slider
                      value={[preferences.radius]}
                      max={7.5}
                      min={0.2}
                      step={0.1}
                      onValueChange={(val) =>
                        setPreferences({ ...preferences, radius: val[0] })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-neutral-400 font-medium">
                      <span>0.2 km</span>
                      <span>2 km</span>
                      <span>4 km</span>
                      <span>6 km</span>
                      <span>7.5 km</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="mt-10 flex items-center gap-3 w-full max-w-md">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="text-neutral-400 hover:bg-white/60 hover:text-neutral-700 border border-black/10 px-5 py-5 rounded-xl font-medium disabled:opacity-30 transition-all"
          >
            ← Back
          </Button>

          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Button
              onClick={nextStep}
              disabled={!canContinue}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-5 rounded-xl shadow-[0_4px_18px_rgba(22,169,113,0.35)] hover:shadow-[0_8px_24px_rgba(22,169,113,0.45)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {currentStep === STEPS.length - 1
                ? "Find my spots ✦"
                : "Continue →"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
