"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { Movie } from "../types/movie";
import { RootState } from "../store/store";
import { addToWatched, removeFromWatched } from "../store/watchedSlice";

interface WatchedButtonProps {
    movie: Movie;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
};

export const WatchedButton: React.FC<WatchedButtonProps> = ({
    movie,
    size = "md",
    className = "",
}) => {
    const dispatch = useDispatch();
    const watchedtMovies = useSelector(
        (state: RootState) => state.watched.movies
    );

    const isInWatched = watchedtMovies.some(
        (watchedtMovies) => watchedtMovies.imdbID === movie.imdbID
    );

    const handleToggleWatched = () => {
        if (isInWatched) {
            dispatch(removeFromWatched(movie.imdbID));
        } else {
            dispatch(addToWatched(movie));
        }
    };

    const sizeClass = sizeClasses[size];

    return (
        <motion.button
            onClick={handleToggleWatched}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
                ${sizeClass} my-2 p-2 
                ${className} 
                relative flex items-center justify-center 
                rounded-full transition-all duration-300 
                ${
                    isInWatched
                        ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-white/10 backdrop-blur-xl border border-white/20 hover:border-red-400"
                }`}
            aria-label={isInWatched ? "Remove from watched" : "Add to watched"}
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isInWatched ? [1, 1.2, 1] : 1,
                    rotate: isInWatched ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <Film
                    className={`w-5 h-5 ${
                        isInWatched ? "text-white" : "text-red-500"
                    }`}
                />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isInWatched ? [0, 1.5, 0] : 0,
                    opacity: isInWatched ? [1, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-purple-600/30"
            />
        </motion.button>
    );
};
