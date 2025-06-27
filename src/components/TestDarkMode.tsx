"use client";

import React from "react";

export const TestDarkMode: React.FC = () => {
	const toggleDark = () => {
		console.log("Manual toggle clicked");
		const html = document.documentElement;
		const isDark = html.classList.contains("dark");
		console.log("Currently dark:", isDark);

		if (isDark) {
			html.classList.remove("dark");
			console.log("Removed dark class");
		} else {
			html.classList.add("dark");
			console.log("Added dark class");
		}

		console.log("HTML classes now:", html.className);
	};

	return (
		<div className='fixed bottom-4 right-4 z-50 space-y-2'>
			<button
				onClick={toggleDark}
				className='block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-bold'>
				Manual Toggle
			</button>

			{/* Multiple test boxes to verify different aspects */}
			<div className='p-2 bg-blue-500 dark:bg-green-500 text-white text-center rounded font-bold'>
				BG Test
			</div>

			<div className='p-2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded text-center font-bold'>
				Full Test
			</div>

			<div className='p-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded text-center font-bold'>
				Gray Test
			</div>

			<div className='text-xs text-center text-gray-600 dark:text-gray-400'>
				All should change when toggled
			</div>
		</div>
	);
};
