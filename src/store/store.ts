import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";
import compareMovieReducer from "./compareMovieSlice";
import { loadState, saveState } from "@/lib/localStorageUtils";

// Load initial compare state from local storage
const preloadedState = {
  compare: loadState()
};

// Create one store with all reducers and preloaded state
export const store = configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer,
    compare: compareMovieReducer,
  },
  preloadedState,
});

// Save `compare` state to local storage whenever it changes
store.subscribe(() => {
  saveState(store.getState().compare);
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
