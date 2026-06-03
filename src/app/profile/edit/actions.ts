"use server";

import { redirect } from "next/navigation";
import { normalizeDogConditionKey } from "@/lib/dogConditions";
import { updateDog } from "@/lib/dogs";

export type EditDogProfileState = {
  error: string;
};

export async function saveDogProfile(
  _previousState: EditDogProfileState,
  formData: FormData,
): Promise<EditDogProfileState> {
  const dogId = String(formData.get("dogId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const condition = normalizeDogConditionKey(
    String(formData.get("condition") ?? "").trim(),
  );
  const mobilityNotes = String(formData.get("mobilityNotes") ?? "").trim();

  if (!dogId) {
    return { error: "We couldn't find this dog profile." };
  }

  if (!name) {
    return { error: "Dog name is required." };
  }

  try {
    await updateDog({
      condition,
      id: dogId,
      mobilityNotes,
      name,
    });
  } catch (error) {
    console.error("CarePaw dog profile update failed", {
      dogId,
      error,
    });
    return { error: "Something went wrong saving this profile. Try again." };
  }

  redirect("/profile");
}
