export const conditionSignals = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
  "mental_stimulation_helped",
  "more_restless",
  "bathroom_normal",
  "bathroom_changes",
] as const;

export type ConditionSignal = (typeof conditionSignals)[number];

export const manualConditionSignals = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
] as const satisfies readonly ConditionSignal[];

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
  more_restless: {
    label: "Mental Stimulation focus",
    title: "Keep activity calm, close, and predictable today.",
    bullets: [
      "Return to a simple, low-movement activity",
      "Stay nearby without adding excitement",
      "Lower stimulation if pacing or barking increases",
    ],
    reassurance: "Restlessness is useful information. Calm structure is enough today.",
  },
  mental_stimulation_helped: {
    label: "Routine Stability focus",
    title: "Use the calm activity pattern that helped today.",
    bullets: [
      "Repeat the same low-pressure activity when restlessness builds",
      "Keep the session short and predictable",
      "Let settling count as the win",
    ],
    reassurance: "A small activity that helps settle is worth keeping in the rhythm.",
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
  bathroom_changes: {
    label: "Bathroom Rhythm focus",
    title: "Make the next bathroom window easier to predict.",
    bullets: [
      "Watch after meds, meals, water, and rest",
      "Shorten the next interval if accidents increased",
      "Look for timing patterns instead of waiting for obvious signals",
    ],
    reassurance: "A steadier rhythm matters more than getting every attempt perfect.",
  },
  bathroom_normal: {
    label: "Routine Stability focus",
    title: "Keep the bathroom rhythm steady today.",
    bullets: [
      "Stay close to the timing that worked",
      "Watch for changes without overcorrecting",
      "Keep support calm and predictable",
    ],
    reassurance: "Normal timing is still useful information. Stable days count.",
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

export const conditionSignalLabels: Record<ConditionSignal, string> = {
  "About the same": "About the same",
  "A little worse": "A little worse",
  "More uncomfortable": "More uncomfortable",
  "More restless": "More restless",
  "Bathroom changes": "Bathroom changes",
  mental_stimulation_helped: "Mental stimulation helped",
  more_restless: "More restless",
  bathroom_normal: "Bathroom timing normal",
  bathroom_changes: "Bathroom changes",
};

export function getConditionSignalLabel(signal: ConditionSignal) {
  return conditionSignalLabels[signal];
}

export function getFocusForSignal(signal?: ConditionSignal): FocusContent {
  if (!signal) {
    return defaultFocus;
  }

  return focusBySignal[signal];
}
