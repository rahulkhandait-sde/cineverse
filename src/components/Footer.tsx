"use client";

import { useState, useEffect } from "react";

// components/Footer.tsx
export default function Footer() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);
	return (
		<footer className="bg-black text-gray-400 py-10 border-t border-gray-800 mt-16">
			<div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* Logo */}
				<div>
					<h2 className="text-2xl font-bold text-white mb-2">
						Cine<span className="text-pink-500">Verse</span>
					</h2>
					<p className="text-sm">
						Premium 4K streaming. Discover millions of movies and TV shows.
					</p>
				</div>

				{/* Explore */}
				<div>
					<h3 className="text-white font-semibold mb-3">Explore</h3>
					<ul className="space-y-2 text-sm">
						<li><a href="/movies" className="hover:text-white">Movies</a></li>
						<li><a href="/tv" className="hover:text-white">TV Shows</a></li>
						<li><a href="/genres" className="hover:text-white">Genres</a></li>
						<li><a href="/watchlist" className="hover:text-white">Watchlist</a></li>
					</ul>
				</div>

				{/* Support */}
				<div>
					<h3 className="text-white font-semibold mb-3">Support</h3>
					<ul className="space-y-2 text-sm">
						<li><a href="/faq" className="hover:text-white">FAQs</a></li>
						<li><a href="/contact" className="hover:text-white">Contact Us</a></li>
						<li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
					</ul>
				</div>

				{/* Newsletter */}
				<div>
					<h3 className="text-white font-semibold mb-3">Stay Updated</h3>
					{isHydrated ? (
						<form className="flex flex-col space-y-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm"
							/>
							<button
								type="submit"
								className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-md text-sm"
							>
								Subscribe
							</button>
						</form>
					) : (
						<div className="flex flex-col space-y-2">
							<div className="bg-gray-800 text-gray-400 px-3 py-2 rounded-md text-sm">
								Enter your email
							</div>
							<div className="bg-pink-600 text-white px-3 py-2 rounded-md text-sm">
								Subscribe
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-800 pt-6">
				© 2025 CineVerse. All rights reserved.
			</div>
		</footer>
	);
}
