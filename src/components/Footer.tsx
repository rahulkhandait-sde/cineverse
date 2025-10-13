"use client";

import { useState, useEffect } from "react";
import { Mail, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<footer className='bg-black text-gray-400 py-12 border-t border-gray-800 mt-16'>
			<div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10'>
				{/* Brand */}
				<div>
					<h2 className='text-3xl font-bold text-white mb-3'>
						Cine<span className='text-pink-500'>Verse</span>
					</h2>
					<p className='text-sm leading-relaxed'>
						Premium 4K streaming. Discover millions of movies and TV shows
						anytime, anywhere.
					</p>
					<div className='flex space-x-4 mt-4'>
						<a
							href='https://facebook.com'
							target='_blank'
							className='hover:text-white'>
							<Facebook className='h-5 w-5' />
						</a>
										<a
										  href="https://twitter.com"
										  target="_blank"
										  className="hover:text-white"
										>
										  <svg
										    xmlns="http://www.w3.org/2000/svg"
										    viewBox="0 0 1200 1227"
										    className="h-5 w-5 fill-current"
										  >
										    <path d="M714.163 519.284L1160.89 0H1052.64L668.25 450.887L356.684 0H0L468.696 681.821L0 1226.48H108.253L512.75 741.896L843.316 1226.48H1200L714.137 519.284H714.163ZM567.171 678.249L518.802 609.828L147.253 79.694H305.124L605.286 500.884L653.655 569.305L1052.67 1150.31H894.796L567.171 678.275V678.249Z" />
										  </svg>
										</a>
						<a
							href='https://instagram.com'
							target='_blank'
							className='hover:text-white'>
							<Instagram className='h-5 w-5' />
						</a>
						<a
							href='https://github.com'
							target='_blank'
							className='hover:text-white'>
							<Github className='h-5 w-5' />
						</a>
					</div>
				</div>

				{/* Explore */}
				<div>
					<h3 className='text-white font-semibold mb-4 text-lg'>Explore</h3>
					<ul className='space-y-2 text-sm'>
						<li>
							<Link href='/movies' className='hover:text-white transition'>
								Movies
							</Link>
						</li>
						<li>
							<Link href='/tv-shows' className='hover:text-white transition'>
								TV Shows
							</Link>
						</li>
						<li>
							<Link href='/genres' className='hover:text-white transition'>
								Genres
							</Link>
						</li>
						<li>
							<Link href='/watchlist' className='hover:text-white transition'>
								Watchlist
							</Link>
						</li>
					</ul>
				</div>

				{/* Support */}
				<div>
					<h3 className='text-white font-semibold mb-4 text-lg'>Support</h3>
					<ul className='space-y-2 text-sm'>
						<li>
							<a href='/faq' className='hover:text-white transition'>
								FAQs
							</a>
						</li>
						<li>
							<a href='/contact' className='hover:text-white transition'>
								Contact Us
							</a>
						</li>
						<li>
							<a href='/terms' className='hover:text-white transition'>
								Terms of Service
							</a>
						</li>
						<li>
							<a href='/privacy' className='hover:text-white transition'>
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>

				{/* Newsletter */}
				<div>
					<h3 className='text-white font-semibold mb-4 text-lg flex items-center'>
						<Mail className='h-5 w-5 mr-2' /> Stay Updated
					</h3>
					{isHydrated ? (
						<form className='flex flex-col sm:flex-row gap-2'>
							<input
								type='email'
								placeholder='Enter your email'
								className='flex-1 bg-gray-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-600'
							/>
							<button
								type='submit'
								className='bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-md text-sm font-medium text-white'>
								Subscribe
							</button>
						</form>
					) : (
						<div className='flex flex-col space-y-2'>
							<div className='bg-gray-800 text-gray-500 px-3 py-2 rounded-md text-sm'>
								Enter your email
							</div>
							<div className='bg-pink-600 text-white px-3 py-2 rounded-md text-sm'>
								Subscribe
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Bottom note */}
			<div className='text-center text-xs text-gray-500 mt-12 border-t border-gray-800 pt-6'>
				© {new Date().getFullYear()} CineVerse. All rights reserved.
			</div>
		</footer>
	);
}
