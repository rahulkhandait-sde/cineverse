"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Search } from "lucide-react";

interface LoadingSkeletonProps {
	type?: "search" | "details" | "grid";
	count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
	type = "search",
	count = 6,
}) => {
	if (type === "details") {
		return (
			<div className='animate-pulse'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Poster skeleton */}
					<div className='lg:col-span-1'>
						<div className='aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg'></div>
					</div>

					{/* Details skeleton */}
					<div className='lg:col-span-2 space-y-4'>
						<div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
						<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full'></div>
						<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full'></div>
						<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3'></div>

						<div className='grid grid-cols-2 gap-4 mt-6'>
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className='space-y-2'>
									<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
									<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (type === "grid") {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
				{Array.from({ length: count }).map((_, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className='bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden'>
						<div className='aspect-[2/3] bg-gradient-to-br from-gray-700/50 to-gray-800/50 relative'>
							<motion.div
								animate={{
									background: [
										"linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
										"linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
									],
								}}
								transition={{ duration: 1.5, repeat: Infinity }}
								className='absolute inset-0'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<motion.div
									animate={{ rotate: 360 }}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "linear",
									}}>
									<Film className='w-8 h-8 text-gray-500' />
								</motion.div>
							</div>
						</div>
						<div className='p-4'>
							<div className='h-4 bg-gray-600/50 rounded mb-2 shimmer'></div>
							<div className='h-3 bg-gray-700/50 rounded mb-2 shimmer'></div>
							<div className='h-3 bg-gray-700/50 rounded w-2/3 shimmer'></div>
						</div>
					</motion.div>
				))}
			</div>
		);
	}

	// Default search loading
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col items-center justify-center py-16 bg-black/10 backdrop-blur-sm rounded-3xl border border-white/10'>
			<div className='relative mb-6'>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className='w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full'
				/>
				<motion.div
					animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
					className='absolute inset-0 w-16 h-16 border-4 border-red-500/20 rounded-full'
				/>
			</div>
			<motion.h3
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1.5, repeat: Infinity }}
				className='text-xl font-semibold text-white mb-2'>
				Searching Movies...
			</motion.h3>
			<p className='text-gray-400'>Finding the perfect match for you</p>
		</motion.div>
	);
};

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
	title = "Something went wrong",
	message = "We couldn't load the movies. Please try again.",
	onRetry,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
			className='flex flex-col items-center justify-center py-16 px-6'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='mb-8'>
				<div className='relative'>
					<div className='w-20 h-20 rounded-full bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-4 border-red-100 dark:border-red-900 flex items-center justify-center mb-4'>
						<motion.div
							animate={{ rotate: [0, 10, -10, 0] }}
							transition={{ duration: 0.5, repeat: 2 }}>
							<span className='text-3xl'>😔</span>
						</motion.div>
					</div>
					<motion.div
						animate={{ scale: [1, 1.1, 1] }}
						transition={{ duration: 2, repeat: Infinity }}
						className='absolute -top-1 -right-1 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center border-2 border-red-200 dark:border-red-800'>
						<div className='w-2 h-2 bg-red-500 rounded-full'></div>
					</motion.div>
				</div>
			</motion.div>

			<div className='text-center max-w-md mb-8'>
				<h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3'>
					{title}
				</h3>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed mb-6'>
					{message}
				</p>
			</div>

			{onRetry && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onRetry}
					className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
						<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full'></div>
					</motion.div>
					Try Again
				</motion.button>
			)}
		</motion.div>
	);
};

