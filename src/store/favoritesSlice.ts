import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface FavoritesState {
	movies: Movie[];
}

const loadFavoritesFromStorage = (): Movie[] => {
	if (typeof window === "undefined") return [];

	try {
		const saved = localStorage.getItem("favorites");
		return saved ? JSON.parse(saved) : [];
	} catch (error) {
		console.error("Error loading favorites from localStorage:", error);
		return [];
	}
};

const initialState: FavoritesState = {
	movies: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<Movie>) => {
			const exists = state.movies.find(m => m.imdbID === action.payload.imdbID);
			if (!exists) {
				state.movies.push(action.payload);
				if (typeof window !== "undefined") {
					localStorage.setItem("favorites", JSON.stringify(state.movies));
				}
			}
		},
		removeFromFavorites: (state, action: PayloadAction<string>) => {
			state.movies = state.movies.filter(m => m.imdbID !== action.payload);
			if (typeof window !== "undefined") {
				localStorage.setItem("favorites", JSON.stringify(state.movies));
			}
		},
		clearFavorites: (state) => {
			state.movies = [];
			if (typeof window !== "undefined") {
				localStorage.setItem("favorites", JSON.stringify(state.movies));
			}
		},
		loadFavorites: (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
	},
});

export const {
	addToFavorites,
	removeFromFavorites,
	clearFavorites,
	loadFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
