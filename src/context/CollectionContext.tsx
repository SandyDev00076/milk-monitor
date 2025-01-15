import { createContext, useContext, useReducer } from "react";
import { CollectionType } from "../types/CollectionType";
import { ReadingType } from "../types/ReadingType";
import { loadCollectionsFromStorage } from "../utils/storage";

type CollectionStateType = {
  collections: CollectionType[];
};

const defaultState: CollectionStateType = {
  collections: loadCollectionsFromStorage(),
};

type Action =
  | {
      type: "add";
      payload: CollectionType;
    }
  | {
      type: "remove";
      payload: string;
    }
  | {
      type: "addReading";
      payload: {
        id: string;
        reading: ReadingType;
      };
    }
  | {
      type: "removeReading";
      payload: {
        id: string;
        readingID: string;
      };
    };
type DispatchType = (action: Action) => void;

type ContextType = {
  state: CollectionStateType;
  dispatch: DispatchType;
};

const CollectionContext = createContext<ContextType | undefined>(undefined);

function collectionReducer(
  state: CollectionStateType,
  action: Action,
): CollectionStateType {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      return {
        collections: [...state.collections, payload],
      };
    }
    case "remove": {
      const newCollections = [...state.collections];
      const colToRemove = newCollections.findIndex((col) => col.id === payload);
      if (colToRemove < 0) throw new Error(`Collection ${payload} not found!`);
      newCollections.splice(colToRemove, 1);
      return {
        collections: [...newCollections],
      };
    }
    case "addReading": {
      const newCollections = [...state.collections];
      const colToUpdate = newCollections.findIndex(
        (col) => col.id === payload.id,
      );
      if (colToUpdate < 0)
        throw new Error(`Collection ${payload.id} not found!`);
      newCollections[colToUpdate].readings.push(payload.reading);
      return {
        collections: [...newCollections],
      };
    }
    case "removeReading": {
      const newCollections = [...state.collections];
      const colToUpdate = newCollections.findIndex(
        (col) => col.id === payload.id,
      );
      if (colToUpdate < 0)
        throw new Error(`Collection ${payload.id} not found!`);
      const readingToRemove = newCollections[colToUpdate].readings.findIndex(
        (reading) => reading.id === payload.readingID,
      );
      if (readingToRemove < 0)
        throw new Error(`Reading ${payload.readingID} not found!`);
      newCollections[colToUpdate].readings.splice(readingToRemove, 1);
      return {
        collections: [...newCollections],
      };
    }
  }
}

type ProviderProps = {
  children: React.ReactNode;
};

export default function CollectionProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(collectionReducer, defaultState);
  return (
    <CollectionContext.Provider value={{ state, dispatch }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error("Please use this inside CollectionProvider");
  const { state, dispatch } = context;

  function addCollection(args: { collection: CollectionType }) {
    dispatch({ type: "add", payload: args.collection });
  }

  function removeCollection(args: { collectionID: string }) {
    dispatch({ type: "remove", payload: args.collectionID });
  }

  function addReading(args: { collectionID: string; reading: ReadingType }) {
    dispatch({
      type: "addReading",
      payload: {
        id: args.collectionID,
        reading: args.reading,
      },
    });
  }

  function removeReading(args: { collectionID: string; readingID: string }) {
    dispatch({
      type: "removeReading",
      payload: { id: args.collectionID, readingID: args.readingID },
    });
  }

  return {
    collections: state.collections,
    addCollection,
    removeCollection,
    addReading,
    removeReading,
  };
}
