// src/components/ActorCard.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Calendar, MapPin, Film, Star } from "lucide-react";
import { Actor } from "../types/movie";
import Link from "next/link";

interface ActorCardProps {
    actor: Actor;
    onClick?: (actor: Actor) => void;
    showMovies?: boolean;
    className?: string;
}

export const ActorCard: React.FC<ActorCardProps> = ({
    actor,
    onClick,
    showMovies = true,
    className = "",
}) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - actor.birthYear;

    const handleClick = () => {
        console.log("🎭 ActorCard handleClick called for actor:", actor.name);
        if (onClick) {
            console.log("🎭 Calling onClick with actor:", actor);
            onClick(actor);
        } else {
            console.log("🎭 No onClick handler provided");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`group relative bg-white/95 dark:bg-black/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                    {actor.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{actor.birthYear} ({age} years)</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{actor.nationality}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Star rating indicator */}
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                            Top Actor
                        </span>
                    </div>
                </div>

                {/* Genres */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Film className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Known for:
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {actor.genres.slice(0, 3).map((genre, index) => (
                            <motion.span
                                key={genre}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-700 dark:text-purple-300 rounded-full border border-purple-500/30"
                            >
                                {genre}
                            </motion.span>
                        ))}
                        {actor.genres.length > 3 && (
                            <span className="px-3 py-1 text-xs font-medium bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded-full border border-gray-500/30">
                                +{actor.genres.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Movies preview */}
                {showMovies && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Film className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Notable Movies ({actor.movies.length})
                            </span>
                        </div>
                        <div className="space-y-1">
                            {actor.movies.slice(0, 3).map((movie, index) => (
                                <motion.div
                                    key={movie}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    <span className="truncate">{movie}</span>
                                </motion.div>
                            ))}
                            {actor.movies.length > 3 && (
                                <div className="text-xs text-gray-500 dark:text-gray-500 italic">
                                    ...and {actor.movies.length - 3} more movies
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                    >
                        View Movies
                    </motion.button>
                    
                    <Link href={`/actors/${encodeURIComponent(actor.name)}`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:from-gray-600/30 hover:to-gray-700/30 transition-all duration-300 border border-gray-300/50 dark:border-gray-600/50"
                        >
                            Details
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
        </motion.div>
    );
};
