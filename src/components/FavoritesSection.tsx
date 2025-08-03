"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearFavorites } from "@/store/favoritesSlice";
import { Star } from "lucide-react";
import { MovieSection } from "./MovieSection";

export const FavoritesSection = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state: RootState) => state.favorites.movies);

	return (
		<MovieSection
			title="Favorites"
			icon={Star}
			movies={favorites}
			clearHandler={() => {
				if (confirm("Clear all favorites?")) dispatch(clearFavorites());
			}}
		/>
	);
};
