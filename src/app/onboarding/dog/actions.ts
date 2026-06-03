"use server";

import { redirect } from "next/navigation";
import { normalizeDogConditionKey } from "@/lib/dogConditions";
import { createDog } from "@/lib/dogs";

export type CreateDogProfileState = {
  error: string;
};

export async function createDogProfile(
  _previousState: CreateDogProfileState,
  formData: FormData,
): Promise<CreateDogProfileState> {
  const name = String(formData.get("name") ?? "").trim();
  const condition = normalizeDogConditionKey(
    String(formData.get("condition") ?? "").trim(),
  );
  const mobilityNotes = String(formData.get("mobilityNotes") ?? "").trim();

  if (!name) {
    return { error: "Dog name is required." };
  }

  try {
    await createDog({
      condition,
      mobilityNotes,
      name,
    });
  } catch (error) {
    console.error("CarePaw dog profile creation failed", { error });
    return { error: "Something went wrong creating this profile. Try again." };
  }

  redirect("/today");
}
