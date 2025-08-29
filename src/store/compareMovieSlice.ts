import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../types/movie";

interface CompareMovieState {
	compareMovies: MovieDetails[];
}

const initialState: CompareMovieState = {
	compareMovies: [],
};

const compareMovieSlice = createSlice({
	name: "compare",
	initialState,
	reducers: {
		addMovieToCompare: (state, action: PayloadAction<MovieDetails>) => {
			const exists = state.compareMovies.find(
				(movie) => movie.imdbID === action.payload.imdbID
			);
			if (!exists) {
				state.compareMovies.push(action.payload);
			}
		},
		removeMovieFromCompare: (state, action: PayloadAction<string>) => {
			state.compareMovies = state.compareMovies.filter(
				(movie) => movie.imdbID !== action.payload
			);
		},
		clearCompareMovies: (state) => {
			state.compareMovies = [];
		},
	},
});
export const { addMovieToCompare, removeMovieFromCompare, clearCompareMovies } =
	compareMovieSlice.actions;

export default compareMovieSlice.reducer;
