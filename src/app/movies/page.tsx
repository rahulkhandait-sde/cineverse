"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Header } from "../../components/Header";
import { SearchBar, SearchBarRef } from "../../components/SearchBar";
import { MovieGrid } from "../../components/MovieGrid";
import {
	LoadingSkeleton,
	ErrorState,
	EmptyState,
} from "../../components/LoadingStates";
import {
	useInfiniteMovieSearch,
	useMoviesWithGenreFilter,
} from "../../hooks/useMovieQueries";
import { useDebounce } from "../../hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";

const movieGenres = [
	{ value: "all", label: "All Genres" },
	{ value: "Action", label: "Action" },
	{ value: "Adventure", label: "Adventure" },
	{ value: "Animation", label: "Animation" },
	{ value: "Biography", label: "Biography" },
	{ value: "Comedy", label: "Comedy" },
	{ value: "Crime", label: "Crime" },
	{ value: "Documentary", label: "Documentary" },
	{ value: "Drama", label: "Drama" },
	{ value: "Family", label: "Family" },
	{ value: "Fantasy", label: "Fantasy" },
	{ value: "History", label: "History" },
	{ value: "Horror", label: "Horror" },
	{ value: "Music", label: "Music" },
	{ value: "Mystery", label: "Mystery" },
	{ value: "Romance", label: "Romance" },
	{ value: "Sci-Fi", label: "Sci-Fi" },
	{ value: "Sport", label: "Sport" },
	{ value: "Thriller", label: "Thriller" },
	{ value: "War", label: "War" },
	{ value: "Western", label: "Western" },
];

