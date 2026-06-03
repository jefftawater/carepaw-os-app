"use server";

import { redirect } from "next/navigation";
import { createDog } from "@/lib/dogs";

export async function createDogProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const condition = String(formData.get("condition") ?? "").trim();
  const mobilityNotes = String(formData.get("mobilityNotes") ?? "").trim();

  if (!name) {
    throw new Error("Dog name is required.");
  }

  await createDog({
    condition,
    mobilityNotes,
    name,
  });

  redirect("/today");
}
