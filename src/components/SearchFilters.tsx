"use client";

import React from "react";
import { Filter, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFiltersProps {
	year: string;
	genre: string;
	onYearChange: (year: string) => void;
	onGenreChange: (genre: string) => void;
	onClearFilters: () => void;
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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

export const SearchFilters: React.FC<SearchFiltersProps> = ({
	year,
	genre,
	onYearChange,
	onGenreChange,
	onClearFilters,
}) => {
	const hasActiveFilters = year !== "" || genre !== "all";

	return (
		<div className='mb-6'>
			{/* Compact Single Line Filters */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='flex flex-wrap items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm'>
				{/* Year Filter */}
				<div className='flex items-center gap-2'>
					<Calendar className='w-4 h-4 text-gray-500 dark:text-gray-400' />
					<select
						value={year}
						onChange={(e) => onYearChange(e.target.value)}
						className='px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 min-w-[120px]'>
						<option value=''>Any Year</option>
						{years.map((y) => (
							<option key={y} value={y.toString()}>
								{y}
							</option>
						))}
					</select>
				</div>

				{/* Genre Filter */}
				<div className='flex items-center gap-2'>
					<Tag className='w-4 h-4 text-gray-500 dark:text-gray-400' />
					<select
						value={genre}
						onChange={(e) => onGenreChange(e.target.value)}
						className='px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 min-w-[140px]'>
						{movieGenres.map((genreOption) => (
							<option key={genreOption.value} value={genreOption.value}>
								{genreOption.label}
							</option>
						))}
					</select>
				</div>

				{/* Active Filters Display */}
				{hasActiveFilters && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						className='flex items-center gap-2 ml-2'>
						{year && (
							<span className='px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium border border-amber-200 dark:border-amber-700/50'>
								📅 {year}
							</span>
						)}
						{genre !== "all" && (
							<span className='px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700/50'>
								🎭 {movieGenres.find((g) => g.value === genre)?.label}
							</span>
						)}
					</motion.div>
				)}

				{/* Clear Filters Button */}
				{hasActiveFilters && (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={onClearFilters}
						className='ml-auto px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 flex items-center gap-2'>
						<Filter className='w-3 h-3' />
						Clear
					</motion.button>
				)}
			</motion.div>
		</div>
	);
};
