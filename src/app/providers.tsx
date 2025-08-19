"use client";

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { setDarkMode } from "../store/movieSlice";
import { RootState } from "../store/store";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";

const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useDispatch();
	const darkMode = useSelector((state: RootState) => state.movies.darkMode);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Load dark mode preference from localStorage
		const savedDarkMode = localStorage.getItem("darkMode");
		if (savedDarkMode !== null) {
			dispatch(setDarkMode(JSON.parse(savedDarkMode)));
		} else {
			// Check system preference
			const systemDarkMode = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			dispatch(setDarkMode(systemDarkMode));
		}
	}, [dispatch]);

	useEffect(() => {
		if (!mounted) return;

		// Save dark mode preference and apply to document
		localStorage.setItem("darkMode", JSON.stringify(darkMode));

		// Apply dark mode class to html element
		const htmlElement = document.documentElement;
		if (darkMode) {
			htmlElement.classList.add("dark");
		} else {
			htmlElement.classList.remove("dark");
		}
	}, [darkMode, mounted]);

	// Prevent hydration mismatch by not rendering until mounted
	if (!mounted) {
		return <div style={{ visibility: 'hidden' }}>{children}</div>;
	}

	return <>{children}</>;
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ReactQueryProvider>
			<Provider store={store}>
				<DarkModeProvider>{children}</DarkModeProvider>
			</Provider>
		</ReactQueryProvider>
	);
};
