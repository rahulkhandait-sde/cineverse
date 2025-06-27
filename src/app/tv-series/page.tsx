"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tv, Star, Calendar, Play } from "lucide-react";
import Link from "next/link";

export default function TVSeriesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-32 pb-16">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
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
							<div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
								<Tv className="w-8 h-8 text-white" />
							</div>
							<h1 className="text-5xl md:text-6xl font-bold text-white">
								TV <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Series</span>
							</h1>
						</div>
						<p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
							Discover amazing TV series and shows from around the world
						</p>
					</motion.div>
				</div>
			</section>

			{/* Content Section */}
			<section className="relative py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-center py-16"
					>
						<div className="max-w-md mx-auto">
							<div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
								<Tv className="w-16 h-16 text-blue-400" />
							</div>
							<h3 className="text-2xl font-bold text-white mb-4">
								TV Series Coming Soon
							</h3>
							<p className="text-gray-400 mb-8 leading-relaxed">
								We're working on adding TV series functionality to CineVerse. For now, you can search for series in the main movies section.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/movies">
									<motion.button
										whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
										whileTap={{ scale: 0.95 }}
										className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
									>
										<Play className="w-5 h-5" />
										Search All Content
									</motion.button>
								</Link>
							</div>
							
							{/* Feature Preview */}
							<div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
								<h4 className="text-lg font-semibold text-white mb-4">
									Upcoming Features
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
									<div className="flex items-center gap-3 text-gray-300">
										<div className="w-2 h-2 rounded-full bg-blue-400"></div>
										<span>Series-specific search</span>
									</div>
									<div className="flex items-center gap-3 text-gray-300">
										<div className="w-2 h-2 rounded-full bg-cyan-400"></div>
										<span>Episode tracking</span>
									</div>
									<div className="flex items-center gap-3 text-gray-300">
										<div className="w-2 h-2 rounded-full bg-purple-400"></div>
										<span>Season information</span>
									</div>
									<div className="flex items-center gap-3 text-gray-300">
										<div className="w-2 h-2 rounded-full bg-pink-400"></div>
										<span>Watchlist management</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
