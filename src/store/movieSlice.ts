import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetails, UserRating } from "../types/movie";

interface MovieState {
	movies: Movie[];
	movieDetails: { [key: string]: MovieDetails };
	searchQuery: string;
	loading: boolean;
	error: string | null;
	userRatings: UserRating[];
	darkMode: boolean;
}

const initialState: MovieState = {
	movies: [],
	movieDetails: {},
	searchQuery: "",
	loading: false,
	error: null,
	userRatings: [],
	darkMode: false,
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setMovies: (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
		setMovieDetails: (
			state,
			action: PayloadAction<{ id: string; details: MovieDetails }>
		) => {
			state.movieDetails[action.payload.id] = action.payload.details;
		},
		addUserRating: (state, action: PayloadAction<UserRating>) => {
			const existingRatingIndex = state.userRatings.findIndex(
				(rating) => rating.movieId === action.payload.movieId
			);
			if (existingRatingIndex >= 0) {
				state.userRatings[existingRatingIndex] = action.payload;
			} else {
				state.userRatings.push(action.payload);
			}
		},
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		setDarkMode: (state, action: PayloadAction<boolean>) => {
			state.darkMode = action.payload;
		},
	},
});

export const {
	setSearchQuery,
	setLoading,
	setError,
	setMovies,
	setMovieDetails,
	addUserRating,
	toggleDarkMode,
	setDarkMode,
} = movieSlice.actions;

export default movieSlice.reducer;
