// import { configureStore } from "@reduxjs/toolkit";
// import movieReducer from "./movieSlice"; 

// export const store = configureStore({
// 	reducer: {
// 		movies: movieReducer,
// 		watchlist: watchlistReducer,
// 	},

import compareMovieReducer from "./compareMovieSlice";
import { loadState, saveState } from "@/lib/localStorageUtils";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";
import watchedReducer from "./watchedSlice";
import favoritesReducer from "./favoritesSlice";


const preloadedState = { compare: loadState() };

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    compare: compareMovieReducer,
    watchlist: watchlistReducer,
    favorites: favoritesReducer,
    watched: watchedReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState(store.getState().compare);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
