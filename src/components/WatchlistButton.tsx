"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Movie } from "../types/movie";
import { RootState } from "../store/store";
import { addToWatchlist, removeFromWatchlist } from "../store/watchlistSlice";

interface WatchlistButtonProps {
	movie: Movie;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: "w-8 h-8",
	md: "w-10 h-10",
	lg: "w-12 h-12",
};

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
	movie,
	size = "md",
	className = "",
}) => {
	const dispatch = useDispatch();
	const watchlistMovies = useSelector(
		(state: RootState) => state.watchlist.movies
	);

	const isInWatchlist = watchlistMovies.some(
		(watchlistMovie) => watchlistMovie.imdbID === movie.imdbID
	);

	const handleToggleWatchlist = () => {
		if (isInWatchlist) {
			dispatch(removeFromWatchlist(movie.imdbID));
		} else {
			dispatch(addToWatchlist(movie));
		}
	};

	const sizeClass = sizeClasses[size];

	return (
		<motion.button
			onClick={handleToggleWatchlist}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className={`
				${sizeClass} ${className} 
				relative flex items-center justify-center 
				rounded-full transition-all duration-300 
				${
					isInWatchlist
						? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
						: "bg-white/10 backdrop-blur-xl border border-white/20 hover:border-red-400"
				}`}
			aria-label={
				isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
			}
		>
			<motion.div
				initial={false}
				animate={{
					scale: isInWatchlist ? [1, 1.2, 1] : 1,
					rotate: isInWatchlist ? [0, 10, -10, 0] : 0,
				}}
				transition={{ duration: 0.3 }}
			>
				<Bookmark
					className={`w-5 h-5 ${
						isInWatchlist ? "text-white" : "text-red-500"
					}`}
				/>
			</motion.div>

			{/* Ripple effect */}
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={{
					scale: isInWatchlist ? [0, 1.5, 0] : 0,
					opacity: isInWatchlist ? [1, 0] : 0,
				}}
				transition={{ duration: 0.6 }}
				className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-purple-600/30"
			/>
		</motion.button>
	);
};
