"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearWatchlist } from "@/store/watchlistSlice";
import { Bookmark } from "lucide-react";
import { MovieSection } from "./MovieSection";

export const WatchlistSection = () => {
	const dispatch = useDispatch();
	const watchlist = useSelector((state: RootState) => state.watchlist.movies);

	return (
		<MovieSection
			title="Watchlist"
			icon={Bookmark}
			movies={watchlist}
			clearHandler={() => {
				if (confirm("Clear all watchlist?")) dispatch(clearWatchlist());
			}}
		/>
	);
};
