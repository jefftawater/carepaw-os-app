export const conditionSignals = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
] as const;

export type ConditionSignal = (typeof conditionSignals)[number];

export type CareUpdate = {
  createdAt: string;
  id: string;
  note: string;
  signal: ConditionSignal;
};

export type FocusContent = {
  bullets: string[];
  label: string;
  reassurance: string;
  title: string;
};

export const careUpdateStorageKey = "carepaw.conditionUpdates";
const legacyCareUpdateStorageKey = "carepaw.latestUpdate";

let cachedRawUpdate: string | null = null;
let cachedUpdates: CareUpdate[] = [];

export const defaultFocus: FocusContent = {
  label: "What matters today",
  title: "Anchor your day around the next medication + bathroom cycle.",
  bullets: [
    "After meds, plan for the next potty window",
    "Watch comfort and movement changes",
    "If today feels like a lot, just focus on the first one",
  ],
  reassurance: "You don't have to manage everything - staying in rhythm is enough.",
};

export const focusBySignal: Record<ConditionSignal, FocusContent> = {
  "More restless": {
    label: "Mental Stimulation focus",
    title: "Keep activity calm, close, and predictable today.",
    bullets: [
      "Try a short food scatter or slow treat search",
      "Stay near Max without turning restlessness into play",
      "Lower stimulation if barking or pacing increases",
    ],
    reassurance: "Restless energy is information. Calm structure is enough today.",
  },
  "Bathroom changes": {
    label: "Bathroom Rhythm focus",
    title: "Make the next bathroom window easier to predict.",
    bullets: [
      "Watch after meds, meals, water, and rest",
      "Shorten the next interval if accidents increased",
      "Look for timing patterns instead of waiting for obvious signals",
    ],
    reassurance: "A steadier rhythm matters more than getting every attempt perfect.",
  },
  "More uncomfortable": {
    label: "Comfort + Pain Cues focus",
    title: "Prioritize comfort cues and easier movement today.",
    bullets: [
      "Watch changes in posture, movement, and settling",
      "Keep transitions slow and supported",
      "Choose calm contact over extra activity",
    ],
    reassurance: "Comfort is a valid care goal. A quieter day can still be a good day.",
  },
  "A little worse": {
    label: "Comfort + reduced activity focus",
    title: "Keep the day smaller and easier to move through.",
    bullets: [
      "Reduce unnecessary movement and long transitions",
      "Keep bathroom and medication timing steady",
      "Notice whether rest helps Max return toward baseline",
    ],
    reassurance: "Scaling back is care, not failure.",
  },
  "About the same": {
    label: "Routine Stability focus",
    title: "Stay with the rhythm that is already working.",
    bullets: [
      "Keep medication and bathroom timing predictable",
      "Watch for small changes without overcorrecting",
      "Use the same calm structure Max knows",
    ],
    reassurance: "Stable days count. Keeping the pattern steady is meaningful.",
  },
};

export function getFocusForSignal(signal?: ConditionSignal): FocusContent {
  if (!signal) {
    return defaultFocus;
  }

  return focusBySignal[signal];
}

function isCareUpdate(update: unknown): update is CareUpdate {
  if (!update || typeof update !== "object") {
    return false;
  }

  const candidate = update as Partial<CareUpdate>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.note === "string" &&
    conditionSignals.includes(candidate.signal as ConditionSignal)
  );
}

function normalizeLegacyUpdate(update: unknown): CareUpdate | null {
  if (!update || typeof update !== "object") {
    return null;
  }

  const candidate = update as Partial<CareUpdate> & { savedAt?: string };

  if (
    typeof candidate.note === "string" &&
    conditionSignals.includes(candidate.signal as ConditionSignal)
  ) {
    const createdAt =
      typeof candidate.createdAt === "string"
        ? candidate.createdAt
        : candidate.savedAt;

    if (typeof createdAt === "string") {
      return {
        createdAt,
        id: typeof candidate.id === "string" ? candidate.id : createdAt,
        note: candidate.note,
        signal: candidate.signal as ConditionSignal,
      };
    }
  }

  return null;
}

function sortNewestFirst(updates: CareUpdate[]) {
  return [...updates].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

export function readAllCareUpdates(): CareUpdate[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawUpdate = window.localStorage.getItem(careUpdateStorageKey);
  const legacyRawUpdate = window.localStorage.getItem(
    legacyCareUpdateStorageKey,
  );
  const cacheKey = rawUpdate ?? `legacy:${legacyRawUpdate ?? ""}`;

  if (cacheKey === cachedRawUpdate) {
    return cachedUpdates;
  }

  cachedRawUpdate = cacheKey;
  cachedUpdates = [];

  if (!rawUpdate) {
    if (!legacyRawUpdate) {
      return cachedUpdates;
    }

    try {
      const legacyUpdate = normalizeLegacyUpdate(JSON.parse(legacyRawUpdate));

      if (legacyUpdate) {
        cachedUpdates = [legacyUpdate];
        return cachedUpdates;
      }
    } catch {
      return cachedUpdates;
    }

    return cachedUpdates;
  }

  try {
    const parsedUpdates = JSON.parse(rawUpdate) as unknown;

    if (Array.isArray(parsedUpdates)) {
      cachedUpdates = sortNewestFirst(parsedUpdates.filter(isCareUpdate));
      return cachedUpdates;
    }
  } catch {
    return cachedUpdates;
  }

  return cachedUpdates;
}

export function readLatestCareUpdate(): CareUpdate | null {
  return readAllCareUpdates()[0] ?? null;
}

export function createCareUpdate(signal: ConditionSignal, note: string): CareUpdate {
  const createdAt = new Date().toISOString();

  return {
    createdAt,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${createdAt}-${Math.random().toString(36).slice(2)}`,
    note,
    signal,
  };
}

export function saveCareUpdate(update: CareUpdate) {
  const updates = [update, ...readAllCareUpdates()];

  window.localStorage.setItem(careUpdateStorageKey, JSON.stringify(updates));
  cachedRawUpdate = null;
}
