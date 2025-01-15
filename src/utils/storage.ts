import { CollectionType } from "../types/CollectionType";

const LOCALSTORAGE_KEY = "milk-collections";

export function loadCollectionsFromStorage(): CollectionType[] {
  const localStr = localStorage.getItem(LOCALSTORAGE_KEY);
  return localStr ? JSON.parse(localStr) : [];
}

export function setCollectionsInStorage(collections: CollectionType[]) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(collections));
}
