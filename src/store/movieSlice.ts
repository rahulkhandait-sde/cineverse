import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie, MovieDetails, UserRating } from "../types/movie";

import { movieApi } from "../services/movieApi"; // Confirm this path is correct

// Define the arguments type for fetchMovies async thunk
interface FetchMoviesArgs {
    s: string; // search term
    y?: string; // year
    type?: string; // movie type (e.g., 'movie', 'series', 'episode')
    genre?: string; // genre parameter (still not used for direct filtering on OMDb search results)
}

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

// --- Async Thunk for Fetching Movies ---
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (args: FetchMoviesArgs, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const { s, y, type, genre } = args; // Keep genre for clarity, even if not used in OMDb search

            // Construct the params object correctly for movieApi.searchMovies
            const searchParamsForApi = {
                y: y,
                type: type,
                // Do NOT include 'genre' here, as movieApi.searchMovies's SearchParams doesn't expect it directly
                // (and OMDb /s endpoint doesn't support it for filtering anyway).
            };

            // CORRECTED CALL: Pass the main query and the params object
            const response = await movieApi.searchMovies(s, searchParamsForApi);

            if (response.Response === "True") {
                // IMPORTANT: Still no client-side genre filtering on the 'Search' array
                // because the 'Movie' interface (from OMDb search results) does not contain 'Genre'.
                return response.Search || [];
            } else {
                return rejectWithValue(response.Error || "Unknown error fetching movies.");
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to connect to the movie API.");
        } finally {
            dispatch(setLoading(false));
        }
    }
);
// --- End Async Thunk ---


const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
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
        clearMovies: (state) => {
            state.movies = [];
            state.error = null;
            state.searchQuery = "";
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.movies = [];
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.loading = false;
                state.movies = action.payload;
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.movies = [];
            });
    },
});

export const {
    setSearchTerm,
    setLoading,
    setError,
    setMovies,
    clearMovies,
    setMovieDetails,
    addUserRating,
    toggleDarkMode,
    setDarkMode,
} = movieSlice.actions;

export default movieSlice.reducer;