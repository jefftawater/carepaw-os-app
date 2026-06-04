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
  "comfort_stable",
  "more_uncomfortable",
  "skin_checked_clear",
  "skin_concern",
  "mobility_supported",
  "mobility_more_difficult",
  "routine_completed",
  "routine_missed",
  "home_setup_helped",
  "home_setup_needs_attention",
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
      "Stay nearby without turning restlessness into play",
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
  more_uncomfortable: {
    label: "Comfort + Pain Cues focus",
    title: "Prioritize comfort cues and easier movement today.",
    bullets: [
      "Watch repeated hesitation, guarding, or discomfort cues",
      "Keep transitions slow and supported",
      "Make notes about patterns that repeat",
    ],
    reassurance: "Comfort changes are worth noticing early. A smaller day can be good care.",
  },
  comfort_stable: {
    label: "Routine Stability focus",
    title: "Keep comfort steady with the rhythm that is working.",
    bullets: [
      "Keep transitions slow and predictable",
      "Maintain bedding and positioning that helped",
      "Watch comfort cues without adding extra activity",
    ],
    reassurance: "Stable comfort cues are useful information. Maintenance is care too.",
  },
  skin_checked_clear: {
    label: "Routine Stability focus",
    title: "Keep the skin and hygiene rhythm simple today.",
    bullets: [
      "Keep bedding dry and smooth",
      "Repeat the quick pressure-point check",
      "Watch for changes without overchecking",
    ],
    reassurance: "A clear check is worth logging. Small prevention work adds up.",
  },
  skin_concern: {
    label: "Skin + Hygiene focus",
    title: "Keep skin checks gentle, clean, and consistent today.",
    bullets: [
      "Check pressure points and damp areas",
      "Keep bedding dry and smooth",
      "Track any spot that changes or repeats",
    ],
    reassurance: "Small skin changes are easier to support when they are noticed early.",
  },
  mobility_supported: {
    label: "Mobility Support maintenance",
    title: "Repeat the support pattern that helped movement feel safer.",
    bullets: [
      "Use slow, supported transitions",
      "Keep paths clear and predictable",
      "Stop before fatigue starts to build",
    ],
    reassurance: "Good support is not about doing more. It is about making movement safer.",
  },
  mobility_more_difficult: {
    label: "Mobility Support focus",
    title: "Make movement smaller, slower, and more supported today.",
    bullets: [
      "Add traction where slipping happens",
      "Pause between movement attempts",
      "Reduce extra transitions where possible",
    ],
    reassurance: "Harder movement days are information. Adjusting support is good care.",
  },
  routine_completed: {
    label: "Routine Stability focus",
    title: "Keep the care rhythm simple and repeatable today.",
    bullets: [
      "Stay close to the care timing that worked",
      "Review supplies before they feel urgent",
      "Let one completed routine be enough for now",
    ],
    reassurance: "Completed routine care helps the day stay less reactive.",
  },
  routine_missed: {
    label: "Routine Reminders focus",
    title: "Reset the next small care task without trying to catch up all at once.",
    bullets: [
      "Choose the next medication or care timing",
      "Notice one small task that is easy to miss",
      "Keep the routine simple today",
    ],
    reassurance: "A missed task does not ruin the day. Resetting gently is enough.",
  },
  home_setup_helped: {
    label: "Routine Stability focus",
    title: "Keep the home setup pattern that made care easier today.",
    bullets: [
      "Keep traction and transfer areas predictable",
      "Leave supplies near the care area",
      "Repeat the setup choices that reduced stress",
    ],
    reassurance: "A home setup that helps is worth keeping simple and consistent.",
  },
  home_setup_needs_attention: {
    label: "Home Setup focus",
    title: "Make one home setup improvement that reduces slips or stress today.",
    bullets: [
      "Check traction in the main movement path",
      "Move care supplies closer to where transfers happen",
      "Look for bedding, moisture, or pressure areas that need attention",
    ],
    reassurance: "You do not need to fix the whole house today. One useful setup change counts.",
  },
  "A little worse": {
    label: "Comfort + reduced activity focus",
    title: "Keep the day smaller and easier to move through.",
    bullets: [
      "Reduce unnecessary movement and long transitions",
      "Keep bathroom and medication timing steady",
      "Notice whether rest helps them return toward baseline",
    ],
    reassurance: "Scaling back is care, not failure.",
  },
  "About the same": {
    label: "Routine Stability focus",
    title: "Stay with the rhythm that is already working.",
    bullets: [
      "Keep medication and bathroom timing predictable",
      "Watch for small changes without overcorrecting",
      "Use the same calm structure they know",
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
  comfort_stable: "Comfort looked stable",
  more_uncomfortable: "More uncomfortable",
  skin_checked_clear: "Skin check clear",
  skin_concern: "Skin concern",
  mobility_supported: "Mobility support worked",
  mobility_more_difficult: "Mobility more difficult",
  routine_completed: "Routine completed",
  routine_missed: "Routine missed",
  home_setup_helped: "Home setup helped",
  home_setup_needs_attention: "Home setup needs attention",
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
