"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const steps = ["activity", "budget", "group", "scope"];

// Moves the background position to simulate a shifting circular gradient
const backgroundPositions = [
  "0% 0%", // Step 1: Top Left
  "0% 100%", // Step 2: Top Right
  "0% 0%", // Step 3: Bottom Right
  "0 100%", // Step 4: Bottom Left
];

export function PreferenceWizard({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    activity: "",
    budget: "",
    groupSize: "",
    scope: "near",
    radius: 2,
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    else onComplete();
  };

  const activityChips = [
    "Coffee Shops",
    "Study Spots",
    "Date Night",
    "Food Trip",
    "Parks",
    "Coworking Spaces",
  ];
  const budgetOptions = ["Under P200", "P200-P500", "P500-P1,000", "P1,000+"];
  const groupOptions = [
    "Solo",
    "Couple",
    "Small Group (3-6)",
    "Large Group (7+)",
  ];

  return (
    // The animated background container. Overflow-hidden fixes the scrollbar issue.
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden relative"
      animate={{ backgroundPosition: backgroundPositions[currentStep] }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(135deg, #fbfffb 0%, var(--emerald-50) 30%, var(--peach-50) 65%, #f7fcfa 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h2
                className="text-4xl md:text-5xl font-semibold text-text-primary mb-10 tracking-tight"
                style={{
                  textShadow:
                    "0 1px 4px rgba(255, 255, 255, 0.92), 0 2px 20px rgba(255, 255, 255, 0.45)",
                }}
              >
                What are you in the mood for today?
              </h2>
              <Input
                placeholder="e.g. Quiet study cafés..."
                className="text-3xl py-8 px-6 bg-white/60 border-white/80 focus:ring-brand-primary shadow-md rounded-2xl w-full max-w-2xl text-center"
                value={preferences.activity}
                onChange={(e) =>
                  setPreferences({ ...preferences, activity: e.target.value })
                }
              />
              <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-3xl">
                {activityChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() =>
                      setPreferences({ ...preferences, activity: chip })
                    }
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border shadow-sm hover:shadow-md ${
                      preferences.activity === chip
                        ? "bg-brand-primary text-white border-brand-primary scale-[1.02]"
                        : "bg-white/60 text-text-primary hover:bg-white/90 border-white/80"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h2
                className="text-4xl md:text-5xl font-semibold text-text-primary mb-10 tracking-tight"
                style={{
                  textShadow:
                    "0 1px 4px rgba(255, 255, 255, 0.92), 0 2px 20px rgba(255, 255, 255, 0.45)",
                }}
              >
                What's your budget range?
              </h2>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                {budgetOptions.map((budget) => (
                  <Button
                    key={budget}
                    variant="outline"
                    className={`h-14 text-base font-medium rounded-xl shadow-sm transition-all ${
                      preferences.budget === budget
                        ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary-hover hover:text-white scale-[1.02] shadow-md"
                        : "bg-white/60 text-text-primary border-white/80 hover:border-brand-primary hover:bg-white/90"
                    }`}
                    onClick={() => setPreferences({ ...preferences, budget })}
                  >
                    {budget}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h2
                className="text-4xl md:text-5xl font-semibold text-text-primary mb-10 tracking-tight"
                style={{
                  textShadow:
                    "0 1px 4px rgba(255, 255, 255, 0.92), 0 2px 20px rgba(255, 255, 255, 0.45)",
                }}
              >
                Who are you going with?
              </h2>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                {groupOptions.map((group) => (
                  <Button
                    key={group}
                    variant="outline"
                    className={`h-14 text-base font-medium rounded-xl shadow-sm transition-all ${
                      preferences.groupSize === group
                        ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary-hover hover:text-white scale-[1.02] shadow-md"
                        : "bg-white/60 text-text-primary border-white/80 hover:border-brand-primary hover:bg-white/90"
                    }`}
                    onClick={() =>
                      setPreferences({ ...preferences, groupSize: group })
                    }
                  >
                    {group}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h2
                className="text-4xl md:text-5xl font-semibold text-text-primary mb-10 tracking-tight"
                style={{
                  textShadow:
                    "0 1px 4px rgba(255, 255, 255, 0.92), 0 2px 20px rgba(255, 255, 255, 0.45)",
                }}
              >
                Where should we search?
              </h2>
              <div className="space-y-8 w-full max-w-xl">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className={`flex-1 h-16 text-base font-medium rounded-xl shadow-sm transition-all ${
                      preferences.scope === "near"
                        ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary-hover hover:text-white scale-[1.02] shadow-md"
                        : "bg-white/60 text-text-primary border-white/80 hover:border-brand-primary hover:bg-white/90"
                    }`}
                    onClick={() =>
                      setPreferences({ ...preferences, scope: "near" })
                    }
                  >
                    Near Me
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 h-16 text-base font-medium rounded-xl shadow-sm transition-all ${
                      preferences.scope === "anywhere"
                        ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-primary-hover hover:text-white scale-[1.02] shadow-md"
                        : "bg-white/60 text-text-primary border-white/80 hover:border-brand-primary hover:bg-white/90"
                    }`}
                    onClick={() =>
                      setPreferences({ ...preferences, scope: "anywhere" })
                    }
                  >
                    Anywhere in Pasig
                  </Button>
                </div>

                {preferences.scope === "near" && (
                  <div className="space-y-6 pt-5 bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm">
                    <label className="text-text-primary font-semibold text-base flex justify-between">
                      <span>Search Radius</span>
                      <span className="text-brand-primary">
                        {preferences.radius} km
                      </span>
                    </label>
                    <Slider
                      defaultValue={[2]}
                      max={7.5}
                      min={0.2}
                      step={0.1}
                      onValueChange={(val) =>
                        setPreferences({ ...preferences, radius: val[0] })
                      }
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center w-full max-w-xl px-2">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="text-text-secondary hover:bg-white/60 text-base py-5 px-6 rounded-lg font-medium"
          >
            Back
          </Button>

          <Button
            onClick={nextStep}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-5 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            {currentStep === steps.length - 1
              ? "Generate Recommendations"
              : "Continue"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
