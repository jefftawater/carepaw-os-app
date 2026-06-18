export const conditionSignals = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
  "about_the_same",
  "a_little_worse",
  "better_than_usual",
  "mental_stimulation_helped",
  "more_restless",
  "lower_energy",
  "appetite_changed",
  "bathroom_normal",
  "bathroom_changes",
  "bathroom_accident",
  "comfort_stable",
  "more_uncomfortable",
  "skin_checked_clear",
  "skin_concern",
  "hygiene_moisture_concern",
  "mobility_supported",
  "mobility_more_difficult",
  "needed_more_help_moving",
  "traction_trouble",
  "routine_completed",
  "routine_missed",
  "home_setup_helped",
  "home_setup_needs_attention",
  "daily_note",
] as const;

export type ConditionSignal = (typeof conditionSignals)[number];
type FocusConditionSignal = Exclude<ConditionSignal, "daily_note">;

function isFocusConditionSignal(
  signal: ConditionSignal,
): signal is FocusConditionSignal {
  return signal !== "daily_note";
}

const todayFocusPriority: Record<FocusConditionSignal, number> = {
  skin_concern: 1,
  hygiene_moisture_concern: 2,
  "More uncomfortable": 3,
  more_uncomfortable: 3,
  mobility_more_difficult: 4,
  needed_more_help_moving: 5,
  traction_trouble: 6,
  "Bathroom changes": 7,
  bathroom_changes: 7,
  bathroom_accident: 8,
  appetite_changed: 9,
  lower_energy: 10,
  "More restless": 11,
  more_restless: 11,
  routine_missed: 12,
  home_setup_needs_attention: 13,
  "A little worse": 14,
  a_little_worse: 14,
  "About the same": 15,
  about_the_same: 15,
  better_than_usual: 16,
  comfort_stable: 17,
  bathroom_normal: 18,
  skin_checked_clear: 19,
  mobility_supported: 20,
  routine_completed: 21,
  mental_stimulation_helped: 22,
  home_setup_helped: 23,
};

export function selectTodayFocusUpdate<T extends { signal: ConditionSignal }>(
  updates: readonly T[],
) {
  return updates.reduce<T | null>((selectedUpdate, update) => {
    if (!isFocusConditionSignal(update.signal)) {
      return selectedUpdate;
    }

    if (!selectedUpdate || !isFocusConditionSignal(selectedUpdate.signal)) {
      return update;
    }

    if (todayFocusPriority[update.signal] < todayFocusPriority[selectedUpdate.signal]) {
      return update;
    }

    return selectedUpdate;
  }, null);
}

export const manualConditionSignalGroups = [
  {
    label: "Overall",
    options: [
      { label: "About the same", signal: "about_the_same" },
      { label: "A little worse", signal: "a_little_worse" },
      { label: "Better than usual", signal: "better_than_usual" },
    ],
  },
  {
    label: "Comfort + behavior",
    options: [
      { label: "More uncomfortable", signal: "more_uncomfortable" },
      { label: "More restless", signal: "more_restless" },
      { label: "Lower energy / less interested", signal: "lower_energy" },
      { label: "Appetite changed", signal: "appetite_changed" },
    ],
  },
  {
    label: "Mobility",
    options: [
      { label: "Mobility more difficult", signal: "mobility_more_difficult" },
      { label: "Needed more help moving", signal: "needed_more_help_moving" },
      { label: "Slipping / traction trouble", signal: "traction_trouble" },
      { label: "Mobility support worked", signal: "mobility_supported" },
    ],
  },
  {
    label: "Bathroom",
    options: [
      { label: "Bathroom changes", signal: "bathroom_changes" },
      {
        label: "Bathroom accident / cleanup issue",
        signal: "bathroom_accident",
      },
      { label: "Bathroom timing normal", signal: "bathroom_normal" },
    ],
  },
  {
    label: "Skin + hygiene",
    options: [
      { label: "Skin or pressure concern", signal: "skin_concern" },
      { label: "Skin check looked okay", signal: "skin_checked_clear" },
      {
        label: "Hygiene or moisture concern",
        signal: "hygiene_moisture_concern",
      },
    ],
  },
  {
    label: "Routine + setup",
    options: [
      { label: "Routine completed", signal: "routine_completed" },
      { label: "Routine missed", signal: "routine_missed" },
      {
        label: "Home setup needs attention",
        signal: "home_setup_needs_attention",
      },
    ],
  },
] as const satisfies readonly {
  label: string;
  options: readonly { label: string; signal: ConditionSignal }[];
}[];

export const manualConditionSignals = manualConditionSignalGroups.flatMap(
  (group) => group.options.map((option) => option.signal),
);

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

