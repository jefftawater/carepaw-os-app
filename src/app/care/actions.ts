"use server";

import { ConditionSignal } from "@/lib/careFocus";
import { createConditionUpdate } from "@/lib/conditionUpdates";

export type CareLogActionState = {
  error: string;
  success: string;
};

const careLogActions: Record<
  string,
  {
    note: string;
    success: string;
    signal: ConditionSignal;
  }
> = {
  mental_stimulation_helped: {
    note: "Mental stimulation helped them settle.",
    signal: "mental_stimulation_helped",
    success: "Logged that mental stimulation helped.",
  },
  still_restless: {
    note: "Still restless after mental stimulation.",
    signal: "more_restless",
    success: "Logged that restlessness continued.",
  },
  bathroom_normal: {
    note: "Bathroom timing felt normal today.",
    signal: "bathroom_normal",
    success: "Logged normal bathroom timing.",
  },
  bathroom_changes: {
    note: "Bathroom changes noticed today.",
    signal: "bathroom_changes",
    success: "Logged bathroom changes.",
  },
  comfort_stable: {
    note: "Comfort cues looked stable today.",
    signal: "comfort_stable",
    success: "Logged stable comfort cues.",
  },
  more_uncomfortable: {
    note: "More uncomfortable cues noticed today.",
    signal: "more_uncomfortable",
    success: "Logged more uncomfortable cues.",
  },
  skin_checked_clear: {
    note: "Skin and hygiene check looked clear today.",
    signal: "skin_checked_clear",
    success: "Logged a clear skin check.",
  },
  skin_concern: {
    note: "Skin or hygiene concern noticed today.",
    signal: "skin_concern",
    success: "Logged a skin or hygiene concern.",
  },
  mobility_supported: {
    note: "Mobility support worked well today.",
    signal: "mobility_supported",
    success: "Logged that mobility support worked.",
  },
  mobility_more_difficult: {
    note: "Mobility seemed more difficult today.",
    signal: "mobility_more_difficult",
    success: "Logged that mobility was harder.",
  },
  routine_completed: {
    note: "Routine care tasks were completed today.",
    signal: "routine_completed",
    success: "Logged completed routine care.",
  },
  routine_missed: {
    note: "A routine care task got missed today.",
    signal: "routine_missed",
    success: "Logged a missed routine task.",
  },
  home_setup_helped: {
    note: "Home setup helped make care easier today.",
    signal: "home_setup_helped",
    success: "Logged that home setup helped.",
  },
  home_setup_needs_attention: {
    note: "Home setup needs attention today.",
    signal: "home_setup_needs_attention",
    success: "Logged that home setup needs attention.",
  },
};

export async function logCareAction(
  _previousState: CareLogActionState,
  formData: FormData,
): Promise<CareLogActionState> {
  const dogId = String(formData.get("dogId") ?? "").trim();
  const actionKey = String(formData.get("actionKey") ?? "").trim();
  const customNote = String(formData.get(`${actionKey}Note`) ?? "").trim();
  const careAction = careLogActions[actionKey];

  if (!dogId) {
    return { error: "We couldn't find this dog profile.", success: "" };
  }

  if (!careAction) {
    return { error: "Choose an action to log first.", success: "" };
  }

  try {
    await createConditionUpdate(
      dogId,
      careAction.signal,
      customNote || careAction.note,
    );
  } catch (error) {
    console.error("CarePaw care detail log failed", {
      actionKey,
      dogId,
      error,
    });
    return {
      error: "Something went wrong saving this care note. Try again.",
      success: "",
    };
  }

  return { error: "", success: careAction.success };
}
