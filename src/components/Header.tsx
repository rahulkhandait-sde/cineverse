// src/app/components/ui/Header.tsx

"use client";

import React, { useState } from "react";
// NEW: Import usePathname to detect the current page
import { usePathname } from "next/navigation";
import { Film, Search, Menu, Bell, User, Home, Star, Zap, Tv, Grid, X, Bookmark } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface HeaderProps {
    onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
    // NEW: Get the current URL pathname
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const watchlistMovies = useSelector((state: RootState) => state.watchlist.movies);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5 transition-all duration-500 hover:bg-white/90 dark:hover:bg-black/50'>
            
            {/* Background overlays */}
            <div className='absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/5 to-blue-600/5 dark:from-red-600/5 dark:via-purple-600/5 dark:to-blue-600/5 opacity-80'></div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/20 dark:to-black/20'></div>

            <div className='relative container mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-20 lg:h-24 flex items-center justify-between'>
                {/* Logo section - responsive sizing */}
                <Link href='/movies' className='flex items-center gap-1 sm:gap-2 md:gap-4 hover:scale-105 transition-all duration-300 group flex-shrink-0'>
                    <div className='relative'>
                        <div className='absolute -inset-1 sm:-inset-2 md:-inset-3 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg sm:blur-xl md:blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500'></div>
                        <div className='absolute -inset-0.5 sm:-inset-1 md:-inset-2 bg-gradient-to-br from-red-600/30 to-purple-700/30 rounded-md sm:rounded-lg md:rounded-xl blur-sm sm:blur-md md:blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300'></div>
                        <div className='relative bg-gradient-to-br from-red-600 via-red-700 to-purple-800 p-1.5 sm:p-2 md:p-3 lg:p-4 rounded-md sm:rounded-lg md:rounded-xl shadow-2xl border border-red-500/20'>
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                                <Film className='h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white drop-shadow-lg' />
                            </motion.div>
                        </div>
                        <div className='absolute inset-0 rounded-md sm:rounded-lg md:rounded-xl border-2 border-red-500/30 animate-pulse'></div>
                    </div>
                    <div className='flex flex-col min-w-0'>
                        <motion.h1 whileHover={{ scale: 1.05 }} className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent tracking-tight truncate'>
                            CineVerse
                        </motion.h1>
                        <motion.p initial={{ opacity: 0.6 }} whileHover={{ opacity: 1 }} className='hidden sm:flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold -mt-1 tracking-[0.2em] uppercase'>
                            <Star className='w-3 h-3 text-yellow-500 dark:text-yellow-400' />Premium • Unlimited • 4K
                        </motion.p>
                    </div>
                </Link>

                {/* === UPDATED NAVIGATION MENU === */}
                {/* Navigation Section - Desktop Only */}
                <div className='hidden md:flex items-center flex-1 justify-start ml-4 lg:ml-8 xl:ml-12'>
                    {/* Desktop Navigation */}
                    <nav className='flex items-center gap-1 lg:gap-2'>
                        {/* Movies Link with Active State */}
                        <Link
                            href='/movies'
                            className={`relative group px-4 lg:px-6 py-3 transition-all duration-300 font-semibold tracking-wide ${
                                pathname === '/movies'
                                    ? 'text-gray-900 dark:text-white' // Active style
                                    : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white' // Inactive style
                            }`}>
                            <span className='relative z-10 flex items-center gap-2'><Home className='w-4 h-4' />Movies</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl transition-transform duration-300 shadow-lg ${pathname === '/movies' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                            <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-transform duration-300 ${pathname === '/movies' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        </Link>

                        {/* TV Shows Link with Active State */}
                        <Link
                            href='/tv-shows'
                            className={`relative group px-4 lg:px-6 py-3 transition-all duration-300 font-semibold tracking-wide ${
                                pathname === '/tv-shows'
                                    ? 'text-gray-900 dark:text-white' // Active style
                                    : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white' // Inactive style
                            }`}>
                            <span className='relative z-10 flex items-center gap-2'><Tv className='w-4 h-4' />TV Shows</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl transition-transform duration-300 shadow-lg ${pathname === '/tv-shows' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                            <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-transform duration-300 ${pathname === '/tv-shows' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        </Link>

                        {/* Genres Link with Active State */}
                        <Link
                            href='/genres'
                            className={`relative group px-4 lg:px-6 py-3 transition-all duration-300 font-semibold tracking-wide ${
                                pathname === '/genres'
                                    ? 'text-gray-900 dark:text-white' // Active style
                                    : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white' // Inactive style
                            }`}>
                            <span className='relative z-10 flex items-center gap-2'><Grid className='w-4 h-4' />Genres</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl transition-transform duration-300 shadow-lg ${pathname === '/genres' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                            <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-transform duration-300 ${pathname === '/genres' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        </Link>

                        {/* Watchlist Link with Active State */}
                        <Link
                            href='/watchlist'
                            className={`relative group px-4 lg:px-6 py-3 transition-all duration-300 font-semibold tracking-wide ${
                                pathname === '/watchlist'
                                    ? 'text-gray-900 dark:text-white' // Active style
                                    : 'text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white' // Inactive style
                            }`}>
                            <span className='relative z-10 flex items-center gap-2'>
                                <Bookmark className='w-4 h-4' />
                                Watchlist
                                {watchlistMovies.length > 0 && (
                                    <span className='bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-bold'>
                                        {watchlistMovies.length}
                                    </span>
                                )}
                            </span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl transition-transform duration-300 shadow-lg ${pathname === '/watchlist' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                            <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-transform duration-300 ${pathname === '/watchlist' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        </Link>

                        {/* Premium Badge - Desktop Only */}
                        <div className='ml-4 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full'>
                            <div className='flex items-center gap-2'>
                                <Zap className='w-4 h-4 text-amber-500 dark:text-amber-400' />
                                <span className='text-amber-600 dark:text-amber-300 font-bold text-sm tracking-wide'>
                                    PREMIUM
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className='flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0'>
                    {/* Search Button */}
                    <motion.button 
                        onClick={onSearchClick || undefined} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.95 }} 
                        className='p-1.5 sm:p-2 md:p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 touch-target'
                    >
                        <Search className='h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5' />
                    </motion.button>
                    
                    {/* Notifications - Hidden on mobile */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.95 }} 
                        className='hidden sm:flex relative p-2 md:p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg md:rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    >
                        <Bell className='h-4 w-4 md:h-5 md:w-5' />
                        <div className='absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white dark:border-black animate-pulse shadow-lg shadow-red-500/50'></div>
                        <div className='absolute -top-0.5 -right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-ping'></div>
                    </motion.button>
                    
                    {/* Dark Mode Toggle */}
                    <div className='p-0.5 sm:p-1 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10'>
                        <DarkModeToggle />
                    </div>
                    
                    {/* User Profile - Responsive */}
                    <motion.div whileHover={{ scale: 1.05 }} className='hidden sm:block relative group'>
                       <Link href="/profile">
                            <motion.button 
                                whileTap={{ scale: 0.95 }} 
                                className='flex items-center gap-2 md:gap-3 p-1.5 sm:p-2 pr-2 sm:pr-3 md:pr-4 bg-gradient-to-r from-red-600/20 to-purple-600/20 hover:from-red-600/30 hover:to-purple-600/30 backdrop-blur-sm border border-red-500/30 dark:border-white/20 hover:border-red-500/40 dark:hover:border-white/30 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg'
                                >
                                <div className='relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-md sm:rounded-lg flex items-center justify-center overflow-hidden'>
                                    <User className='h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white' />
                                    <div className='absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-400 border-1 sm:border-2 border-white dark:border-black rounded-full'></div>
                                </div>
                                <div className='hidden md:block text-left'>
                                    <div className='text-gray-900 dark:text-white/90 font-semibold text-sm'>Profile</div>
                                    <div className='text-gray-600 dark:text-white/60 text-xs'>Premium User</div>
                                </div>
                            </motion.button>
                        </Link>
                        <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400 dark:border-t-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </motion.div>
                    
                    {/* Mobile Hamburger Menu Button */}
                    <motion.button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.95 }} 
                        className='md:hidden p-1.5 sm:p-2 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md sm:rounded-lg backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 touch-target'
                        aria-label='Toggle mobile menu'
                    >
                        <motion.div
                            animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? (
                                <X className='h-5 w-5' />
                            ) : (
                                <Menu className='h-5 w-5' />
                            )}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Bottom border effects */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent'></div>
            <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-pulse'></div>
        </motion.header>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className='fixed top-14 sm:top-16 md:top-20 lg:top-24 left-0 right-0 z-40 md:hidden'
                >
                    <div className='mx-3 sm:mx-4 mt-2 bg-white/95 dark:bg-black/85 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden'>
                        {/* Mobile Navigation Links */}
                        <div className='p-3 sm:p-4 space-y-1 sm:space-y-2'>
                            {[
                                { name: 'Movies', path: '/movies', icon: Home },
                                { name: 'TV Shows', path: '/tv-shows', icon: Tv },
                                { name: 'Genres', path: '/genres', icon: Grid },
                                { 
                                    name: 'Watchlist', 
                                    path: '/watchlist', 
                                    icon: Bookmark,
                                    badge: watchlistMovies.length > 0 ? watchlistMovies.length : null
                                }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.path;
                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 touch-target ${
                                                isActive
                                                    ? 'text-white bg-gradient-to-r from-red-600 to-purple-600 shadow-lg'
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/50 dark:hover:bg-white/5'
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                            <span className='text-base'>{item.name}</span>
                                            {item.badge && (
                                                <span className='ml-auto bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-bold'>
                                                    {item.badge}
                                                </span>
                                            )}
                                            {isActive && !item.badge && (
                                                <motion.div 
                                                    layoutId='mobileActiveTab' 
                                                    className='ml-auto w-2 h-2 bg-white rounded-full' 
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Mobile Premium Badge & User Info */}
                        <div className='px-3 sm:px-4 pb-3 sm:pb-4 pt-2 border-t border-gray-200/50 dark:border-white/10'>
                            <div className='flex items-center justify-between'>
                                {/* Premium Badge */}
                                <div className='flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full'>
                                    <Zap className='w-3 h-3 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400' />
                                    <span className='text-amber-600 dark:text-amber-300 font-bold text-xs sm:text-sm'>
                                        PREMIUM
                                    </span>
                                </div>

                                {/* Mobile User Profile */}
                                <Link href="/profile">
                                    <motion.button 
                                        whileTap={{ scale: 0.95 }}
                                        className='flex items-center gap-2 p-1.5 sm:p-2 bg-gradient-to-r from-red-600/20 to-purple-600/20 backdrop-blur-sm border border-red-500/30 dark:border-white/20 rounded-lg touch-target'
                                    >
                                        <div className='relative w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center'>
                                            <User className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white' />
                                            <div className='absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 border-2 border-white dark:border-black rounded-full'></div>
                                        </div>
                                        <div className='text-left'>
                                            <div className='text-gray-900 dark:text-white/90 font-semibold text-xs sm:text-sm'>Profile</div>
                                        </div>
                                    </motion.button>
                                </Link>

                                </div>
                            </div>
                        </div>
                    </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};
