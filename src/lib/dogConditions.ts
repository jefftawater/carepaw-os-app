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
