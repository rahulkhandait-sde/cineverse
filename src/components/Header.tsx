"use client";

import React from "react";
import { Film, Search, Menu, Bell, User, Home, Star, Zap } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
	onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5 transition-all duration-500 hover:bg-white/90 dark:hover:bg-black/50'>
			{/* Premium background gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/5 to-blue-600/5 dark:from-red-600/5 dark:via-purple-600/5 dark:to-blue-600/5 opacity-80'></div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/20 dark:to-black/20'></div>

			<div className='relative container mx-auto px-6 h-24 flex items-center justify-between'>
				{/* Enhanced Logo Section with Netflix/BookMyShow style */}
				<Link
					href='/movies'
					className='flex items-center gap-4 hover:scale-105 transition-all duration-300 group'>
					<div className='relative'>
						{/* Multi-layer glow effect */}
						<div className='absolute -inset-3 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500'></div>
						<div className='absolute -inset-2 bg-gradient-to-br from-red-600/30 to-purple-700/30 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300'></div>
						<div className='relative bg-gradient-to-br from-red-600 via-red-700 to-purple-800 p-4 rounded-xl shadow-2xl border border-red-500/20'>
							<motion.div
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.8, ease: "easeOut" }}>
								<Film className='h-8 w-8 text-white drop-shadow-lg' />
							</motion.div>
						</div>
						{/* Pulsing ring effect */}
						<div className='absolute inset-0 rounded-xl border-2 border-red-500/30 animate-pulse'></div>
					</div>
					<div className='flex flex-col'>
						<motion.h1
							whileHover={{ scale: 1.05 }}
							className='text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent tracking-tight'>
							CineVerse
						</motion.h1>
						<motion.p
							initial={{ opacity: 0.6 }}
							whileHover={{ opacity: 1 }}
							className='text-xs text-red-600 dark:text-red-400 font-semibold -mt-1 tracking-[0.2em] uppercase flex items-center gap-1'>
							<Star className='w-3 h-3 text-yellow-500 dark:text-yellow-400' />
							Premium • Unlimited • 4K
						</motion.p>
					</div>
				</Link>

				{/* Enhanced Navigation Menu */}
				<nav className='hidden md:flex items-center gap-2'>
					<Link
						href='/movies'
						className='relative group px-6 py-3 text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-semibold tracking-wide'>
						<span className='relative z-10 flex items-center gap-2'>
							<Home className='w-4 h-4' />
							Movies
						</span>
						<div className='absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg'></div>
						<div className='absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></div>
					</Link>

					{/* Premium Badge */}
					<div className='ml-4 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full'>
						<div className='flex items-center gap-2'>
							<Zap className='w-4 h-4 text-amber-500 dark:text-amber-400' />
							<span className='text-amber-600 dark:text-amber-300 font-bold text-sm tracking-wide'>
								PREMIUM
							</span>
						</div>
					</div>
				</nav>

				{/* Enhanced Right Side Actions */}
				<div className='flex items-center gap-3'>
					{/* Quick Search */}
					<motion.button
						onClick={onSearchClick || undefined}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className='p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'>
						<Search className='h-5 w-5' />
					</motion.button>

					{/* Notifications with enhanced styling */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className='relative p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'>
						<Bell className='h-5 w-5' />
						<div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white dark:border-black animate-pulse shadow-lg shadow-red-500/50'></div>
						<div className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping'></div>
					</motion.button>

					{/* Dark Mode Toggle */}
					<div className='p-1 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10'>
						<DarkModeToggle />
					</div>

					{/* Enhanced User Profile */}
					<motion.div whileHover={{ scale: 1.05 }} className='relative group'>
						<motion.button
							whileTap={{ scale: 0.95 }}
							className='flex items-center gap-3 p-2 pr-4 bg-gradient-to-r from-red-600/20 to-purple-600/20 hover:from-red-600/30 hover:to-purple-600/30 backdrop-blur-sm border border-red-500/30 dark:border-white/20 hover:border-red-500/40 dark:hover:border-white/30 rounded-xl transition-all duration-300 shadow-lg'>
							<div className='relative w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden'>
								<User className='h-5 w-5 text-white' />
								{/* Online indicator */}
								<div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-black rounded-full'></div>
							</div>
							<div className='hidden sm:block text-left'>
								<div className='text-gray-900 dark:text-white/90 font-semibold text-sm'>
									Profile
								</div>
								<div className='text-gray-600 dark:text-white/60 text-xs'>
									Premium User
								</div>
							</div>
						</motion.button>

						{/* Dropdown indicator */}
						<div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400 dark:border-t-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					</motion.div>

					{/* Mobile Menu */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className='md:hidden p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'>
						<Menu className='h-5 w-5' />
					</motion.button>
				</div>
			</div>

			{/* Enhanced gradient border effect with animation */}
			<div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent'></div>
			<div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-pulse'></div>
		</motion.header>
	);
};
