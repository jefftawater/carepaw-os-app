import { ConditionSignal } from "@/lib/careFocus";
import { createClient } from "@/lib/supabase/server";

export type ConditionUpdate = {
  created_at: string;
  dog_id: string;
  id: string;
  note: string;
  owner_id: string;
  signal: ConditionSignal;
};

export async function createConditionUpdate(
  dogId: string,
  signal: ConditionSignal,
  note: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to save a condition update.");
  }

  const { data: dog, error: dogError } = await supabase
    .from("dogs")
    .select("id, owner_id")
    .eq("id", dogId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (dogError) {
    console.error("CarePaw condition update dog lookup failed", {
      dogId,
      error: dogError,
      ownerId: user.id,
    });
    throw new Error("We couldn't confirm this dog profile before saving.");
  }

  if (!dog) {
    console.error("CarePaw condition update dog ownership mismatch", {
      dogId,
      ownerId: user.id,
    });
    throw new Error("We couldn't confirm this dog profile before saving.");
  }

  const insertPayload = {
    dog_id: dogId,
    note: note.trim(),
    owner_id: user.id,
    signal,
  };

  console.info("CarePaw condition update insert", {
    dogId: insertPayload.dog_id,
    hasNote: insertPayload.note.length > 0,
    ownerId: insertPayload.owner_id,
    signal: insertPayload.signal,
  });

  const { data, error } = await supabase
    .from("condition_updates")
    .insert(insertPayload)
    .select("*")
    .single();

  if (error) {
    console.error("CarePaw condition update insert failed", {
      dogId: insertPayload.dog_id,
      error,
      ownerId: insertPayload.owner_id,
      signal: insertPayload.signal,
    });
    throw error;
  }

  console.info("CarePaw condition update insert succeeded", {
    dogId: data.dog_id,
    id: data.id,
    ownerId: data.owner_id,
    signal: data.signal,
  });

  return data as ConditionUpdate;
}

export async function getLatestConditionUpdate(dogId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("condition_updates")
    .select("*")
    .eq("dog_id", dogId)
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as ConditionUpdate | null;
}

export async function getConditionUpdates(dogId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("condition_updates")
    .select("*")
    .eq("dog_id", dogId)
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as ConditionUpdate[];
}
