"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearWatchlist } from "../../store/watchlistSlice";
import { MovieGrid } from "../../components/MovieGrid";
import { Header } from "../../components/Header";
import { motion } from "framer-motion";
import { Bookmark, Trash2, Film } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function WatchlistPage() {
	const dispatch = useDispatch();
	const watchlistMovies = useSelector(
		(state: RootState) => state.watchlist.movies
	);

	const handleClearWatchlist = () => {
		if (confirm("Are you sure you want to clear your entire watchlist?")) {
			dispatch(clearWatchlist());
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
			<Header />
			
			<main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-8"
					>
						<div className="flex items-center justify-center gap-3 mb-4">
							<motion.div
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.8 }}
								className="relative"
							>
								<div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-full blur-lg opacity-20"></div>
								<div className="relative bg-gradient-to-r from-red-500 to-purple-600 p-3 rounded-full">
									<Bookmark className="w-8 h-8 text-white" />
								</div>
							</motion.div>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent">
								My Watchlist
							</h1>
						</div>
						
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6"
						>
							Your personal collection of movies to watch later
						</motion.p>

						{/* Stats and Actions */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
						>
							<div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
								<Film className="w-5 h-5 text-blue-500" />
								<span className="font-semibold text-gray-700 dark:text-gray-300">
									{watchlistMovies.length} {watchlistMovies.length === 1 ? "movie" : "movies"}
								</span>
							</div>

							{watchlistMovies.length > 0 && (
								<Button
									onClick={handleClearWatchlist}
									variant="destructive"
									size="sm"
									className="flex items-center gap-2"
								>
									<Trash2 className="w-4 h-4" />
									Clear All
								</Button>
							)}
						</motion.div>
					</motion.div>

					{/* Content */}
					{watchlistMovies.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.4 }}
							className="text-center py-16"
						>
							<div className="max-w-md mx-auto">
								<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
									<Bookmark className="w-12 h-12 text-gray-400 dark:text-gray-500" />
								</div>
								<h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
									Your watchlist is empty
								</h3>
								<p className="text-gray-500 dark:text-gray-400 mb-6">
									Start building your watchlist by browsing movies and adding the ones you want to watch later.
								</p>
								<Button
									onClick={() => window.location.href = "/movies"}
									className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
								>
									Browse Movies
								</Button>
							</div>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							<MovieGrid movies={watchlistMovies} />
						</motion.div>
					)}
				</div>
			</main>
		</div>
	);
} 