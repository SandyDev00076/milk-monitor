import { useState } from "react";
import AddIcon from "../assets/add.svg";
import { CollectionType } from "../types/CollectionType";
import { nanoid } from "nanoid";
import { useCollections } from "../context/CollectionContext";
import CloseIcon from "../assets/close.svg";

export default function AddCollection() {
  const [isFormOpen, showForm] = useState(false);
  const [name, setName] = useState("");
  const { addCollection } = useCollections();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const collectionToAdd: CollectionType = {
      id: `collection-${nanoid(3)}`,
      name,
      readings: [],
    };
    addCollection({ collection: collectionToAdd });
    setName("");
    showForm(false);
  }

  function handleAddCollectionClick() {
    setName(new Date().toLocaleDateString());
    showForm(true);
  }

  return (
    <section className="fixed bottom-0 left-0 flex justify-center py-8 px-8 lg:px-[20%] w-full bg-gradient-to-t from-white to-transparent">
      {isFormOpen ? (
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 flex items-center gap-2"
        >
          <input
            className=" px-4 py-3 bg-gray-100 rounded-lg flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-blue-600 w-14 text-white rounded-lg px-4 py-3 flex items-center gap-2 disabled:bg-gray-300"
            disabled={!name}
          >
            <img src={AddIcon} width={24} height={24} alt="add icon form" />
          </button>
          <button
            className="bg-gray-400 w-14 text-white rounded-lg px-4 py-3 flex items-center gap-2 disabled:bg-gray-300"
            type="button"
            onClick={() => showForm(false)}
          >
            <img src={CloseIcon} width={24} height={24} alt="add icon form" />
          </button>
        </form>
      ) : (
        <button
          className="bg-blue-600 text-white rounded-lg px-4 py-3 flex items-center gap-2"
          onClick={handleAddCollectionClick}
        >
          <img src={AddIcon} width={24} height={24} alt="add icon" /> Add
          Collection
        </button>
      )}
    </section>
  );
}
