import compareMovieReducer from "./compareMovieSlice";
import { loadState, saveState } from "@/lib/localStorageUtils";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";
import watchedReducer from "./watchedSlice";
import favoritesReducer from "./favoritesSlice";


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
    favorites: favoritesReducer,
    watched: watchedReducer,
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
