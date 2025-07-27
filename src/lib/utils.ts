import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Utility functions for search history
export const searchHistoryUtils = {
	// Format relative time for search history items
	formatRelativeTime: (timestamp: number): string => {
		const now = Date.now();
		const diff = now - timestamp;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) {
			return `${days} day${days > 1 ? 's' : ''} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		} else {
			return 'Just now';
		}
	},

	// Highlight matching text in search suggestions
	highlightMatch: (text: string, query: string): string => {
		if (!query.trim()) return text;
		
		const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-1">$1</mark>');
	},

	// Clean search query for better matching
	normalizeQuery: (query: string): string => {
		return query.trim().toLowerCase().replace(/[^\w\s]/g, '');
	},
};
