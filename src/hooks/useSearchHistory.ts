import { useCallback } from "react";
import { useLocalStorage } from "./useDebounce";

const SEARCH_HISTORY_KEY = "cineverse-search-history";
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
	query: string;
	timestamp: number;
}

export function useSearchHistory() {
	const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistoryItem[]>(
		SEARCH_HISTORY_KEY,
		[]
	);

	// Add a search to history
	const addToHistory = useCallback(
		(query: string) => {
			if (!query.trim()) return;

			const normalizedQuery = query.trim().toLowerCase();
			const timestamp = Date.now();

			setSearchHistory((prev) => {
				// Remove any existing entries with the same query (case-insensitive)
				const filteredHistory = prev.filter(
					(item) => item.query.toLowerCase() !== normalizedQuery
				);

				// Add the new search at the beginning
				const newHistory = [
					{ query: query.trim(), timestamp },
					...filteredHistory,
				];

				// Keep only the most recent MAX_HISTORY_ITEMS
				return newHistory.slice(0, MAX_HISTORY_ITEMS);
			});
		},
		[setSearchHistory]
	);

	// Get filtered search suggestions based on current input
	const getSearchSuggestions = useCallback(
		(currentQuery: string): SearchHistoryItem[] => {
			if (!currentQuery.trim()) {
				// Return all history items when there's no current query
				return searchHistory.slice(0, 5); // Show top 5 recent searches
			}

			const normalizedQuery = currentQuery.toLowerCase();
			return searchHistory
				.filter((item: SearchHistoryItem) =>
					item.query.toLowerCase().includes(normalizedQuery)
				)
				.slice(0, 5); // Show top 5 matching searches
		},
		[searchHistory]
	);

	// Clear all search history
	const clearHistory = useCallback(() => {
		setSearchHistory([]);
	}, [setSearchHistory]);

	// Remove a specific item from history
	const removeFromHistory = useCallback(
		(queryToRemove: string) => {
			setSearchHistory((prev) =>
				prev.filter(
					(item) =>
						item.query.toLowerCase() !== queryToRemove.toLowerCase()
				)
			);
		},
		[setSearchHistory]
	);

	// Get recent searches (without filtering)
	const getRecentSearches = useCallback((): SearchHistoryItem[] => {
		return searchHistory.slice(0, 8); // Show top 8 recent searches
	}, [searchHistory]);

	return {
		searchHistory,
		addToHistory,
		getSearchSuggestions,
		getRecentSearches,
		clearHistory,
		removeFromHistory,
		hasHistory: searchHistory.length > 0,
	};
}
