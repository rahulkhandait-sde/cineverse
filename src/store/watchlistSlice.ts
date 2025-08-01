import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface WatchlistState {
	movies: Movie[];
}

// Load initial state from localStorage
const loadWatchlistFromStorage = (): Movie[] => {
	if (typeof window === "undefined") return [];
	
	try {
		const saved = localStorage.getItem("watchlist");
		return saved ? JSON.parse(saved) : [];
	} catch (error) {
		console.error("Error loading watchlist from localStorage:", error);
		return [];
	}
};

const initialState: WatchlistState = {
	movies: loadWatchlistFromStorage(),
};

const watchlistSlice = createSlice({
	name: "watchlist",
	initialState,
	reducers: {
		addToWatchlist: (state, action: PayloadAction<Movie>) => {
			const existingMovie = state.movies.find(
				(movie) => movie.imdbID === action.payload.imdbID
			);
			if (!existingMovie) {
				state.movies.push(action.payload);
				// Save to localStorage
				if (typeof window !== "undefined") {
					localStorage.setItem("watchlist", JSON.stringify(state.movies));
				}
			}
		},
		removeFromWatchlist: (state, action: PayloadAction<string>) => {
			state.movies = state.movies.filter(
				(movie) => movie.imdbID !== action.payload
			);
			// Save to localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem("watchlist", JSON.stringify(state.movies));
			}
		},
		clearWatchlist: (state) => {
			state.movies = [];
			// Save to localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem("watchlist", JSON.stringify(state.movies));
			}
		},
		loadWatchlist: (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
	},
});

export const {
	addToWatchlist,
	removeFromWatchlist,
	clearWatchlist,
	loadWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer; 