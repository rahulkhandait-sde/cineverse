"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Movie } from "../types/movie";
import { RootState } from "../store/store";
import {
    addToFavorites,
    removeFromFavorites,
} from "../store/favoritesSlice";

interface FavoritesButtonProps {
    movie: Movie;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
};

export const FavoritesButton: React.FC<FavoritesButtonProps> = ({
    movie,
    size = "md",
    className = "",
}) => {
    const dispatch = useDispatch();
    const favoriteMovies = useSelector(
        (state: RootState) => state.favorites.movies
    );

    const isInFavorites = favoriteMovies.some(
        (fav) => fav.imdbID === movie.imdbID
    );

    const handleToggleFavorites = () => {
        if (isInFavorites) {
            dispatch(removeFromFavorites(movie.imdbID));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    const sizeClass = sizeClasses[size];

    return (
        <motion.button
            onClick={handleToggleFavorites}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
                ${sizeClass} my-2 p-2 
                ${className} 
                relative flex items-center justify-center 
                rounded-full transition-all duration-300 
                ${
                    isInFavorites
                        ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-white/10 backdrop-blur-xl border border-white/20 hover:border-red-400"
                }`}
            aria-label={
                isInFavorites ? "Remove from Favorites" : "Add to Favorites"
            }
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isInFavorites ? [1, 1.2, 1] : 1,
                    rotate: isInFavorites ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <Star
                    className={`w-5 h-5 ${
                        isInFavorites ? "text-white" : "text-red-500"
                    }`}
                />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isInFavorites ? [0, 1.5, 0] : 0,
                    opacity: isInFavorites ? [1, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-purple-600/30"
            />
        </motion.button>
    );
};
