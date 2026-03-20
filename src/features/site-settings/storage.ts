export const siteSettingsStorageKey = "site-settings:v2";
export const legacySiteSettingsStorageKeys = ["site-settings:v1"];
export const draggableLayoutStoragePrefix = "site-settings:layout:";

export function getDraggableLayoutStorageKey(storageKey: string) {
  return `${draggableLayoutStoragePrefix}${storageKey}`;
}
