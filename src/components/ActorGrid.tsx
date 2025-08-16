// src/components/ActorGrid.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ActorCard } from "./ActorCard";
import { Actor } from "../types/movie";

interface ActorGridProps {
    actors: Actor[];
    onActorClick?: (actor: Actor) => void;
    showMovies?: boolean;
    className?: string;
}

export const ActorGrid: React.FC<ActorGridProps> = ({
    actors,
    onActorClick,
    showMovies = true,
    className = "",
}) => {
    if (!actors || actors.length === 0) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="text-gray-500 dark:text-gray-400">
                    No actors found
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
        >
            {actors.map((actor, index) => (
                <motion.div
                    key={actor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                    whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                    }}
                >
                    <ActorCard
                        actor={actor}
                        onClick={onActorClick}
                        showMovies={showMovies}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};
