"use server";

import { redirect } from "next/navigation";
import {
  normalizeAdditionalConditionKeys,
  normalizeDogConditionKey,
} from "@/lib/dogConditions";
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
  const additionalConditions = normalizeAdditionalConditionKeys(
    formData.getAll("additionalConditions"),
    condition,
  );
  const mobilityNotes = String(formData.get("mobilityNotes") ?? "").trim();

  if (!name) {
    return { error: "Dog name is required." };
  }

  try {
    await createDog({
      additionalConditions,
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