export default function MoviesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [year, setYear] = useState("");
	const [genre, setGenre] = useState("all");
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const searchBarRef = useRef<SearchBarRef>(null);

	// Update document title dynamically
	useEffect(() => {
		const baseTitle = "Movies & TV Series";
		if (searchQuery.trim()) {
			document.title = `Search: "${searchQuery}" | ${baseTitle} | CineVerse`;
		} else {
			document.title = `${baseTitle} | CineVerse`;
		}
	}, [searchQuery]);

	const debouncedQuery = useDebounce(searchQuery, 500);

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useInfiniteMovieSearch(debouncedQuery, year);

	// Flatten all pages into a single array of movies (memoized to prevent infinite re-renders)
	const allMovies = useMemo(() => {
		return data?.pages.flatMap((page) => page.Search || []) || [];
	}, [data]);

	// Apply client-side genre filtering
	const { filteredMovies, isFiltering } = useMoviesWithGenreFilter(
		allMovies,
		genre
	);

	// Use filtered movies for display
	const movies = filteredMovies;
	const totalResults =
		genre !== "all"
			? movies.length.toString()
			: data?.pages[0]?.totalResults || "0";
	const hasResults = movies.length > 0;
	const hasQuery = debouncedQuery.trim().length > 0;
	const isLoadingContent = isLoading || isFiltering;

	const handleClearFilters = () => {
		setYear("");
		setGenre("all");
	};

	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		// Also clear filters when using suggestions for better results
		setYear("");
		setGenre("all");

		// Show toast notification
		setToastMessage(`🎬 Searching for "${suggestion}"...`);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-10 dark:opacity-5'>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_40%,_rgba(120,200,255,0.3),_transparent_50%)]'></div>
			</div>

			<Header onSearchClick={() => searchBarRef.current?.focus()} />
			<main className='container mx-auto px-4 py-8 pt-32 relative z-10'>
				<div className='max-w-7xl mx-auto'>
					{/* Enhanced Hero Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className='text-center mb-20 relative'>
						{/* Enhanced Hero Background Effects */}
						<div className='absolute inset-0 -z-10'>
							<div className='absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-r from-red-600/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse'></div>
							<div className='absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000'></div>
							<div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-2000'></div>
						</div>

						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 1, delay: 0.2 }}
							className='mb-8'>
							<h1 className='text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight'>
								<span className='block bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent text-glow'>
									Discover
								</span>
								<span className='block text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mt-4'>
									Cinematic
									<br />
									<span className='bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent'>
										Universes
									</span>
								</span>
							</h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className='text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8'>
								Immerse yourself in millions of movies, TV series, and episodes
								from around the world.
								<br />
								<span className='text-red-500 dark:text-red-400 font-semibold bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent'>
									Your next favorite story awaits discovery.
								</span>
							</motion.p>

							{/* Premium feature badges */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
								className='flex flex-wrap justify-center gap-6 mt-10'>
								<div className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-red-500/30'>
									<div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
									<span className='text-red-600 dark:text-red-300 font-semibold text-sm'>
										4K Ultra HD
									</span>
								</div>
								<div className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-purple-500/30'>
									<div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse'></div>
									<span className='text-purple-600 dark:text-purple-300 font-semibold text-sm'>
										Dolby Atmos
									</span>
								</div>
								<div className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30'>
									<div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
									<span className='text-emerald-600 dark:text-emerald-300 font-semibold text-sm'>
										Unlimited Access
									</span>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Search and Filters */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}>
						<SearchBar
							ref={searchBarRef}
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder='Search for movies, TV series, episodes...'
							year={year}
							genre={genre}
							onYearChange={setYear}
							onGenreChange={setGenre}
							onClearFilters={handleClearFilters}
						/>
					</motion.div>

					{/* Results Section */}
					<AnimatePresence mode='wait'>
						{isLoadingContent ? (
							<motion.div
								key='loading'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}>
								<LoadingSkeleton type='grid' count={10} />
							</motion.div>
						) : error ? (
							<motion.div
								key='error'
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3 }}>
								<ErrorState
									title='Failed to load movies'
									message='There was an error loading the movies. Please check your connection and try again.'
									onRetry={() => refetch()}
								/>
							</motion.div>
						) : !hasQuery ? (
							<motion.div
								key='empty'
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3 }}>
								<EmptyState onSuggestionClick={handleSuggestionClick} />
							</motion.div>
						) : !hasResults ? (
							<motion.div
								key='no-results'
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3 }}>
								<EmptyState
									query={debouncedQuery}
									onSuggestionClick={handleSuggestionClick}
								/>
							</motion.div>
						) : (
							<motion.div
								key='results'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}>
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4 }}
									className='mb-8 flex flex-wrap items-center gap-4 justify-between p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl'>
									<div className='flex items-center gap-6'>
										<div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
											<div className='relative'>
												<div className='w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50'></div>
												<div className='absolute inset-0 w-3 h-3 bg-red-500/30 rounded-full animate-ping'></div>
											</div>
											<span className='font-semibold'>
												{movies.length} of {totalResults} results
											</span>
										</div>
										<div className='px-6 py-3 bg-gradient-to-r from-red-500/30 to-purple-500/30 backdrop-blur-sm text-red-600 dark:text-red-300 rounded-full text-sm font-bold border border-red-500/40 shadow-lg'>
											&ldquo;{debouncedQuery}&rdquo;
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<span className='text-sm text-gray-500 dark:text-gray-400 font-medium'>
											Sort by:
										</span>
										<select className='premium-select px-4 py-2 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300'>
											<option
												value='relevance'
												className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
												Relevance
											</option>
											<option
												value='year'
												className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
												Year
											</option>
											<option
												value='rating'
												className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
												Rating
											</option>
										</select>
									</div>
								</motion.div>

								{/* Genre Filtering Note */}
								{genre !== "all" && !isFiltering && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='mb-6 p-4 bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-500/10 dark:to-pink-500/10 backdrop-blur-sm rounded-xl border border-purple-200/50 dark:border-purple-500/20'>
										<div className='flex items-center gap-3'>
											<div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
												<Tag className='w-4 h-4 text-white' />
											</div>
											<div>
												<p className='text-sm font-medium text-purple-700 dark:text-purple-300'>
													Filtered by genre:{" "}
													{movieGenres.find((g) => g.value === genre)?.label}
												</p>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													Results are filtered client-side after fetching movie
													details
												</p>
											</div>
										</div>
									</motion.div>
								)}

								<MovieGrid movies={movies} />

								{/* Load More Button */}
								{hasNextPage && genre === "all" && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4 }}
										className='flex flex-col items-center mt-12 space-y-4'>
										{/* Enhanced Premium Progress Bar */}
										<div className='w-full max-w-lg'>
											<div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3'>
												<span className='font-semibold'>
													Content Loaded: {movies.length}
												</span>
												<span className='font-semibold'>
													Total Available: {totalResults}
												</span>
											</div>
											<div className='relative w-full bg-gray-300/50 dark:bg-gray-800/50 rounded-full h-3 backdrop-blur-sm border border-gray-400/30 dark:border-white/10 overflow-hidden'>
												<motion.div
													initial={{ width: 0 }}
													animate={{
														width: `${
															(movies.length / parseInt(totalResults)) * 100
														}%`,
													}}
													transition={{ duration: 0.8, ease: "easeOut" }}
													className='relative h-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-full shadow-lg'>
													{/* Shimmer effect */}
													<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse'></div>
												</motion.div>
												<div className='absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse'></div>
											</div>
											<div className='text-center mt-2 text-xs text-gray-500 font-medium'>
												{Math.round(
													(movies.length / parseInt(totalResults)) * 100
												)}
												% Complete
											</div>
										</div>

										<motion.button
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => fetchNextPage()}
											disabled={isFetchingNextPage}
											className='premium-button relative flex items-center gap-4 px-10 py-5 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'>
											{isFetchingNextPage ? (
												<>
													<motion.div
														animate={{ rotate: 360 }}
														transition={{
															duration: 1,
															repeat: Infinity,
															ease: "linear",
														}}
														className='relative'>
														<div className='w-6 h-6 border-3 border-white/30 border-t-white rounded-full'></div>
														<div className='absolute inset-0 w-6 h-6 border border-white/20 rounded-full animate-ping'></div>
													</motion.div>
													<span>Loading More Cinematic Content...</span>
												</>
											) : (
												<>
													<span>Load More Premium Content</span>
													<div className='flex items-center gap-2'>
														<span className='text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full'>
															+
															{Math.min(
																10,
																parseInt(totalResults) - movies.length
															)}{" "}
															more
														</span>
														<motion.div
															animate={{ y: [0, -3, 0] }}
															transition={{ duration: 1.5, repeat: Infinity }}>
															<div className='text-xl'>🎬</div>
														</motion.div>
													</div>
												</>
											)}
										</motion.button>
									</motion.div>
								)}

								{/* Enhanced Premium Results Summary */}
								{hasResults && !hasNextPage && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
										className='text-center mt-16 py-12 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl'>
										<div className='relative'>
											{/* Background decoration */}
											<div className='absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/5 to-blue-600/5 dark:from-red-600/10 dark:via-purple-600/10 dark:to-blue-600/10 rounded-2xl'></div>
											<div className='relative z-10'>
												<motion.div
													animate={{ scale: [1, 1.05, 1] }}
													transition={{ duration: 2, repeat: Infinity }}>
													<div className='text-6xl mb-4'>🎬✨</div>
												</motion.div>
												<h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
													Mission Accomplished!
												</h3>
												<p className='text-lg font-semibold mb-2 text-red-600 dark:text-red-400'>
													You&apos;ve explored all {movies.length} premium
													results!
												</p>
												<p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed'>
													Ready for your next cinematic adventure? Try refining
													your search or exploring different genres to discover
													more amazing content.
												</p>
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.3 }}
													className='mt-6 flex justify-center gap-3'>
													<div className='px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30'>
														<span className='text-emerald-600 dark:text-emerald-300 font-semibold text-sm'>
															🎯 Search Complete
														</span>
													</div>
													<div className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/30'>
														<span className='text-blue-600 dark:text-blue-300 font-semibold text-sm'>
															🔍 Ready for More
														</span>
													</div>
												</motion.div>
											</div>
										</div>
									</motion.div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</main>

			{/* Enhanced Premium Toast Notification */}
			<AnimatePresence>
				{showToast && (
					<motion.div
						initial={{ opacity: 0, y: 50, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 50, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className='fixed bottom-6 right-6 z-50'>
						<div className='bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl px-8 py-5 flex items-center gap-4 max-w-sm'>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
								className='relative'>
								<div className='w-6 h-6 border-2 border-red-500/30 border-t-red-500 rounded-full'></div>
								<div className='absolute inset-0 w-6 h-6 border border-red-500/20 rounded-full animate-ping'></div>
							</motion.div>
							<div className='flex-1'>
								<span className='text-gray-900 dark:text-white font-semibold text-base'>
									{toastMessage}
								</span>
								<div className='text-gray-600 dark:text-gray-400 text-sm mt-1'>
									Searching premium content...
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
