"use client";

import { useSyncExternalStore } from "react";
import {
  CareUpdate,
  readAllCareUpdates,
  readLatestCareUpdate,
} from "@/lib/careUpdates";

const careUpdateChangedEvent = "carepaw:latest-update-changed";
const emptyCareUpdates: CareUpdate[] = [];

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(careUpdateChangedEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(careUpdateChangedEvent, onStoreChange);
  };
}

function getSnapshot() {
  return readLatestCareUpdate();
}

function getServerSnapshot(): CareUpdate | null {
  return null;
}

export function notifyCareUpdateChanged() {
  window.dispatchEvent(new Event(careUpdateChangedEvent));
}

export function useLatestCareUpdate() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function getAllSnapshot() {
  return readAllCareUpdates();
}

function getAllServerSnapshot(): CareUpdate[] {
  return emptyCareUpdates;
}

export function useCareUpdates() {
  return useSyncExternalStore(
    subscribe,
    getAllSnapshot,
    getAllServerSnapshot,
  );
}