export const EmptyState: React.FC<{
	query?: string;
	onSuggestionClick?: (suggestion: string) => void;
}> = ({ query, onSuggestionClick }) => {
	if (!query) {
		// Premium empty state (when no search query)
		return (
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className='relative'>
				{/* Premium background effects */}
				<div className='absolute inset-0 -z-10'>
					<div className='absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse'></div>
					<div className='absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000'></div>
					<div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-2000'></div>
				</div>

				<div className='premium-section rounded-3xl p-16 text-center relative overflow-hidden'>
					{/* Enhanced glassmorphism overlay */}
					<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/5'></div>
					<div className='absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5'></div>

					{/* Premium animated movie icons */}
					<div className='relative mb-12'>
						<motion.div
							animate={{
								rotate: 360,
								scale: [1, 1.05, 1],
							}}
							transition={{
								rotate: { duration: 20, repeat: Infinity, ease: "linear" },
								scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
							}}
							className='w-32 h-32 rounded-full border-4 border-dashed border-red-400/60 dark:border-red-500/60 flex items-center justify-center bg-gradient-to-br from-red-500/10 to-purple-500/10 backdrop-blur-sm shadow-2xl'>
							<motion.div
								animate={{ rotate: -360 }}
								transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
								className='w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
								<Film className='w-8 h-8 text-white drop-shadow-lg' />
							</motion.div>
						</motion.div>

						{/* Floating decoration elements */}
						<motion.div
							animate={{
								rotate: -360,
								y: [0, -10, 0],
								scale: [1, 1.1, 1],
							}}
							transition={{
								rotate: { duration: 15, repeat: Infinity, ease: "linear" },
								y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
								scale: {
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 0.5,
								},
							}}
							className='absolute -top-4 -right-4 w-16 h-16 rounded-full border-3 border-dashed border-purple-400/60 dark:border-purple-500/60 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm shadow-xl'>
							<div className='w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg'></div>
						</motion.div>

						<motion.div
							animate={{
								rotate: 360,
								x: [0, 8, 0],
								scale: [1, 1.2, 1],
							}}
							transition={{
								rotate: { duration: 25, repeat: Infinity, ease: "linear" },
								x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
								scale: {
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1,
								},
							}}
							className='absolute -bottom-4 -left-4 w-12 h-12 rounded-full border-2 border-dashed border-cyan-400/60 dark:border-cyan-500/60 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm shadow-lg'>
							<div className='w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg'></div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='text-center max-w-2xl mx-auto relative z-10'>
						<h3 className='text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight'>
							Ready to Explore?
						</h3>
						<p className='text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light'>
							Start your cinematic journey by searching for any movie, TV
							series, or episode above.
							<br />
							<span className='bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-semibold'>
								Discover new favorites and revisit classics!
							</span>
						</p>
					</motion.div>

					{/* Premium suggested searches */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className='flex flex-col items-center gap-6 relative z-10'>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
							className='text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3'>
							<div className='w-6 h-6 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center'>
								<Search className='w-3 h-3 text-white' />
							</div>
							Try searching for:
						</motion.span>
						<div className='flex flex-wrap gap-4 justify-center max-w-4xl'>
							{[
								{
									text: "Avengers",
									icon: "⚡",
									color: "from-red-500 to-orange-500",
								},
								{
									text: "Inception",
									icon: "🌀",
									color: "from-blue-500 to-purple-500",
								},
								{
									text: "The Office",
									icon: "📄",
									color: "from-green-500 to-teal-500",
								},
								{
									text: "Breaking Bad",
									icon: "⚗️",
									color: "from-yellow-500 to-red-500",
								},
								{
									text: "Interstellar",
									icon: "🌟",
									color: "from-purple-500 to-pink-500",
								},
							].map((suggestion, index) => (
								<motion.button
									key={suggestion.text}
									initial={{ opacity: 0, scale: 0.8, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
									whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => onSuggestionClick?.(suggestion.text)}
									className='group relative px-6 py-4 bg-white/90 dark:bg-black/60 backdrop-blur-2xl rounded-2xl border border-gray-200/50 dark:border-white/20 hover:border-gray-300/50 dark:hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl'>
									{/* Background gradient */}
									<div
										className={`absolute inset-0 bg-gradient-to-r ${suggestion.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

									{/* Shimmer effect */}
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse'></div>

									<span className='relative z-10 flex items-center gap-3 text-gray-900 dark:text-white font-semibold text-lg'>
										<span className='text-2xl'>{suggestion.icon}</span>
										{suggestion.text}
										<motion.span
											initial={{ opacity: 0, x: -10 }}
											whileHover={{ opacity: 1, x: 0 }}
											className='text-red-500 dark:text-red-400 font-bold'>
											→
										</motion.span>
									</span>

									{/* Premium glow effect */}
									<motion.div
										initial={{ scale: 0, opacity: 0 }}
										whileHover={{ scale: 1, opacity: 0.3 }}
										className={`absolute inset-0 bg-gradient-to-r ${suggestion.color} rounded-2xl blur-xl -z-10`}
									/>
								</motion.button>
							))}
						</div>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.5 }}
							className='text-sm text-gray-500 dark:text-gray-400 text-center max-w-lg leading-relaxed'>
							Click on any suggestion above to start exploring!
							<span className='text-red-500 dark:text-red-400 font-semibold'>
								Discover premium content from our vast collection.
							</span>
						</motion.p>
					</motion.div>

					{/* Premium bottom decoration */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, delay: 1.8 }}
						className='mt-16 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
						<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-red-500/20'>
							<div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
							<span className='font-semibold'>Premium API</span>
						</div>
						<div className='w-12 h-px bg-gradient-to-r from-gray-400 to-transparent dark:from-gray-600'></div>
						<span className='font-medium'>Powered by OMDb</span>
						<div className='w-12 h-px bg-gradient-to-l from-gray-400 to-transparent dark:from-gray-600'></div>
						<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full border border-blue-500/20'>
							<div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
							<span className='font-semibold'>Unlimited Access</span>
						</div>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	// Premium no results state (when search query returns no results)
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='relative'>
			{/* Background effects */}
			<div className='absolute inset-0 -z-10'>
				<div className='absolute top-10 left-1/3 w-64 h-64 bg-gradient-to-r from-red-500/15 to-purple-500/15 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse'></div>
				<div className='absolute bottom-10 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-1000'></div>
			</div>

			<div className='premium-section rounded-3xl p-12 text-center relative overflow-hidden'>
				{/* Glassmorphism overlay */}
				<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/5'></div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='mb-8'>
					<div className='relative mx-auto w-fit'>
						<div className='w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 dark:from-red-500/30 dark:to-purple-500/30 backdrop-blur-sm flex items-center justify-center mb-4 border border-red-500/30 dark:border-red-400/40'>
							<Search className='w-10 h-10 text-red-500 dark:text-red-400' />
						</div>
						<motion.div
							animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
							className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500/30 to-pink-500/30 dark:from-red-500/40 dark:to-pink-500/40 rounded-full flex items-center justify-center border border-red-500/40'>
							<div className='w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full'></div>
						</motion.div>
					</div>
				</motion.div>

				<div className='text-center max-w-2xl mx-auto relative z-10'>
					<h3 className='text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent'>
						No Premium Content Found
					</h3>
					<p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8'>
						We couldn&apos;t find any movies matching &ldquo;
						<span className='font-bold text-red-600 dark:text-red-400'>
							{query}
						</span>
						&rdquo; in our premium collection.
						<br />
						<span className='text-gray-500 dark:text-gray-400'>
							Try different keywords or explore our suggestions below.
						</span>
					</p>
				</div>

				{/* Premium search suggestions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='premium-section rounded-2xl p-8 max-w-2xl mx-auto'>
					<h4 className='text-xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center justify-center gap-3'>
						<div className='w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center'>
							<Search className='w-3 h-3 text-white' />
						</div>
						Premium Search Tips
					</h4>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
						<div className='p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20'>
							<div className='flex items-center gap-2 mb-2'>
								<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
								<span className='font-bold text-blue-600 dark:text-blue-300'>
									Keywords
								</span>
							</div>
							<span className='text-gray-600 dark:text-gray-400'>
								Try different or shorter terms
							</span>
						</div>
						<div className='p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20'>
							<div className='flex items-center gap-2 mb-2'>
								<div className='w-2 h-2 bg-purple-500 rounded-full'></div>
								<span className='font-bold text-purple-600 dark:text-purple-300'>
									Spelling
								</span>
							</div>
							<span className='text-gray-600 dark:text-gray-400'>
								Check for typos in your search
							</span>
						</div>
						<div className='p-4 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl border border-cyan-500/20'>
							<div className='flex items-center gap-2 mb-2'>
								<div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
								<span className='font-bold text-cyan-600 dark:text-cyan-300'>
									Filters
								</span>
							</div>
							<span className='text-gray-600 dark:text-gray-400'>
								Use year and genre filters
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
