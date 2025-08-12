// src/app/tv-shows/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { movieApi } from "../../services/movieApi";
import { Movie } from "../../types/movie";
import { MovieCard } from "../../components/MovieCard";
import { motion } from "framer-motion";
import { MovieCardSkeletonGrid } from "@/components/skeletons/MovieCardSkeleton";
// ==========================================================
// == 1. IMPORT YOUR HEADER COMPONENT
// ==========================================================
import { Header } from "../../components/Header";

const TVShowsPage = () => {
    const [shows, setShows] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShows = async () => {
            // ... (Your existing useEffect code is unchanged)
            setIsLoading(true);
            setError(null);
            try {
                const data = await movieApi.searchTvShows("The Office");
                if (data.Response === "True") {
                    setShows(data.Search);
                } else {
                    setError(data.Error || "Could not find any TV shows.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShows();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden'>
            
            <div className='absolute inset-0 opacity-10 dark:opacity-5'>
                <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]'></div>
                <div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]'></div>
                <div className='absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_40%,_rgba(120,200,255,0.3),_transparent_50%)]'></div>
            </div>

            {/* ========================================================== */}
            {/* == 2. RENDER THE HEADER COMPONENT
            {/* ========================================================== */}
            <Header onSearchClick={() => { /* No search bar on this page, so do nothing */ }} />

            <main className="container mx-auto px-6 pt-32 pb-16 relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Discover TV Shows
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Browse our extensive collection of the latest and greatest TV shows.
                    </p>
                </div>

                <div className="mt-10">
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {isLoading ? (
                        <MovieCardSkeletonGrid count={10} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {shows.map((show, index) => (
                                <MovieCard key={show.imdbID} movie={show} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </motion.div>
    );
};

export default TVShowsPage;
