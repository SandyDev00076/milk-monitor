import { useEffect, useState } from "react";
import { useCollections } from "../context/CollectionContext";
import Collection from "./Collection";
import EmptyUI from "./EmptyUI";
import { setCollectionsInStorage } from "../utils/storage";
import usePagination from "../hooks/usePagination";

export default function Collections() {
  const { collections } = useCollections();
  const [selectedCollection, setSelectedCollection] = useState("");
  const { loadMore, showLoadMore, paginatedCollections } = usePagination({
    collections,
  });

  useEffect(() => {
    setCollectionsInStorage(collections);
  }, [collections]);

  if (collections.length === 0) return <EmptyUI />;

  return (
    <section>
      <h1 className="px-8 font-semibold text-lg mb-6 text-gray-600">
        {collections.length === 1
          ? "1 Collection"
          : `${collections.length} Collections`}
      </h1>
      <section className="pb-24">
        {paginatedCollections.map((col) => (
          <Collection
            collection={col}
            key={col.id}
            selectedCollection={selectedCollection}
            onExpand={(id) => setSelectedCollection(id)}
          />
        ))}
        {showLoadMore && (
          <button
            className="px-4 py-2 rounded-lg w-full text-blue-600 font-semibold"
            onClick={loadMore}
          >
            Load More Collections
          </button>
        )}
      </section>
    </section>
  );
}
