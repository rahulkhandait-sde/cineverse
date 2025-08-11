"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearWatched } from "@/store/watchedSlice";
import { Film } from "lucide-react";
import { MovieSection } from "./MovieSection";

export const WatchedSection = () => {
	const dispatch = useDispatch();
	const watched = useSelector((state: RootState) => state.watched.movies);

	return (
		<MovieSection
			title="Watched"
			icon={Film}
			movies={watched}
			clearHandler={() => {
				if (confirm("Clear all watched movies?")) dispatch(clearWatched());
			}}
		/>
	);
};
