"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const SimpleDarkModeToggle: React.FC = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		// Check localStorage and system preference
		const saved = localStorage.getItem("darkMode");
		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const isDark = saved ? JSON.parse(saved) : systemDark;

		setDarkMode(isDark);
		updateDOM(isDark);
	}, []);

	const updateDOM = (isDark: boolean) => {
		localStorage.setItem("darkMode", JSON.stringify(isDark));
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	const toggle = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		updateDOM(newMode);
	};

	return (
		<button
			onClick={toggle}
			className='p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
			title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
			{darkMode ? (
				<Sun className='h-4 w-4 text-yellow-500' />
			) : (
				<Moon className='h-4 w-4 text-gray-700' />
			)}
		</button>
	);
};
