import { useEffect, useMemo, useState } from "react";
import { CollectionType } from "../types/CollectionType";
import AddIcon from "../assets/add.svg";
import { useCollections } from "../context/CollectionContext";
import { ReadingType } from "../types/ReadingType";
import { nanoid } from "nanoid";
import Reading from "./Reading";

type Props = {
  collection: CollectionType;
  selectedCollection: string;
  onExpand: (collectionID: string) => void;
};

export default function Collection({
  collection,
  onExpand,
  selectedCollection,
}: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const [reading, setReading] = useState("");
  const totalML = useMemo(() => {
    return collection.readings.reduce((a, b) => a + b.ml, 0);
  }, [collection.readings, collection.readings.length]);

  const { addReading, removeReading } = useCollections();

  useEffect(() => {
    if (selectedCollection !== collection.id) setCollapsed(true);
  }, [selectedCollection, collection.id]);

  function handleReadingFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newReading: ReadingType = {
      id: `reading-${nanoid(3)}`,
      ml: parseInt(reading),
      timestamp: new Date().toUTCString(),
    };
    addReading({ collectionID: collection.id, reading: newReading });
    setReading("");
  }

  if (collapsed)
    return (
      <button
        className=" bg-blue-50 rounded-none lg:rounded-xl flex items-baseline p-8 mb-2 w-full"
        onClick={() => {
          setCollapsed(false);
          onExpand(collection.id);
        }}
      >
        <div className="flex-1 flex flex-col items-start">
          <h2 className=" text-lg text-blue-700">{collection.name}</h2>
          <span className="text-gray-500">
            {collection.readings.length} entries
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>
            <span className="text-2xl">{totalML}</span>ml
          </div>
          <span className="text-gray-500 text-sm">click to expand</span>
        </div>
      </button>
    );
  return (
    <section className="bg-blue-50 px-8 pt-8 pb-4 mb-2">
      <button
        className="flex items-baseline mb-4 w-full"
        onClick={() => setCollapsed(true)}
      >
        <div className="flex-1 flex flex-col items-start">
          <h2 className=" text-lg text-blue-700">{collection.name}</h2>
          <span className="text-gray-500">
            {collection.readings.length} entries
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div>
            <span className="text-2xl">{totalML}</span>ml
          </div>
          <span className="text-gray-500 text-sm">click to collapse</span>
        </div>
      </button>
      <section className=" flex flex-col gap-2 mb-4">
        {collection.readings.map((reading) => (
          <Reading
            key={reading.id}
            reading={reading}
            onDeleteClick={() =>
              removeReading({
                collectionID: collection.id,
                readingID: reading.id,
              })
            }
          />
        ))}
      </section>
      <form
        onSubmit={handleReadingFormSubmit}
        className="flex-1 flex items-center gap-4"
      >
        <input
          className=" px-4 py-3 bg-white rounded-lg flex-1"
          value={reading}
          type="number"
          placeholder="Add ml of milk"
          onChange={(e) => setReading(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded-lg px-4 py-3 flex items-center gap-2 disabled:bg-gray-300"
          disabled={!reading}
        >
          <img src={AddIcon} width={24} height={24} alt="add icon form" />
        </button>
      </form>
    </section>
  );
}