export const focusBySignal: Record<FocusConditionSignal, FocusContent> = {
  lower_energy: {
    label: "Comfort + reduced activity focus",
    title: "Keep the day gentle and watch what still feels engaging.",
    bullets: [
      "Offer familiar food, water, and contact without pressure",
      "Reduce unnecessary movement and activity",
      "Notice whether energy improves after quiet rest",
    ],
    reassurance: "Lower energy is useful information. A quieter day can still be good care.",
  },
  appetite_changed: {
    label: "Comfort + routine focus",
    title: "Keep meals calm and notice the pattern around appetite today.",
    bullets: [
      "Offer the usual food and water without pressure",
      "Notice whether timing, comfort, or activity affects interest",
      "Keep a simple note of what was offered and accepted",
    ],
    reassurance: "Appetite changes are worth tracking. You do not have to solve the pattern all at once.",
  },
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
  bathroom_accident: {
    label: "Bathroom Rhythm focus",
    title: "Make the next bathroom window and cleanup easier to manage.",
    bullets: [
      "Shorten the next interval if possible",
      "Keep cleanup supplies close and the area dry",
      "Notice the timing around meals, water, meds, and rest",
    ],
    reassurance: "An accident is information, not failure. Resetting the next window is enough.",
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
  hygiene_moisture_concern: {
    label: "Skin + Hygiene focus",
    title: "Prioritize keeping damp or soiled areas clean and dry today.",
    bullets: [
      "Check bedding and contact areas for moisture",
      "Clean and dry gently without repeated rubbing",
      "Watch for skin changes where moisture returns",
    ],
    reassurance: "Small hygiene resets can protect comfort. One clean, dry area at a time is enough.",
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
  needed_more_help_moving: {
    label: "Mobility Support focus",
    title: "Plan for more hands-on support during movement today.",
    bullets: [
      "Prepare support before each transition",
      "Keep movement paths short and clear",
      "Pause when effort or fatigue starts to build",
    ],
    reassurance: "Needing more help is useful information. Safer, smaller movement counts.",
  },
  traction_trouble: {
    label: "Mobility Support focus",
    title: "Improve traction in the places movement feels least steady.",
    bullets: [
      "Add grip along the main movement path",
      "Clear turns and transfer areas",
      "Use slow, supported transitions near slippery spots",
    ],
    reassurance: "One safer path can make the whole day feel more manageable.",
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
  a_little_worse: {
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
  about_the_same: {
    label: "Routine Stability focus",
    title: "Stay with the rhythm that is already working.",
    bullets: [
      "Keep medication and bathroom timing predictable",
      "Watch for small changes without overcorrecting",
      "Use the same calm structure they know",
    ],
    reassurance: "Stable days count. Keeping the pattern steady is meaningful.",
  },
  better_than_usual: {
    label: "Routine Stability focus",
    title: "Keep the supportive rhythm behind today's better moments.",
    bullets: [
      "Repeat the care timing and support that worked",
      "Enjoy the better day without adding too much activity",
      "Notice what felt easier than usual",
    ],
    reassurance: "Better moments are worth remembering. Keeping the day steady helps them count.",
  },
};

export const conditionSignalLabels: Record<ConditionSignal, string> = {
  "About the same": "About the same",
  "A little worse": "A little worse",
  "More uncomfortable": "More uncomfortable",
  "More restless": "More restless",
  "Bathroom changes": "Bathroom changes",
  about_the_same: "About the same",
  a_little_worse: "A little worse",
  better_than_usual: "Better than usual",
  mental_stimulation_helped: "Mental stimulation helped",
  more_restless: "More restless",
  lower_energy: "Lower energy / less interested",
  appetite_changed: "Appetite changed",
  bathroom_normal: "Bathroom timing normal",
  bathroom_changes: "Bathroom changes",
  bathroom_accident: "Bathroom accident / cleanup issue",
  comfort_stable: "Comfort looked stable",
  more_uncomfortable: "More uncomfortable",
  skin_checked_clear: "Skin check looked okay",
  skin_concern: "Skin or pressure concern",
  hygiene_moisture_concern: "Hygiene or moisture concern",
  mobility_supported: "Mobility support worked",
  mobility_more_difficult: "Mobility more difficult",
  needed_more_help_moving: "Needed more help moving",
  traction_trouble: "Slipping / traction trouble",
  routine_completed: "Routine completed",
  routine_missed: "Routine missed",
  home_setup_helped: "Home setup helped",
  home_setup_needs_attention: "Home setup needs attention",
  daily_note: "Daily note",
};

const conditionSignalCategories: Record<ConditionSignal, string> = {
  "About the same": "Overall",
  "A little worse": "Overall",
  "More uncomfortable": "Comfort + behavior",
  "More restless": "Comfort + behavior",
  "Bathroom changes": "Bathroom",
  about_the_same: "Overall",
  a_little_worse: "Overall",
  better_than_usual: "Overall",
  mental_stimulation_helped: "Comfort + behavior",
  more_restless: "Comfort + behavior",
  lower_energy: "Comfort + behavior",
  appetite_changed: "Comfort + behavior",
  bathroom_normal: "Bathroom",
  bathroom_changes: "Bathroom",
  bathroom_accident: "Bathroom",
  comfort_stable: "Comfort + behavior",
  more_uncomfortable: "Comfort + behavior",
  skin_checked_clear: "Skin + hygiene",
  skin_concern: "Skin + hygiene",
  hygiene_moisture_concern: "Skin + hygiene",
  mobility_supported: "Mobility",
  mobility_more_difficult: "Mobility",
  needed_more_help_moving: "Mobility",
  traction_trouble: "Mobility",
  routine_completed: "Routine + setup",
  routine_missed: "Routine + setup",
  home_setup_helped: "Routine + setup",
  home_setup_needs_attention: "Routine + setup",
  daily_note: "Today's notes",
};

function cleanSignalLabel(signal: string) {
  const cleaned = signal.replaceAll("_", " ").trim();

  if (!cleaned) {
    return "Update";
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function getConditionSignalLabel(signal: string) {
  return conditionSignalLabels[signal as ConditionSignal] ?? cleanSignalLabel(signal);
}

export function getConditionSignalCategory(signal: string) {
  return conditionSignalCategories[signal as ConditionSignal] ?? "Update";
}

export function getFocusForSignal(signal?: ConditionSignal): FocusContent {
  if (!signal || !isFocusConditionSignal(signal)) {
    return defaultFocus;
  }

  return focusBySignal[signal];
}
