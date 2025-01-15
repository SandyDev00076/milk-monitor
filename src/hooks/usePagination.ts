import { useMemo, useState } from "react";
import { CollectionType } from "../types/CollectionType";

const PAGE_SIZE = 10;

type Props = {
  collections: CollectionType[];
};
export default function usePagination({ collections }: Props) {
  const [offset, setOffset] = useState(1);

  function loadMore() {
    setOffset((prev) => prev + 1);
  }

  const showLoadMore = useMemo(() => {
    return offset * PAGE_SIZE < collections.length;
  }, [collections, offset]);

  return {
    paginatedCollections: collections.slice(0, offset * PAGE_SIZE),
    loadMore,
    showLoadMore,
  };
}
