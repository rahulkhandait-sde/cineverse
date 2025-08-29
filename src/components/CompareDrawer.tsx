"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import {
	removeMovieFromCompare,
	clearCompareMovies,
} from "@/store/compareMovieSlice";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Trash2, GitCompare, X } from "lucide-react";
import { setLoading, setError } from "@/store/movieSlice";

export function CompareDrawer() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const { compareMovies } = useSelector((state: RootState) => state.compare);
	const handleRemoveMovie = (movieId: string) => {
		dispatch(setLoading(true));
		dispatch(setError(null));
		try {
			dispatch(removeMovieFromCompare(movieId));
			console.log("clicked");
		} catch {
			dispatch(setError("Failed to fetch movie details"));
		} finally {
			dispatch(setLoading(false));
		}
	};
	const handleRemoveListOfMovies = () => {
		dispatch(setLoading(true));
		dispatch(setError(null));
		try {
			dispatch(clearCompareMovies());
			console.log("clicked");
		} catch {
			dispatch(setError("Failed to fetch movie details"));
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleCompareClick = () => {
		setIsOpen(false);
		router.push("/movies/compare");
	};

	if (compareMovies.length === 0) {
		return null;
	}

	return (
		<>
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className='fixed bottom-20 left-2 z-50 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center'
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={isOpen ? "up" : "compare"}
						initial={{ rotate: -90, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: 90, opacity: 0 }}
						transition={{ duration: 0.2 }}>
						{isOpen ? <ChevronUp size={28} /> : <GitCompare size={28} />}
					</motion.div>
				</AnimatePresence>
				<span className='absolute -top-1 -right-1 flex h-6 w-6'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75'></span>
					<span className='relative inline-flex rounded-full h-6 w-6 bg-pink-500 text-white text-xs font-bold items-center justify-center'>
						{compareMovies.length}
					</span>
				</span>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className='fixed bottom-0 left-0 right-0 z-40'>
						<div className='w-full max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-lg border-t-2 border-indigo-500 rounded-t-2xl shadow-2xl text-white'>
							<div className='p-4 border-b border-gray-700 flex justify-between items-center'>
								<h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>
									Movies to Compare ({compareMovies.length})
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className='p-1 rounded-full text-gray-400 hover:bg-gray-700'>
									<X size={20} />
								</button>
							</div>

							<div className='p-4 max-h-64 overflow-y-auto'>
								<ul className='space-y-2'>
									{compareMovies.map((movie) => (
										<li
											key={movie.imdbID}
											className='flex items-center justify-between p-3 bg-gray-800/60 rounded-lg border border-transparent hover:border-purple-500/50 transition-colors duration-300 group'>
											<div>
												<p className='font-semibold text-gray-100'>
													{movie.Title}
												</p>
												<p className='text-sm text-gray-400'>{movie.Year}</p>
											</div>
											<button
												onClick={() => handleRemoveMovie(movie.imdbID)}
												className='p-1 rounded-full text-gray-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all'
												aria-label={`Remove ${movie.Title}`}>
												<Trash2 size={18} />
											</button>
										</li>
									))}
								</ul>
							</div>

							<div className='flex justify-end gap-4 p-4 border-t border-gray-700'>
								<button
									onClick={handleRemoveListOfMovies}
									className='px-4 py-2 bg-transparent border border-red-600 text-red-500 font-semibold rounded-lg hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors'>
									Clear List
								</button>
								<button
									onClick={handleCompareClick}
									className='px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all'>
									Compare
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
