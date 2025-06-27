"use client";

import React from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { motion } from "framer-motion";

interface MovieGridProps {
	movies: Movie[];
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
			{movies.map((movie, index) => (
				<MovieCard key={movie.imdbID} movie={movie} index={index} />
			))}
		</motion.div>
	);
};
