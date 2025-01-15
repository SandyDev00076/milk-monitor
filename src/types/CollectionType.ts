import { ReadingType } from "./ReadingType";

export type CollectionType = {
  id: string;
  name: string;
  readings: ReadingType[];
};
