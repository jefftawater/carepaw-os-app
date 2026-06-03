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
    note: "Mental stimulation helped Max settle.",
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
};

export async function logCareAction(
  _previousState: CareLogActionState,
  formData: FormData,
): Promise<CareLogActionState> {
  const dogId = String(formData.get("dogId") ?? "").trim();
  const actionKey = String(formData.get("actionKey") ?? "").trim();
  const careAction = careLogActions[actionKey];

  if (!dogId) {
    return { error: "We couldn't find this dog profile.", success: "" };
  }

  if (!careAction) {
    return { error: "Choose an action to log first.", success: "" };
  }

  try {
    await createConditionUpdate(dogId, careAction.signal, careAction.note);
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
