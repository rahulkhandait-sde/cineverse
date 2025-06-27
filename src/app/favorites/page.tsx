"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Calendar, Film } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
	// This would typically come from a state management system or API
	const favorites = [];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-32 pb-16">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-purple-600/20 to-blue-600/20" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
				</div>
				
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="mb-8"
					>
						<div className="inline-flex items-center gap-3 mb-6">
							<div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
								<Heart className="w-8 h-8 text-white" />
							</div>
							<h1 className="text-5xl md:text-6xl font-bold text-white">
								Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Favorites</span>
							</h1>
						</div>
						<p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
							Your personally curated collection of movies you love
						</p>
					</motion.div>
				</div>
			</section>

			{/* Content Section */}
			<section className="relative py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{favorites.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-center py-16"
						>
							<div className="max-w-md mx-auto">
								<div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
									<Heart className="w-16 h-16 text-red-400" />
								</div>
								<h3 className="text-2xl font-bold text-white mb-4">
									No favorites yet
								</h3>
								<p className="text-gray-400 mb-8 leading-relaxed">
									Start adding movies to your favorites by exploring our collection and clicking the heart icon on movies you love.
								</p>
								<Link href="/movies">
									<motion.button
										whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.4)" }}
										whileTap={{ scale: 0.95 }}
										className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
									>
										<Film className="w-5 h-5" />
										Explore Movies
									</motion.button>
								</Link>
							</div>
						</motion.div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{/* This would render favorite movie cards */}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
