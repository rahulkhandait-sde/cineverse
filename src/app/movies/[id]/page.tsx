"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
	setMovieDetails,
	addUserRating,
	setLoading,
	setError,
} from "../../../store/movieSlice";
import { addMovieToCompare } from "@/store/compareMovieSlice";
import { movieApi } from "../../../services/movieApi";
import { Header } from "../../../components/Header";
import { Button } from "../../../components/ui/Button";
import { StarRating } from "../../../components/ui/StarRating";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Globe,
	Award,
	Users,
	Film,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocalStorage } from "../../../hooks/useDebounce";

export default function MovieDetailsPage() {
	const params = useParams();
	const router = useRouter();
	const dispatch = useDispatch();
	const movieId = params.id as string;
	const compareMovies = useSelector (
		(state:RootState) => state.compare.compareMovies
	);
	const { movieDetails, loading, error } = useSelector(
		(state: RootState) => state.movies
	);
	const [userRatings, setUserRatings] = useLocalStorage<
		Array<{ movieId: string; rating: number }>
	>("userRatings", []);
	const [isImageLoading, setIsImageLoading] = useState(true);

	const movie = movieDetails[movieId];
	const userRating =
		userRatings.find((r) => r.movieId === movieId)?.rating || 0;

	useEffect(() => {
		const fetchMovieDetails = async () => {
			dispatch(setLoading(true));
			dispatch(setError(null));

			try {
				const details = await movieApi.getMovieDetails(movieId);
				if (details.Response === "True") {
					dispatch(setMovieDetails({ id: movieId, details }));
					console.log(details);
				} else {
					dispatch(setError("Movie not found"));
				}
			} catch {
				dispatch(setError("Failed to fetch movie details"));
			} finally {
				dispatch(setLoading(false));
			}
		};

		if (!movie && movieId) {
			fetchMovieDetails();
		}
	}, [movieId, movie, dispatch]);

	// Update document title dynamically based on movie
	useEffect(() => {
		if (movie?.Title) {
			document.title = `${movie.Title} (${movie.Year}) | Movie Details | CineVerse`;
		} else if (loading) {
			document.title = "Loading Movie Details | CineVerse";
		} else if (error) {
			document.title = "Movie Not Found | CineVerse";
		} else {
			document.title = "Movie Details | CineVerse";
		}
	}, [movie, loading, error]);

	const handleRatingChange = (rating: number) => {
		const newRating = { movieId, rating };
		dispatch(addUserRating(newRating));

		const updatedRatings = userRatings.filter((r) => r.movieId !== movieId);
		updatedRatings.push(newRating);
		setUserRatings(updatedRatings);
	};
	const handleAddMovie =async () =>{
		dispatch(setLoading(true));
		dispatch(setError(null));
		try {
			const details = await movieApi.getMovieDetails(movieId);
			if (details.Response === "True") {
				dispatch(addMovieToCompare(details));
			} else {
				dispatch(setError("Movie not found"));
			}
		} catch {
			dispatch(setError("Failed to fetch movie details"));
		} finally {
			dispatch(setLoading(false));
			}
		}
	
	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-10 dark:opacity-5'>
					<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
					<div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
				</div>
				<Header />
				<div className='container mx-auto px-4 py-8 pt-32'>
					<div className='flex justify-center items-center min-h-[60vh]'>
						<div className='premium-section rounded-3xl p-12 text-center'>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								className='w-16 h-16 mx-auto mb-6 border-4 border-red-500/30 border-t-red-500 rounded-full'></motion.div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
								Loading Premium Content...
							</h2>
							<p className='text-gray-600 dark:text-gray-400'>
								Preparing your cinematic experience
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error || !movie) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-10 dark:opacity-5'>
					<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
					<div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
				</div>
				<Header />
				<div className='container mx-auto px-4 py-8 pt-32'>
					<div className='text-center py-12'>
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className='premium-section rounded-3xl p-12 max-w-2xl mx-auto'>
							<div className='text-8xl mb-6'>🎬</div>
							<h1 className='text-3xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent'>
								Movie Not Found
							</h1>
							<p className='text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed'>
								{error ||
									"The cinematic experience you are looking for could not be found in our premium collection."}
							</p>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Button
									onClick={() => router.push("/movies")}
									className='premium-button px-8 py-4 text-white font-bold text-lg rounded-2xl shadow-2xl'>
									<ArrowLeft className='w-5 h-5 mr-3' />
									Back to Premium Collection
								</Button>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-10 dark:opacity-5'>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
				<div className='absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_40%,_rgba(120,200,255,0.3),_transparent_50%)]'></div>
			</div>

			<Header />
			<main className='container mx-auto px-4 py-8 pt-32 relative z-10'>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}>
					<Button
						variant='outline'
						onClick={() => router.push("/movies")}
						className='mb-8 bg-white/40 dark:bg-black/40 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white hover:bg-white/60 dark:hover:bg-black/60 hover:border-gray-400/50 dark:hover:border-white/30 backdrop-blur-sm'>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Back to Premium Collection
					</Button>
				</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
						className="mb-8"
						>
						<Button
							onClick={handleAddMovie}
							className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
						>
							➕ Add to Compare
						</Button>
					</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
					{/* Enhanced Movie Poster */}
					<div className='lg:col-span-1'>
						<motion.div
							whileHover={{ scale: 1.02, y: -5 }}
							transition={{ duration: 0.3 }}
							className='premium-section overflow-hidden rounded-3xl shadow-2xl'>
							<div className='aspect-[2/3] relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900'>
								{movie.Poster && movie.Poster !== "N/A" ? (
									<>
										{isImageLoading && (
											<div className='absolute inset-0 flex items-center justify-center'>
												<motion.div
													animate={{ rotate: 360 }}
													transition={{
														duration: 1,
														repeat: Infinity,
														ease: "linear",
													}}
													className='w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full'></motion.div>
											</div>
										)}
										<Image
											src={movie.Poster}
											alt={movie.Title}
											fill
											className='object-cover'
											onLoad={() => setIsImageLoading(false)}
											onError={() => setIsImageLoading(false)}
											sizes='(max-width: 1024px) 100vw, 33vw'
										/>
									</>
								) : (
									<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900'>
										<div className='text-center p-8'>
											<Film className='w-20 h-20 mx-auto mb-4 text-gray-500 dark:text-gray-600' />
											<p className='text-gray-600 dark:text-gray-400 font-medium'>
												No Premium Poster Available
											</p>
										</div>
									</div>
								)}
								{/* Premium overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
							</div>
						</motion.div>
					</div>

					{/* Enhanced Movie Details */}
					<div className='lg:col-span-2 space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}>
							<h1 className='text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight'>
								{movie.Title}
							</h1>
							<div className='flex flex-wrap items-center gap-6 text-gray-700 dark:text-gray-300 mb-6'>
								<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-red-500/30'>
									<Calendar className='w-4 h-4 text-red-500 dark:text-red-400' />
									<span className='font-semibold'>{movie.Year}</span>
								</div>
								<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/30'>
									<Clock className='w-4 h-4 text-blue-500 dark:text-blue-400' />
									<span className='font-semibold'>{movie.Runtime}</span>
								</div>
								<div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30'>
									<Globe className='w-4 h-4 text-emerald-500 dark:text-emerald-400' />
									<span className='font-semibold'>{movie.Language}</span>
								</div>
							</div>

							<div className='flex flex-wrap gap-3 mb-8'>
								{movie.Genre.split(", ").map((genre, index) => (
									<motion.span
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.3 + index * 0.1 }}
										key={genre}
										className='px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-700 dark:text-purple-200 border border-purple-500/40 backdrop-blur-sm'>
										{genre}
									</motion.span>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className='premium-section rounded-2xl p-8'>
							<h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center gap-3'>
								<div className='w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center'>
									<Film className='w-4 h-4 text-white' />
								</div>
								Plot Synopsis
							</h2>
							<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-light'>
								{movie.Plot}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className='premium-section rounded-2xl p-8'>
								<h3 className='text-xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
									<div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center'>
										<Users className='w-4 h-4 text-white' />
									</div>
									Cast & Crew
								</h3>
								<div className='space-y-4 text-sm'>
									<div className='p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl border border-red-500/20'>
										<span className='font-bold text-red-600 dark:text-red-300 block mb-2'>
											Director:
										</span>
										<span className='text-gray-700 dark:text-gray-300'>
											{movie.Director}
										</span>
									</div>
									<div className='p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20'>
										<span className='font-bold text-blue-600 dark:text-blue-300 block mb-2'>
											Starring:
										</span>
										<span className='text-gray-700 dark:text-gray-300'>
											{movie.Actors}
										</span>
									</div>
									<div className='p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20'>
										<span className='font-bold text-purple-600 dark:text-purple-300 block mb-2'>
											Writer:
										</span>
										<span className='text-gray-700 dark:text-gray-300'>
											{movie.Writer}
										</span>
									</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								className='premium-section rounded-2xl p-8'>
								<h3 className='text-xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
									<div className='w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center'>
										<Award className='w-4 h-4 text-white' />
									</div>
									Premium Ratings
								</h3>
								<div className='space-y-4'>
									{movie.Ratings?.map((rating, index) => (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.7 + index * 0.1 }}
											key={rating.Source}
											className='flex justify-between items-center p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20'>
											<span className='text-amber-600 dark:text-amber-300 font-semibold'>
												{rating.Source}:
											</span>
											<span className='font-bold text-gray-900 dark:text-white star-rating'>
												{rating.Value}
											</span>
										</motion.div>
									))}
									{movie.imdbRating !== "N/A" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.8 }}
											className='flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30'>
											<span className='text-yellow-600 dark:text-yellow-300 font-semibold'>
												IMDb Rating:
											</span>
											<div className='flex items-center gap-2'>
												<span className='font-bold text-gray-900 dark:text-white text-lg star-rating'>
													{movie.imdbRating}/10
												</span>{" "}
												<div className='text-yellow-500 dark:text-yellow-400'>
													⭐
												</div>
											</div>
										</motion.div>
									)}
								</div>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9 }}
							className='premium-section rounded-2xl p-8'>
							<h3 className='text-xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center gap-3'>
								<div className='w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center'>
									<Award className='w-4 h-4 text-white' />
								</div>
								Your Premium Rating
							</h3>
							<div className='text-center'>
								<StarRating
									rating={userRating}
									onRatingChange={handleRatingChange}
									size='lg'
								/>
								<p className='text-gray-600 dark:text-gray-400 mt-4 text-sm'>
									Rate this premium content to help us curate better
									recommendations
								</p>
								{userRating > 0 && (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										className='mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30'>
										<p className='text-green-600 dark:text-green-300 font-semibold'>
											Thank you for rating! Your rating: {userRating}/5 ⭐
										</p>
									</motion.div>
								)}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</main>
			
		</div>
	);
}
