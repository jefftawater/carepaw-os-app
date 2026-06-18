"use server";

import { revalidatePath } from "next/cache";
import { createConditionUpdate } from "@/lib/conditionUpdates";

export type AddTodayNoteState = {
  error: string;
  success: string;
};

export async function addTodayNote(
  _previousState: AddTodayNoteState,
  formData: FormData,
): Promise<AddTodayNoteState> {
  const dogId = String(formData.get("dogId") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!dogId) {
    return { error: "We couldn't find this dog profile.", success: "" };
  }

  if (!note) {
    return { error: "Add a note before saving.", success: "" };
  }

  try {
    await createConditionUpdate(dogId, "daily_note", note);
  } catch (error) {
    console.error("CarePaw add today note failed", {
      dogId,
      error,
    });
    return {
      error: "Something went wrong saving this note. Try again.",
      success: "",
    };
  }

  revalidatePath("/today");
  revalidatePath("/history");

  return { error: "", success: "Note added." };
}
