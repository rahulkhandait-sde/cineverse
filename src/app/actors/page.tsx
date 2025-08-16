// src/app/actors/page.tsx

"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../components/Header";
import { SearchBar, SearchBarRef } from "../../components/SearchBar";
import { ActorGrid } from "../../components/ActorGrid";
import { MovieGrid } from "../../components/MovieGrid";
import { LoadingSkeleton, ErrorState, EmptyState } from "../../components/LoadingStates";
import { usePopularActors, useActorSearch, useMoviesByActor } from "../../hooks/useActorQueries";
import { useDebounce } from "../../hooks/useDebounce";
import { User, Film, Star, TrendingUp, Award } from "lucide-react";
import { Actor } from "../../types/movie";

export default function ActorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const searchBarRef = useRef<SearchBarRef>(null);

    const debouncedQuery = useDebounce(searchQuery, 500);

    // Get popular actors for the homepage
    const { data: popularActors, isLoading: isLoadingPopular } = usePopularActors();

    // Search for actors
    const { data: searchResults, isLoading: isSearching } = useActorSearch(debouncedQuery);

    // Get movies by selected actor
    const { data: actorMovies, isLoading: isLoadingActorMovies, error: actorMoviesError } = useMoviesByActor(
        selectedActor?.name || ""
    );

    // Debug log to see what's happening
    console.log("🔍 Debug - selectedActor:", selectedActor?.name);
    console.log("🔍 Debug - actorMovies:", actorMovies);
    console.log("🔍 Debug - isLoadingActorMovies:", isLoadingActorMovies);
    console.log("🔍 Debug - actorMoviesError:", actorMoviesError);

    const hasSearchQuery = searchQuery.trim().length > 0;
    const hasSelectedActor = selectedActor !== null;

    const handleActorClick = (actor: Actor) => {
        setSelectedActor(actor);
        setToastMessage(`🎭 Loading movies by ${actor.name}...`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSelectedActor(null);
        searchBarRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setSelectedActor(null);
        setToastMessage(`🎭 Searching for "${suggestion}"...`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%)]"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%)]"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_40%,_rgba(120,200,255,0.3),_transparent_50%)]"></div>
            </div>

            <Header onSearchClick={() => searchBarRef.current?.focus()} />
            
            <main className="container mx-auto px-4 py-8 pt-32 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center mb-20 relative"
                    >
                        {/* Hero Background Effects */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                            <div className="absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-2000"></div>
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight drop-shadow-xl transform transition-transform duration-100 hover:rotate-2 hover:scale-105">
                                <span className="block bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] dark:from-[#a855f7] dark:to-[#06b6d4] bg-clip-text text-transparent">
                                    Discover
                                </span>
                                <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] dark:from-[#a855f7] dark:via-purple-500 dark:to-[#06b6d4] bg-clip-text text-transparent">
                                    Amazing
                                    <br />
                                    <span className="bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] dark:from-[#a855f7] dark:to-[#06b6d4] bg-clip-text text-transparent">
                                        Actors
                                    </span>
                                </span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8"
                            >
                                Explore the world of cinema through the lens of talented actors.
                                <br />
                                <span className="text-purple-500 dark:text-purple-400 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Find your favorite performers and their incredible filmography.
                                </span>
                            </motion.p>

                            {/* Feature badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap justify-center gap-6 mt-10"
                            >
                                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                    <span className="text-purple-600 dark:text-purple-300 font-semibold text-sm">
                                        Award Winners
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                                        Complete Filmography
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-emerald-600 dark:text-emerald-300 font-semibold text-sm">
                                        Biography & Stats
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <SearchBar
                            ref={searchBarRef}
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search for actors by name or movies..."
                            year=""
                            genre="all"
                            searchType="actor"
                            onYearChange={() => {}}
                            onGenreChange={() => {}}
                            onSearchTypeChange={() => {}}
                            onClearFilters={handleClearSearch}
                            showTrendingSearches={false}
                        />
                    </motion.div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {isLoadingPopular && !hasSearchQuery ? (
                            <LoadingSkeleton type="grid" count={8} />
                        ) : hasSearchQuery ? (
                            // Search Results
                            <div>
                                {isSearching ? (
                                    <LoadingSkeleton type="grid" count={6} />
                                ) : searchResults && searchResults.length > 0 ? (
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-8 flex flex-wrap items-center gap-4 justify-between p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <div className="relative">
                                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                                                        <div className="absolute inset-0 w-3 h-3 bg-purple-500/30 rounded-full animate-ping"></div>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {searchResults.length} actors found
                                                    </span>
                                                </div>
                                                {searchQuery.trim() && (
                                                    <div className="px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-purple-600 dark:text-purple-300 rounded-full text-sm font-bold border border-purple-500/40 shadow-lg">
                                                        &ldquo;{searchQuery.trim()}&rdquo;
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                        <ActorGrid actors={searchResults} onActorClick={handleActorClick} />
                                    </div>
                                ) : (
                                    <EmptyState query={searchQuery} onSuggestionClick={handleSuggestionClick} />
                                )}
                            </div>
                        ) : hasSelectedActor ? (
                            // Selected Actor Movies
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    Movies by {selectedActor.name}
                                                </h2>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {selectedActor.nationality} • {new Date().getFullYear() - selectedActor.birthYear} years old
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedActor(null)}
                                            className="px-4 py-2 bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:from-gray-600/30 hover:to-gray-700/30 transition-all duration-300 border border-gray-300/50 dark:border-gray-600/50"
                                        >
                                            Back to Actors
                                        </motion.button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedActor.genres.map((genre, index) => (
                                            <span
                                                key={genre}
                                                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-700 dark:text-purple-300 rounded-full border border-purple-500/30"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {isLoadingActorMovies ? (
                                    <LoadingSkeleton type="grid" count={6} />
                                ) : actorMovies && actorMovies.Search && actorMovies.Search.length > 0 ? (
                                    <>
                                        {console.log("🎬 Rendering MovieGrid with movies:", actorMovies.Search)}
                                        <MovieGrid movies={actorMovies.Search} />
                                    </>
                                ) : (
                                    <>
                                        {console.log("❌ Not rendering movies. actorMovies:", actorMovies, "Search:", actorMovies?.Search, "length:", actorMovies?.Search?.length)}
                                        <EmptyState query={`movies by ${selectedActor.name}`} onSuggestionClick={handleSuggestionClick} />
                                    </>
                                )}
                            </div>
                        ) : (
                            // Popular Actors
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 flex items-center gap-4 p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <TrendingUp className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                Popular Actors
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Discover the most acclaimed performers in cinema
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                                <ActorGrid actors={popularActors || []} onActorClick={handleActorClick} />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl px-8 py-5 flex items-center gap-4 max-w-sm">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="relative"
                            >
                                <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full"></div>
                                <div className="absolute inset-0 w-6 h-6 border border-purple-500/20 rounded-full animate-ping"></div>
                            </motion.div>
                            <div className="flex-1">
                                <span className="text-gray-900 dark:text-white font-semibold text-base">
                                    {toastMessage}
                                </span>
                                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    Searching actor database...
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

