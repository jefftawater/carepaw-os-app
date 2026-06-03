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

const dogConditionKeys = dogConditionOptions.map((option) => option.key);

export function normalizeDogConditionKey(condition?: string | null) {
  const matchingOption = dogConditionOptions.find(
    (option) => option.key === condition,
  );

  return matchingOption?.key ?? "other_not_sure";
}

export function normalizeAdditionalConditionKeys(
  conditions: FormDataEntryValue[] | readonly string[] = [],
  primaryCondition?: string | null,
) {
  const primaryKey = normalizeDogConditionKey(primaryCondition);
  const normalizedKeys = conditions
    .map((condition) => String(condition))
    .filter(isDogConditionKey)
    .filter(
      (condition) =>
        condition !== primaryKey && condition !== "other_not_sure",
    );

  return Array.from(new Set(normalizedKeys));
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
  return dogConditionKeys.includes(condition as DogConditionKey);
}

export function getDogConditionLabels(conditions: readonly string[] = []) {
  return conditions.map((condition) => getDogConditionLabel(condition));
}

const conditionEmphasis: Record<
  DogConditionKey,
  {
    points: string[];
  }
> = {
  degenerative_myelopathy: {
    points: ["traction", "fatigue", "rear-end support", "skin checks"],
  },
  ivdd_disc_disease: {
    points: ["pain cues", "controlled movement", "calm handling", "avoiding overexcitement"],
  },
  spinal_injury_paralysis: {
    points: ["safe positioning", "skin checks", "bathroom rhythm", "supported movement"],
  },
  fce_spinal_stroke: {
    points: ["fatigue", "safe transitions", "steady routine", "gradual movement support"],
  },
  arthritis_senior_mobility: {
    points: ["comfort", "warmth", "slow transitions", "short movement"],
  },
  post_surgery_recovery: {
    points: ["vet restrictions", "controlled activity", "avoiding overdoing it", "changes from baseline"],
  },
  neurologic_weakness: {
    points: ["balance", "fatigue", "traction", "supported transitions"],
  },
  amputation_limb_difference: {
    points: ["balance", "pressure areas", "fatigue", "surface traction"],
  },
  general_mobility_loss: {
    points: ["safe movement", "comfort", "fatigue", "routine stability"],
  },
  other_not_sure: {
    points: ["comfort", "mobility", "bathroom rhythm", "skin", "energy"],
  },
};

function formatList(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function getConditionAttentionNote(
  condition: string | null | undefined,
  dogName: string,
  additionalConditions: readonly string[] = [],
) {
  const primaryCondition = isDogConditionKey(condition) ? condition : null;
  const conditionKeys = Array.from(
    new Set([
      ...(primaryCondition ? [primaryCondition] : []),
      ...additionalConditions.filter(isDogConditionKey),
    ]),
  );

  const specificConditionKeys = conditionKeys.filter(
    (conditionKey) => conditionKey !== "other_not_sure",
  );
  const guidanceConditionKeys =
    specificConditionKeys.length > 0 ? specificConditionKeys : conditionKeys;

  if (guidanceConditionKeys.length === 0) {
    return null;
  }

  const name = dogName.trim() || "your dog";
  const conditionLabels = guidanceConditionKeys.map(getDogConditionLabel);
  const emphasisPoints = Array.from(
    new Set(
      guidanceConditionKeys.flatMap(
        (conditionKey) => conditionEmphasis[conditionKey].points,
      ),
    ),
  ).slice(0, 4);

  if (
    guidanceConditionKeys.length === 1 &&
    guidanceConditionKeys[0] === "other_not_sure"
  ) {
    return `Because ${name}'s condition is still being clarified, focus on patterns: ${formatList(emphasisPoints)} today.`;
  }

  return `Because ${name}'s profile includes ${formatList(conditionLabels)}, pay extra attention to ${formatList(emphasisPoints)} today.`;
}
