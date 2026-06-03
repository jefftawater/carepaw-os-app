export const dogConditionOptions = [
  {
    key: "degenerative_myelopathy",
    label: "Degenerative Myelopathy",
  },
  {
    key: "ivdd_disc_disease",
    label: "IVDD / Disc Disease",
  },
  {
    key: "spinal_injury_paralysis",
    label: "Spinal Injury / Paralysis",
  },
  {
    key: "fce_spinal_stroke",
    label: "FCE / Spinal Stroke",
  },
  {
    key: "arthritis_senior_mobility",
    label: "Arthritis / Senior Mobility",
  },
  {
    key: "post_surgery_recovery",
    label: "Post-Surgery Recovery",
  },
  {
    key: "neurologic_weakness",
    label: "Neurologic Weakness",
  },
  {
    key: "amputation_limb_difference",
    label: "Amputation / Limb Difference",
  },
  {
    key: "general_mobility_loss",
    label: "General Mobility Loss",
  },
  {
    key: "other_not_sure",
    label: "Other / Not Sure",
  },
] as const;

export type DogConditionKey = (typeof dogConditionOptions)[number]["key"];

export function normalizeDogConditionKey(condition?: string | null) {
  const matchingOption = dogConditionOptions.find(
    (option) => option.key === condition,
  );

  return matchingOption?.key ?? "other_not_sure";
}

export function getDogConditionLabel(condition?: string | null) {
  if (!condition) {
    return "Not added yet";
  }

  const matchingOption = dogConditionOptions.find(
    (option) => option.key === condition || option.label === condition,
  );

  return matchingOption?.label ?? condition;
}

export function getDogConditionSelectValue(condition?: string | null) {
  if (!condition) {
    return "other_not_sure";
  }

  const matchingOption = dogConditionOptions.find(
    (option) => option.key === condition || option.label === condition,
  );

  return matchingOption?.key ?? "other_not_sure";
}

function isDogConditionKey(condition?: string | null): condition is DogConditionKey {
  return dogConditionOptions.some((option) => option.key === condition);
}

export function getConditionAttentionNote(
  condition: string | null | undefined,
  dogName: string,
) {
  if (!isDogConditionKey(condition)) {
    return null;
  }

  const name = dogName.trim() || "your dog";
  const conditionLabel = getDogConditionLabel(condition);

  const notes: Record<DogConditionKey, string> = {
    degenerative_myelopathy: `Because ${name}'s profile includes ${conditionLabel}, pay extra attention to traction, fatigue, rear-end support, and skin checks today.`,
    ivdd_disc_disease: `Because ${name}'s profile includes ${conditionLabel}, keep movement controlled and watch closely for pain cues or overexcitement today.`,
    spinal_injury_paralysis: `Because ${name}'s profile includes ${conditionLabel}, pay extra attention to positioning, skin checks, bathroom rhythm, and supported movement today.`,
    fce_spinal_stroke: `Because ${name}'s profile includes ${conditionLabel}, watch fatigue and keep transitions slow, supported, and predictable today.`,
    arthritis_senior_mobility: `Because ${name}'s profile includes ${conditionLabel}, pay extra attention to comfort, warmth, slow transitions, and short movement today.`,
    post_surgery_recovery: `Because ${name}'s profile includes ${conditionLabel}, keep activity controlled and follow any veterinary restrictions closely today.`,
    neurologic_weakness: `Because ${name}'s profile includes ${conditionLabel}, watch balance, fatigue, traction, and supported transitions today.`,
    amputation_limb_difference: `Because ${name}'s profile includes ${conditionLabel}, pay extra attention to balance, fatigue, pressure areas, and traction today.`,
    general_mobility_loss: `Because ${name}'s profile includes ${conditionLabel}, focus on safe movement, comfort, fatigue, and routine stability today.`,
    other_not_sure: `Because ${name}'s condition is still being clarified, focus on patterns: comfort, mobility, bathroom rhythm, skin, and energy today.`,
  };

  return notes[condition];
}
