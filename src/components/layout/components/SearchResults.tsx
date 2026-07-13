import React from "react";
import type { GlobalSearchResults } from "../types/search.types";

interface SearchResultsProps {
  query: string;
  results: GlobalSearchResults;
  onSelect: (path: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onSelect,
}) => {
  const { tasks, households, members, isLoading } = results;
  const hasResults =
    tasks.length > 0 || households.length > 0 || members.length > 0;
};

export default SearchResults;
