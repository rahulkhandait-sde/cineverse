"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!visible) return null;

	return (
		<button
			onClick={scrollToTop}
			className="fixed bottom-20 right-6 z-50 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition"
			aria-label="Scroll to top"
		>
			<FaArrowUp />
		</button>
	);
};

export default ScrollToTopButton;
