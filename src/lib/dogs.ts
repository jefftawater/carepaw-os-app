import { createClient } from "@/lib/supabase/server";

export type Dog = {
  condition: string | null;
  created_at: string;
  current_focus: string | null;
  id: string;
  mobility_notes: string | null;
  name: string;
  owner_id: string;
  updated_at: string;
};

type CreateDogInput = {
  condition?: string;
  mobilityNotes?: string;
  name: string;
};

type UpdateDogInput = {
  condition?: string;
  currentFocus?: string;
  id: string;
  mobilityNotes?: string;
  name?: string;
};

export async function getDogsForCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Dog[];
}

export async function getFirstDogForCurrentUser() {
  const dogs = await getDogsForCurrentUser();

  return dogs[0] ?? null;
}

export const getActiveDog = getFirstDogForCurrentUser;

export async function createDog(input: CreateDogInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a dog profile.");
  }

  const { data, error } = await supabase
    .from("dogs")
    .insert({
      condition: input.condition?.trim() || null,
      mobility_notes: input.mobilityNotes?.trim() || null,
      name: input.name.trim(),
      owner_id: user.id,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Dog;
}

export async function updateDog(input: UpdateDogInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to update a dog profile.");
  }

  const updates = {
    ...(input.condition !== undefined
      ? { condition: input.condition.trim() || null }
      : {}),
    ...(input.currentFocus !== undefined
      ? { current_focus: input.currentFocus.trim() || null }
      : {}),
    ...(input.mobilityNotes !== undefined
      ? { mobility_notes: input.mobilityNotes.trim() || null }
      : {}),
    ...(input.name !== undefined ? { name: input.name.trim() } : {}),
  };

  const { data, error } = await supabase
    .from("dogs")
    .update(updates)
    .eq("id", input.id)
    .eq("owner_id", user.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Dog;
}
