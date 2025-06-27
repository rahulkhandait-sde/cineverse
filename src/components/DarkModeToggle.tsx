"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleDarkMode } from "../store/movieSlice";

export const DarkModeToggle: React.FC = () => {
	const dispatch = useDispatch();
	const darkMode = useSelector((state: RootState) => state.movies.darkMode);

	const handleToggle = () => {
		console.log("Toggling dark mode from:", darkMode, "to:", !darkMode);
		dispatch(toggleDarkMode());
	};

	return (
		<Button
			variant='outline'
			size='icon'
			onClick={handleToggle}
			className='border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors'
			title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
			{darkMode ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
		</Button>
	);
};
