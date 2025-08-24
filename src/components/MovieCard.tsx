"use client";

import React, { useState, useEffect } from "react";
import { Movie } from "../types/movie";
import { Card, CardContent } from "./ui/Card";
import { StarRating } from "./ui/StarRating";
import { WatchlistButton } from "./WatchlistButton";
import { Calendar, Film, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocalStorage } from "../hooks/useDebounce";
import { ShareButton } from "./ShareButton";

interface MovieCardProps {
	movie: Movie;
	index: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
	const [userRatings, setUserRatings] = useLocalStorage<
		Array<{ movieId: string; rating: number }>
	>("userRatings", []);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [imageError, setImageError] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);
	const [retryCount, setRetryCount] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const userRating = isHydrated
		? userRatings.find((r) => r.movieId === movie.imdbID)?.rating || 0
		: 0;

	const handleRating = (rating: number) => {
		const existingIndex = userRatings.findIndex(
			(r) => r.movieId === movie.imdbID
		);
		const newRatings = [...userRatings];

		if (existingIndex >= 0) {
			newRatings[existingIndex] = { movieId: movie.imdbID, rating };
		} else {
			newRatings.push({ movieId: movie.imdbID, rating });
		}

		setUserRatings(newRatings);
	};

	// Generate fallback poster URL using movie title
	const getFallbackPosterUrl = (title: string) => {
		const encodedTitle = encodeURIComponent(title);
		return `https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodedTitle}`;
	};

	const handleImageError = () => {
		if (retryCount < 2) {
			// Retry loading the image
			setRetryCount(prev => prev + 1);
			setIsImageLoading(true);
			setImageError(false);
			// Force a re-render to retry the image
			setTimeout(() => {
				const img = new window.Image();
				img.onload = () => {
					setIsImageLoading(false);
					setImageError(false);
				};
				img.onerror = () => {
					setImageError(true);
					setIsImageLoading(false);
				};
				img.src = movie.Poster;
			}, 1000);
		} else {
			setImageError(true);
			setIsImageLoading(false);
		}
	};

	const handleCardClick = () => {
		setIsNavigating(true);
		// Reset the loading state after a short delay to prevent infinite loading
		// The actual navigation is handled by Next.js Link component
		setTimeout(() => {
			setIsNavigating(false);
		}, 800);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{
				opacity: 1,
				y: 0,
				scale: isNavigating ? 0.98 : 1,
				filter: isNavigating ? "brightness(0.9)" : "brightness(1)",
			}}
			transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
			whileHover={{ y: -8, transition: { duration: 0.3 } }}
			className='h-full group relative movie-card-hover'>
			{/* Global loading overlay for entire card */}
			{isNavigating && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl z-40 flex items-center justify-center'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.3 }}
						className='premium-toast rounded-2xl p-4 shadow-2xl border border-white/20'>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
							className='relative'>
							<div className='w-8 h-8 border-3 border-red-500/30 border-t-red-500 rounded-full'></div>
							<div className='absolute inset-0 w-8 h-8 border border-red-500/20 rounded-full animate-ping'></div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}

			<Card
				className={`overflow-hidden h-full movie-card-hover shadow-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-red-500/50 transition-all duration-500 flex flex-col ${
					isNavigating
						? "ring-2 ring-red-400/50 ring-offset-2 ring-offset-black"
						: ""
				}`}>
				<div className='aspect-[2/3] relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden flex-shrink-0'>
					{movie.Poster && movie.Poster !== "N/A" && !imageError ? (
						<>
							{isImageLoading && (
								<div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}>
										<Film className='w-8 h-8 text-blue-500' />
									</motion.div>
									{retryCount > 0 && (
										<div className='absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
											Retry {retryCount}/2
										</div>
									)}
								</div>
							)}
							<Image
								src={movie.Poster}
								alt={movie.Title}
								fill
								className='object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110'
								onLoad={() => setIsImageLoading(false)}
								onError={handleImageError}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								priority={index < 6} // Prioritize first 6 images
							/>
							{/* Gradient overlay */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						</>
					) : movie.Poster && movie.Poster !== "N/A" && imageError ? (
						// Try fallback poster
						<>
							{isImageLoading && (
								<div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950'>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}>
										<Film className='w-8 h-8 text-blue-500' />
									</motion.div>
									<div className='absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
										Fallback
									</div>
								</div>
							)}
							<Image
								src={getFallbackPosterUrl(movie.Title)}
								alt={movie.Title}
								fill
								className='object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110'
								onLoad={() => setIsImageLoading(false)}
								onError={() => {
									setImageError(true);
									setIsImageLoading(false);
								}}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
							{/* Gradient overlay */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						</>
					) : (
						<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 dark:from-red-900/30 dark:via-purple-900/30 dark:to-blue-900/30 relative overflow-hidden'>
							{/* Animated background pattern */}
							<div className='absolute inset-0 opacity-10'>
								<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 animate-pulse'></div>
								<div className='absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl animate-ping'></div>
							</div>
							
							<div className='text-center p-6 relative z-10'>
								<div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl'>
									<Film className='w-10 h-10 text-white' />
								</div>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
									{movie.Title}
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-300 font-medium'>
									{movie.Year} • {movie.Type}
								</p>
								<div className='mt-3 flex items-center justify-center gap-1'>
									{[1, 2, 3, 4, 5].map((star) => (
										<div key={star} className='w-2 h-2 bg-yellow-400 rounded-full opacity-60'></div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Hover overlay with enhanced styling */}
					<motion.div
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
						className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center opacity-0 transition-all duration-300'>
						<Link href={`/movies/${movie.imdbID}`} onClick={handleCardClick}>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md text-gray-900 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20'>
								{isNavigating ? (
									<>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												ease: "linear",
											}}>
											<div className='w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full'></div>
										</motion.div>
										Loading...
									</>
								) : (
									<>
										<Eye className='w-5 h-5' />
										View Details
									</>
								)}
							</motion.button>
						</Link>
					</motion.div>

					{/* Rating badge */}
					{isHydrated && userRating > 0 && (
						<div className='absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg'>
							⭐ {userRating}
						</div>
					)}

					{/* Watchlist button */}
					<div className='absolute top-3 left-3'>
						<WatchlistButton movie={movie} size="sm" />
					</div>
					<div className='absolute top-1 right-3'>
						<ShareButton movie={movie} size="sm"/>
					</div>
					{/* Enhanced Loading Overlay */}
					{isNavigating && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-sm flex flex-col items-center justify-center z-30'>
							{/* Main loading spinner */}
							<motion.div
								initial={{ scale: 0, rotate: 0 }}
								animate={{ scale: 1, rotate: 360 }}
								transition={{
									scale: { duration: 0.4, ease: "backOut" },
									rotate: { duration: 2, repeat: Infinity, ease: "linear" },
								}}
								className='bg-white/95 dark:bg-gray-800/95 rounded-full p-4 shadow-2xl border border-white/30 backdrop-blur-md mb-3'>
								<motion.div
									animate={{ rotate: -360 }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: "linear",
									}}
									className='relative'>
									<Film className='w-8 h-8 text-blue-600 dark:text-blue-400' />
									<motion.div
										animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
										transition={{ duration: 1.2, repeat: Infinity }}
										className='absolute inset-0 bg-blue-400/20 rounded-full blur-sm'></motion.div>
								</motion.div>
							</motion.div>

							{/* Loading text */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className='text-center'>
								<motion.p
									animate={{ opacity: [0.7, 1, 0.7] }}
									transition={{ duration: 1.5, repeat: Infinity }}
									className='text-sm font-medium text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm'>
									Loading Details...
								</motion.p>
							</motion.div>

							{/* Animated dots */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								className='flex space-x-1 mt-2'>
								{[0, 1, 2].map((i) => (
									<motion.div
										key={i}
										animate={{
											scale: [1, 1.5, 1],
											opacity: [0.3, 1, 0.3],
										}}
										transition={{
											duration: 1,
											repeat: Infinity,
											delay: i * 0.2,
										}}
										className='w-2 h-2 bg-blue-500 rounded-full'></motion.div>
								))}
							</motion.div>
						</motion.div>
					)}
				</div>

				<CardContent className='p-5 flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t-0'>
					<div className='flex-1'>
						<Link href={`/movies/${movie.imdbID}`} onClick={handleCardClick}>
							<h3 className='font-bold text-lg mb-3 line-clamp-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer leading-tight'>
								{movie.Title}
							</h3>
						</Link>

						<div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4'>
							<div className='flex items-center gap-1'>
								<Calendar className='h-4 w-4' />
								<span className='font-medium'>{movie.Year}</span>
							</div>
							<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700'>
								{movie.Type.toUpperCase()}
							</span>
						</div>
					</div>

					<div className='mt-auto pt-4 border-t border-gray-100 dark:border-gray-700'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								Your Rating:
							</span>
							{isHydrated ? (
								<StarRating
									rating={userRating}
									onRatingChange={handleRating}
									size='sm'
								/>
							) : (
								<div className='flex gap-1'>
									{[1, 2, 3, 4, 5].map((star) => (
										<div key={star} className='w-4 h-4 border border-gray-300 rounded-sm'></div>
									))}
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};
