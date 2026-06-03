export const conditionSignals = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
] as const;

export type ConditionSignal = (typeof conditionSignals)[number];

export type FocusContent = {
  bullets: string[];
  label: string;
  reassurance: string;
  title: string;
};

export const defaultFocus: FocusContent = {
  label: "What matters today",
  title: "Anchor your day around the next medication + bathroom cycle.",
  bullets: [
    "After meds, plan for the next potty window",
    "Watch comfort and movement changes",
    "If today feels like a lot, just focus on the first one",
  ],
  reassurance: "You don't have to manage everything - staying in rhythm is enough.",
};

export const focusBySignal: Record<ConditionSignal, FocusContent> = {
  "More restless": {
    label: "Mental Stimulation focus",
    title: "Keep activity calm, close, and predictable today.",
    bullets: [
      "Try a short food scatter or slow treat search",
      "Stay near Max without turning restlessness into play",
      "Lower stimulation if barking or pacing increases",
    ],
    reassurance: "Restless energy is information. Calm structure is enough today.",
  },
  "Bathroom changes": {
    label: "Bathroom Rhythm focus",
    title: "Make the next bathroom window easier to predict.",
    bullets: [
      "Watch after meds, meals, water, and rest",
      "Shorten the next interval if accidents increased",
      "Look for timing patterns instead of waiting for obvious signals",
    ],
    reassurance: "A steadier rhythm matters more than getting every attempt perfect.",
  },
  "More uncomfortable": {
    label: "Comfort + Pain Cues focus",
    title: "Prioritize comfort cues and easier movement today.",
    bullets: [
      "Watch changes in posture, movement, and settling",
      "Keep transitions slow and supported",
      "Choose calm contact over extra activity",
    ],
    reassurance: "Comfort is a valid care goal. A quieter day can still be a good day.",
  },
  "A little worse": {
    label: "Comfort + reduced activity focus",
    title: "Keep the day smaller and easier to move through.",
    bullets: [
      "Reduce unnecessary movement and long transitions",
      "Keep bathroom and medication timing steady",
      "Notice whether rest helps Max return toward baseline",
    ],
    reassurance: "Scaling back is care, not failure.",
  },
  "About the same": {
    label: "Routine Stability focus",
    title: "Stay with the rhythm that is already working.",
    bullets: [
      "Keep medication and bathroom timing predictable",
      "Watch for small changes without overcorrecting",
      "Use the same calm structure Max knows",
    ],
    reassurance: "Stable days count. Keeping the pattern steady is meaningful.",
  },
};

export function getFocusForSignal(signal?: ConditionSignal): FocusContent {
  if (!signal) {
    return defaultFocus;
  }

  return focusBySignal[signal];
}
