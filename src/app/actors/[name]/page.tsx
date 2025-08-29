// src/app/actors/[name]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Header } from "../../../components/Header";
import { MovieGrid } from "../../../components/MovieGrid";
import {
	LoadingSkeleton,
	ErrorState,
	EmptyState,
} from "../../../components/LoadingStates";
import { useMoviesByActor } from "../../../hooks/useActorQueries";
import {
	User,
	Calendar,
	MapPin,
	Film,
	Star,
	Award,
	TrendingUp,
	ArrowLeft,
	Clock,
	Globe,
} from "lucide-react";
import { Actor } from "../../../types/movie";
import { actorApi } from "../../../services/actorApi";

export default function ActorDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [actor, setActor] = useState<Actor | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<
		"overview" | "filmography" | "stats"
	>("overview");

	const actorName = decodeURIComponent(params.name as string);

	// Get movies by actor
	const { data: actorMovies, isLoading: isLoadingMovies } =
		useMoviesByActor(actorName);

	useEffect(() => {
		const fetchActorDetails = async () => {
			try {
				setIsLoading(true);
				const actorDetails = actorApi.getActorDetails(actorName);
				if (actorDetails) {
					setActor(actorDetails);
				} else {
					setError("Actor not found");
				}
			} catch {
				setError("Failed to load actor details");
			} finally {
				setIsLoading(false);
			}
		};

		if (actorName) {
			fetchActorDetails();
		}
	}, [actorName]);

	const currentYear = new Date().getFullYear();
	const age = actor ? currentYear - actor.birthYear : 0;

	const handleBackClick = () => {
		router.back();
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900'>
				<Header />
				<main className='container mx-auto px-4 py-8 pt-32'>
					<LoadingSkeleton type='grid' count={1} />
				</main>
			</div>
		);
	}

	if (error || !actor) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900'>
				<Header />
				<main className='container mx-auto px-4 py-8 pt-32'>
					<ErrorState
						message={error || "Actor not found"}
						onRetry={() => window.location.reload()}
					/>
				</main>
			</div>
		);
	}

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

			<Header />

			<main className='container mx-auto px-4 py-8 pt-32 relative z-10'>
				<div className='max-w-7xl mx-auto'>
					{/* Back Button */}
					<motion.button
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						onClick={handleBackClick}
						className='mb-8 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}>
						<ArrowLeft className='w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors' />
						<span className='text-gray-700 dark:text-gray-300 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
							Back to Actors
						</span>
					</motion.button>

					{/* Actor Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='mb-12 p-8 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-3xl shadow-2xl'>
						<div className='flex flex-col lg:flex-row gap-8 items-start'>
							{/* Actor Avatar */}
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='flex-shrink-0'>
								<div className='w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden'>
									<User className='w-16 h-16 lg:w-20 lg:h-20 text-white' />
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse'></div>
								</div>
							</motion.div>

							{/* Actor Info */}
							<div className='flex-1 min-w-0'>
								<motion.h1
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className='text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent'>
									{actor.name}
								</motion.h1>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className='flex flex-wrap items-center gap-6 mb-6'>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
										<Calendar className='w-5 h-5' />
										<span className='font-semibold'>
											{actor.birthYear} ({age} years old)
										</span>
									</div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
										<MapPin className='w-5 h-5' />
										<span className='font-semibold'>{actor.nationality}</span>
									</div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
										<Film className='w-5 h-5' />
										<span className='font-semibold'>
											{actor.movies.length} movies
										</span>
									</div>
								</motion.div>

								{/* Genres */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.5 }}
									className='flex flex-wrap gap-2 mb-6'>
									{actor.genres.map((genre, index) => (
										<motion.span
											key={genre}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.6 + index * 0.1 }}
											className='px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-700 dark:text-purple-300 rounded-full border border-purple-500/30'>
											{genre}
										</motion.span>
									))}
								</motion.div>

								{/* Stats */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.6 }}
									className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
									<div className='p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20'>
										<div className='flex items-center gap-2 mb-2'>
											<Film className='w-4 h-4 text-purple-600 dark:text-purple-400' />
											<span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
												Movies
											</span>
										</div>
										<div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
											{actor.movies.length}
										</div>
									</div>
									<div className='p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20'>
										<div className='flex items-center gap-2 mb-2'>
											<Star className='w-4 h-4 text-blue-600 dark:text-blue-400' />
											<span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
												Genres
											</span>
										</div>
										<div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
											{actor.genres.length}
										</div>
									</div>
									<div className='p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20'>
										<div className='flex items-center gap-2 mb-2'>
											<Clock className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
											<span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
												Age
											</span>
										</div>
										<div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
											{age}
										</div>
									</div>
									<div className='p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20'>
										<div className='flex items-center gap-2 mb-2'>
											<Award className='w-4 h-4 text-orange-600 dark:text-orange-400' />
											<span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
												Status
											</span>
										</div>
										<div className='text-2xl font-bold text-orange-600 dark:text-orange-400'>
											Active
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.7 }}
						className='mb-8'>
						<div className='flex flex-wrap gap-2 p-2 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl'>
							{[
								{ id: "overview", label: "Overview", icon: User },
								{ id: "filmography", label: "Filmography", icon: Film },
								{ id: "stats", label: "Statistics", icon: TrendingUp },
							].map((tab) => (
								<motion.button
									key={tab.id}
									onClick={() =>
										setActiveTab(tab.id as "overview" | "filmography" | "stats")
									}
									className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
										activeTab === tab.id
											? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
											: "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-black/50"
									}`}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}>
									<tab.icon className='w-4 h-4' />
									{tab.label}
								</motion.button>
							))}
						</div>
					</motion.div>

					{/* Tab Content */}
					<AnimatePresence mode='wait'>
						{activeTab === "overview" && (
							<motion.div
								key='overview'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className='p-8 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-3xl shadow-2xl'>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
									Biography
								</h2>
								<div className='prose prose-lg dark:prose-invert max-w-none'>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{actor.name} is a renowned {actor.nationality} actor born in{" "}
										{actor.birthYear}. With a career spanning multiple decades,{" "}
										{actor.name} has established themselves as one of the most
										versatile and talented performers in the entertainment
										industry.
									</p>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed mt-4'>
										Known for their exceptional work in{" "}
										{actor.genres.slice(0, 3).join(", ")},{actor.name} has
										delivered memorable performances in over{" "}
										{actor.movies.length} films, earning critical acclaim and
										audience appreciation worldwide.
									</p>
								</div>
							</motion.div>
						)}

						{activeTab === "filmography" && (
							<motion.div
								key='filmography'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}>
								{isLoadingMovies ? (
									<LoadingSkeleton type='grid' count={6} />
								) : actorMovies &&
								  actorMovies.Search &&
								  actorMovies.Search.length > 0 ? (
									<div>
										<div className='mb-8 p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl'>
											<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
												Filmography
											</h2>
											<p className='text-gray-600 dark:text-gray-400'>
												{actorMovies.Search.length} movies found featuring{" "}
												{actor.name}
											</p>
										</div>
										<MovieGrid movies={actorMovies.Search} />
									</div>
								) : (
									<EmptyState
										query={`movies by ${actor.name}`}
										onSuggestionClick={() => {}}
									/>
								)}
							</motion.div>
						)}

						{activeTab === "stats" && (
							<motion.div
								key='stats'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className='p-8 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-3xl shadow-2xl'>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
									Career Statistics
								</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
									<div className='p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
												<Film className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
													Total Movies
												</h3>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
													Filmography count
												</p>
											</div>
										</div>
										<div className='text-3xl font-black text-purple-600 dark:text-purple-400'>
											{actor.movies.length}
										</div>
									</div>

									<div className='p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
												<Star className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
													Genres
												</h3>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
													Diverse roles
												</p>
											</div>
										</div>
										<div className='text-3xl font-black text-blue-600 dark:text-blue-400'>
											{actor.genres.length}
										</div>
									</div>

									<div className='p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center'>
												<Clock className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
													Career Years
												</h3>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
													Experience
												</p>
											</div>
										</div>
										<div className='text-3xl font-black text-emerald-600 dark:text-emerald-400'>
											{age - 18}
										</div>
									</div>

									<div className='p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center'>
												<Globe className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
													Nationality
												</h3>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
													Origin
												</p>
											</div>
										</div>
										<div className='text-lg font-bold text-orange-600 dark:text-orange-400'>
											{actor.nationality}
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</main>
		</motion.div>
	);
}
