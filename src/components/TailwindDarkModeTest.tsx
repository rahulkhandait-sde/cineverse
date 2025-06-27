"use client";

import React from "react";

export const TailwindDarkModeTest: React.FC = () => {
	const toggleDark = () => {
		const html = document.documentElement;
		const isDark = html.classList.contains("dark");

		if (isDark) {
			html.classList.remove("dark");
		} else {
			html.classList.add("dark");
		}

		console.log("Dark mode toggled:", !isDark);
		console.log("HTML classes:", html.className);
	};

	return (
		<div className='fixed top-4 right-4 z-50 space-y-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg'>
			<h3 className='text-lg font-bold text-gray-900 dark:text-gray-100'>
				Tailwind Dark Mode Test
			</h3>

			<button
				onClick={toggleDark}
				className='w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors'>
				Toggle Dark Mode
			</button>

			<div className='space-y-2'>
				<div className='p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded'>
					Background Test
				</div>

				<div className='p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded'>
					Color Test
				</div>

				<div className='p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded'>
					Green Test
				</div>

				<div className='p-3 border-2 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded'>
					Border Test
				</div>
			</div>

			<div className='text-sm text-gray-600 dark:text-gray-400'>
				All colors should change when toggled
			</div>
		</div>
	);
};
