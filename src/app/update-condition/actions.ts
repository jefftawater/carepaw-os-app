"use server";

import { redirect } from "next/navigation";
import { ConditionSignal, manualConditionSignals } from "@/lib/careFocus";
import { createConditionUpdate } from "@/lib/conditionUpdates";

export type SaveConditionUpdateState = {
  error: string;
};

export async function saveConditionUpdate(
  _previousState: SaveConditionUpdateState,
  formData: FormData,
): Promise<SaveConditionUpdateState> {
  const dogId = String(formData.get("dogId") ?? "");
  const signal = String(formData.get("signal") ?? "");
  const note = String(formData.get("note") ?? "");

  if (!dogId) {
    return { error: "We couldn't find the dog profile for this update." };
  }

  if (!(manualConditionSignals as readonly string[]).includes(signal)) {
    return { error: "Choose how your dog is doing today first." };
  }

  try {
    await createConditionUpdate(dogId, signal as ConditionSignal, note);
  } catch (error) {
    console.error("CarePaw save condition update action failed", {
      dogId,
      error,
      signal,
    });
    return { error: "Something went wrong saving this update. Try again." };
  }

  redirect("/today");
}
