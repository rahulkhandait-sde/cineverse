"use client";

import React, {
	useState,
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Search,
	Calendar,
	Filter,
	X,
	Star,
	TrendingUp,
	Film,
	Sparkles,
} from "lucide-react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	year: string;
	genre: string;
	onYearChange: (year: string) => void;
	onGenreChange: (genre: string) => void;
	onClearFilters: () => void;
}

export interface SearchBarRef {
	focus: () => void;
	blur: () => void;
}

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

const popularSearches = [
	{ text: "Marvel", icon: "⚡", color: "from-red-500 to-orange-500" },
	{ text: "Harry Potter", icon: "⚡", color: "from-purple-500 to-pink-500" },
	{ text: "Star Wars", icon: "⭐", color: "from-blue-500 to-purple-500" },
	{ text: "Batman", icon: "🦇", color: "from-gray-700 to-gray-900" },
	{ text: "Spider-Man", icon: "🕷️", color: "from-red-600 to-blue-600" },
	{ text: "The Avengers", icon: "🛡️", color: "from-green-500 to-blue-500" },
	{ text: "Game of Thrones", icon: "🐉", color: "from-yellow-600 to-red-600" },
	{ text: "Breaking Bad", icon: "⚗️", color: "from-green-600 to-yellow-500" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
	function SearchBar(
		{
			value,
			onChange,
			placeholder = "Search for movies, TV series, episodes...",
			year,
			genre,
			onYearChange,
			onGenreChange,
			onClearFilters,
		},
		ref
	) {
		const [isFocused, setIsFocused] = useState(false);
		const [showSuggestions, setShowSuggestions] = useState(false);
		const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);
		const containerRef = useRef<HTMLDivElement>(null);

		const hasActiveFilters = year !== "" || genre !== "all";

		// Expose focus and blur methods to parent components
		useImperativeHandle(ref, () => ({
			focus: () => {
				inputRef.current?.focus();
				setIsFocused(true);
				if (!value.trim()) {
					setShowSuggestions(true);
				}
			},
			blur: () => {
				inputRef.current?.blur();
				setIsFocused(false);
				setShowSuggestions(false);
			},
		}));

		// Close suggestions when clicking outside
		useEffect(() => {
			function handleClickOutside(event: MouseEvent) {
				if (
					containerRef.current &&
					!containerRef.current.contains(event.target as Node)
				) {
					setShowSuggestions(false);
					setIsFiltersExpanded(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}, []);

		const handleSuggestionClick = (suggestion: string) => {
			onChange(suggestion);
			setShowSuggestions(false);
			inputRef.current?.focus();
		};

		const handleInputFocus = () => {
			setIsFocused(true);
			if (!value.trim()) {
				setShowSuggestions(true);
			}
		};

		const handleInputBlur = () => {
			setIsFocused(false);
			// Delay hiding suggestions to allow clicks
			setTimeout(() => setShowSuggestions(false), 150);
		};

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			onChange(newValue);
			setShowSuggestions(newValue.trim().length === 0);
		};

		return (
			<motion.div
				ref={containerRef}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='relative w-full max-w-4xl mx-auto mb-12'>
				{/* Main Search Container */}
				<div className='relative'>
					{/* Background Effects */}
					<div className='absolute inset-0 -z-10'>
						<div className='absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl' />
						<div className='absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl animate-pulse' />
					</div>

					{/* Premium Search Bar */}
					<motion.div
						className={`relative bg-white/95 dark:bg-black/70 backdrop-blur-3xl border-2 transition-all duration-500 rounded-3xl shadow-2xl overflow-hidden ${
							isFocused
								? "border-red-500/60 shadow-red-500/25 dark:shadow-red-500/20 shadow-2xl"
								: "border-gray-200/60 dark:border-white/20 hover:border-gray-300/60 dark:hover:border-white/30"
						}`}
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}>
						{/* Enhanced animated background shimmer */}
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse' />
						<div className='absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5' />

						{/* Glassmorphism overlay */}
						<div className='absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/5' />

						{/* Premium glow effect */}
						{isFocused && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='absolute -inset-1 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-lg -z-10'
							/>
						)}

						<div className='relative flex items-center p-6'>
							{/* Search Icon */}
							<motion.div
								className='flex-shrink-0 mr-6'
								animate={{
									scale: isFocused ? 1.1 : 1,
									rotate: isFocused ? 5 : 0,
								}}
								transition={{ duration: 0.3 }}>
								<div className='relative'>
									<Search className='w-7 h-7 text-red-500 dark:text-red-400' />
									{isFocused && (
										<motion.div
											initial={{ scale: 0.8, opacity: 0 }}
											animate={{ scale: 1.2, opacity: 0.5 }}
											className='absolute inset-0 w-7 h-7 text-red-500 dark:text-red-400'>
											<Search className='w-7 h-7' />
										</motion.div>
									)}
								</div>
							</motion.div>

							{/* Search Input */}
							<div className='flex-1 relative'>
								<input
									ref={inputRef}
									type='text'
									value={value}
									onChange={handleInputChange}
									onFocus={handleInputFocus}
									onBlur={handleInputBlur}
									placeholder={placeholder}
									className='w-full bg-transparent text-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none selection:bg-red-500/20 selection:text-red-900 dark:selection:text-red-100'
								/>

								{/* Enhanced focus glow */}
								{isFocused && (
									<motion.div
										initial={{ scaleX: 0, opacity: 0 }}
										animate={{ scaleX: 1, opacity: 1 }}
										className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full'
									/>
								)}

								{/* Premium typing indicator */}
								{value && (
									<motion.div
										initial={{ opacity: 0, scale: 0.8, x: 20 }}
										animate={{ opacity: 1, scale: 1, x: 0 }}
										className='absolute right-0 top-1/2 -translate-y-1/2'>
										<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 dark:from-red-500/30 dark:via-purple-500/30 dark:to-blue-500/30 rounded-full border border-red-500/30 dark:border-red-400/40 backdrop-blur-sm'>
											<motion.div
												animate={{ scale: [1, 1.2, 1] }}
												transition={{ repeat: Infinity, duration: 1.5 }}
												className='w-2 h-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full'
											/>
											<span className='text-sm text-red-600 dark:text-red-400 font-bold tracking-wide'>
												AI Searching...
											</span>
										</div>
									</motion.div>
								)}
							</div>

							{/* Enhanced Filter Toggle Button */}
							<motion.button
								onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
								className='flex-shrink-0 ml-6 p-4 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 dark:from-purple-500/30 dark:via-blue-500/30 dark:to-indigo-500/30 hover:from-purple-500/30 hover:via-blue-500/30 hover:to-indigo-500/30 backdrop-blur-2xl rounded-2xl border border-purple-500/40 dark:border-purple-400/40 transition-all duration-300 group shadow-lg hover:shadow-purple-500/25'
								whileHover={{ scale: 1.05, rotate: 3 }}
								whileTap={{ scale: 0.95 }}>
								<div className='relative'>
									<Filter className='w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors drop-shadow-sm' />
									{hasActiveFilters && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className='absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white dark:border-black shadow-lg'>
											<motion.div
												animate={{ scale: [1, 1.2, 1] }}
												transition={{ repeat: Infinity, duration: 2 }}
												className='w-full h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full'
											/>
										</motion.div>
									)}
								</div>
							</motion.button>

							{/* Clear Search Button */}
							{value && (
								<motion.button
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									onClick={() => onChange("")}
									className='flex-shrink-0 ml-3 p-2 hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-xl transition-colors'
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}>
									<X className='w-5 h-5 text-gray-500 dark:text-gray-400' />
								</motion.button>
							)}
						</div>

						{/* Expanded Filters */}
						<AnimatePresence>
							{isFiltersExpanded && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className='border-t border-gray-200/50 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm'>
									<div className='p-6 space-y-6'>
										{/* Filter Header */}
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-3'>
												<div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
													<Sparkles className='w-4 h-4 text-white' />
												</div>
												<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
													Premium Filters
												</h3>
											</div>
											{hasActiveFilters && (
												<motion.button
													onClick={onClearFilters}
													className='px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors'
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}>
													Clear All
												</motion.button>
											)}
										</div>

										{/* Filter Controls */}
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* Year Filter */}
											<div className='space-y-3'>
												<label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
													<Calendar className='w-4 h-4 text-blue-500' />
													Release Year
												</label>
												<div className='relative'>
													<select
														value={year}
														onChange={(e) => onYearChange(e.target.value)}
														className='premium-select w-full px-4 py-3 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'>
														<option value=''>Any Year</option>
														{years.map((y) => (
															<option key={y} value={y.toString()}>
																{y}
															</option>
														))}
													</select>
													{year && (
														<motion.div
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															className='absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full'
														/>
													)}
												</div>
											</div>

											{/* Genre Filter */}
											<div className='space-y-3'>
												<label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
													<Film className='w-4 h-4 text-purple-500' />
													Genre
												</label>
												<div className='relative'>
													<select
														value={genre}
														onChange={(e) => onGenreChange(e.target.value)}
														className='premium-select w-full px-4 py-3 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300'>
														{movieGenres.map((g) => (
															<option key={g.value} value={g.value}>
																{g.label}
															</option>
														))}
													</select>
													{genre !== "all" && (
														<motion.div
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															className='absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full'
														/>
													)}
												</div>
											</div>
										</div>

										{/* Active Filters Display */}
										{hasActiveFilters && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												className='flex flex-wrap gap-3 pt-4 border-t border-gray-200/50 dark:border-white/10'>
												{year && (
													<div className='flex items-center gap-2 px-4 py-2 bg-blue-500/20 dark:bg-blue-500/30 rounded-full'>
														<Calendar className='w-4 h-4 text-blue-600 dark:text-blue-400' />
														<span className='text-sm font-semibold text-blue-700 dark:text-blue-300'>
															{year}
														</span>
													</div>
												)}
												{genre !== "all" && (
													<div className='flex items-center gap-2 px-4 py-2 bg-purple-500/20 dark:bg-purple-500/30 rounded-full'>
														<Film className='w-4 h-4 text-purple-600 dark:text-purple-400' />
														<span className='text-sm font-semibold text-purple-700 dark:text-purple-300'>
															{
																movieGenres.find((g) => g.value === genre)
																	?.label
															}
														</span>
													</div>
												)}
											</motion.div>
										)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					{/* Popular Suggestions Dropdown */}
					<AnimatePresence>
						{showSuggestions && (
							<motion.div
								initial={{ opacity: 0, y: 10, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								className='absolute top-full left-0 right-0 mt-4 z-50'>
								<div className='bg-white/95 dark:bg-black/80 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden'>
									{/* Suggestions Header */}
									<div className='px-6 py-4 border-b border-gray-200/50 dark:border-white/10 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5'>
										<div className='flex items-center gap-3'>
											<div className='w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center'>
												<TrendingUp className='w-4 h-4 text-white' />
											</div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
												Trending Searches
											</h3>
										</div>
										<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
											Discover what&apos;s popular right now
										</p>
									</div>

									{/* Suggestions Grid */}
									<div className='p-6'>
										<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
											{popularSearches.map((search, index) => (
												<motion.button
													key={search.text}
													onClick={() => handleSuggestionClick(search.text)}
													className={`group relative p-4 bg-gradient-to-r ${search.color} bg-opacity-10 hover:bg-opacity-20 dark:bg-opacity-20 dark:hover:bg-opacity-30 rounded-xl border border-white/20 dark:border-white/10 transition-all duration-300 overflow-hidden`}
													whileHover={{ scale: 1.02, y: -2 }}
													whileTap={{ scale: 0.98 }}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: index * 0.05 }}>
													{/* Background glow effect */}
													<div
														className={`absolute inset-0 bg-gradient-to-r ${search.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
													/>

													<div className='relative flex flex-col items-center gap-2'>
														<div className='text-2xl'>{search.icon}</div>
														<span className='text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight'>
															{search.text}
														</span>
													</div>

													{/* Hover shine effect */}
													<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12' />
												</motion.button>
											))}
										</div>
									</div>

									{/* Footer */}
									<div className='px-6 py-4 border-t border-gray-200/50 dark:border-white/10 bg-gray-50/80 dark:bg-white/5'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
												<Star className='w-4 h-4 text-yellow-500' />
												<span>Premium content database</span>
											</div>
											<div className='text-xs text-gray-500 dark:text-gray-500'>
												Press ESC to close
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		);
	}
);
