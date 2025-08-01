import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
		watchlist: watchlistReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
