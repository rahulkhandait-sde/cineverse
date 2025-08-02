import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
		watchlist: watchlistReducer,
	},

import compareMovieReducer from "./compareMovieSlice";
import { loadState, saveState } from "@/lib/localStorageUtils";

const preloadedState = { compare: loadState() };

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    compare: compareMovieReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState(store.getState().compare);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
