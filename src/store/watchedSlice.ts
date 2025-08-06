import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface FavoritesState {
	movies: Movie[];
}

const loadWatchedFromStorage = (): Movie[] => {
	if (typeof window === "undefined") return [];

	try {
		const saved = localStorage.getItem("watched");
		return saved ? JSON.parse(saved) : [];
	} catch (error) {
		console.error("Error loading watched from localStorage:", error);
		return [];
	}
};

const initialState: FavoritesState = {
	movies: loadWatchedFromStorage(),
};

const watchedSlice = createSlice({
	name: "watched",
	initialState,
	reducers: {
		addToWatched: (state, action: PayloadAction<Movie>) => {
			const exists = state.movies.find(m => m.imdbID === action.payload.imdbID);
			if (!exists) {
				state.movies.push(action.payload);
				if (typeof window !== "undefined") {
					localStorage.setItem("watched", JSON.stringify(state.movies));
				}
			}
		},
		removeFromWatched: (state, action: PayloadAction<string>) => {
			state.movies = state.movies.filter(m => m.imdbID !== action.payload);
			if (typeof window !== "undefined") {
				localStorage.setItem("watched", JSON.stringify(state.movies));
			}
		},
		clearWatched: (state) => {
			state.movies = [];
			if (typeof window !== "undefined") {
				localStorage.setItem("watched", JSON.stringify(state.movies));
			}
		},
		loadWatched: (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
	},
});

export const {
	addToWatched,
	removeFromWatched,
	clearWatched,
	loadWatched,
} = watchedSlice.actions;

export default watchedSlice.reducer;
