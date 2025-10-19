// src/app/genres/page.tsx

"use client";

import React, { useState } from "react";
import { Header } from "../../components/Header";
import { motion } from "framer-motion";
import Link from "next/link";
import { Tag, Search } from "lucide-react"; // Import Search icon

// A predefined list of genres for users to browse.
const movieGenres = [
	{ value: "Action", label: "Action" },
	{ value: "Adventure", label: "Adventure" },
	{ value: "Animation", label: "Animation" },
	{ value: "Biography", label: "Biography" },
	{ value: "Comedy", label: "Comedy" },
	{ value: "Crime", label: "Crime" },
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

const GenresPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	// Filter genres based on the search term
	const filteredGenres = movieGenres.filter((genre) =>
		genre.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		// Reusing the same themed background from your other pages
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
			<div className='absolute inset-0 opacity-10 dark:opacity-5'>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_40%,_rgba(120,200,255,0.3),_transparent_50%)]'></div>
			</div>

			{/* Reusing your Header component for consistency */}
			<Header
				onSearchClick={() => {
					/* No search functionality on this page */
				}}
			/>

			<main className='container mx-auto px-6 pt-32 pb-16 relative z-10'>
				<div className='text-center mb-16'>
					<h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-black mb-8 leading-tight drop-shadow-xl transform transition-transform duration-100 hover:rotate-2 hover:scale-105'>
								<span className='block bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] dark:from-[#a855f7] dark:to-[#06b6d4] bg-clip-text text-transparent'>
									
						Explore by Genre</span>
					</h1>
					<p className='text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8'>
						Find your next favorite story, tailored to your mood.
					</p>
				</div>

				{/* Genre Search Bar */}
				
				<div className="relative w-full mb-10">
				<div className="flex items-center w-full rounded-full bg-gradient-to-r from-white/80 to-white/60 dark:from-black/100 dark:to-black/100 border-[2px] border-gray-300 focus-within:ring-4 focus-within:ring-red-500/30 focus-within:border-transparent transition-all duration-300 shadow-[0_20px_30px_rgba(255,0,0,0.1)] hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] backdrop-blur-sm">
					
					<svg
					xmlns="http://www.w3.org/2000/svg"
					className="ml-4 w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
					/>
					</svg>

					<input
					type="text"
					placeholder="Search genres..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-3 pr-5 py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg font-semibold rounded-full"
					/>
				</div>
				</div>


				{/* A grid that dynamically displays a card for each genre in the list */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
					{filteredGenres.length > 0 ? (
						filteredGenres.map((genre, index) => (
							<motion.div
								key={genre.value}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.05 }}>
								{/* Update Link to navigate to /movies with genre query param */}
								<Link
									href={`/movies?genre=${genre.value}`}
									className='block group'>
									<div className='relative p-8 h-full bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 hover:border-red-500/50 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-red-500/10'>
										<div className='flex flex-col items-center justify-center text-center'>
											<div className='mb-4 p-4 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-300'>
												<Tag className='w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors' />
											</div>
											<h3 className='font-bold text-lg text-gray-900 dark:text-white'>
												{genre.label}
											</h3>
										</div>
										<div className='absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
									</div>
								</Link>
							</motion.div>
						))
					) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='col-span-full text-center py-10'>
							<h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-300'>
								No genres found for &quot;{searchTerm}&quot;
							</h2>
							<p className='mt-2 text-gray-500 dark:text-gray-400'>
								Try a different search term or browse the full list.
							</p>
						</motion.div>
					)}
				</div>
			</main>
		</motion.div>
	);
};

export default GenresPage;
