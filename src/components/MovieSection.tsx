// components/MovieSection.tsx

"use client";

import { useRef, useState, useEffect } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { MovieCard } from "./MovieCard";

export const MovieSection = ({ title, icon: Icon, movies, clearHandler }: any) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const checkScroll = () => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 0);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
	};

	useEffect(() => {
		checkScroll();
		const el = scrollRef.current;
		if (el) el.addEventListener("scroll", checkScroll);
		return () => {
			if (el) el.removeEventListener("scroll", checkScroll);
		};
	}, [movies]);

	const scroll = (dir: "left" | "right") => {
		if (!scrollRef.current) return;
		const amount = 300;
		scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
	};

	return (
		<div className="mb-20">
			<div className="flex items-center justify-between px-6 mb-4">
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full blur-sm opacity-30"></div>
						<div className="relative bg-gradient-to-r from-red-500 to-purple-600 p-2 rounded-full">
							<Icon className="w-6 h-6 text-white" />
						</div>
					</div>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
				</div>
				{movies.length > 0 && (
					<Button
						onClick={clearHandler}
						variant="destructive"
						size="sm"
						className="flex items-center gap-2"
					>
						<Trash2 className="w-4 h-4" />
						Clear All
					</Button>
				)}
			</div>

			{movies.length === 0 ? (
				<p className="text-center text-gray-500 dark:text-gray-400">No movies in this section</p>
			) : (
				<div className="relative group px-6">
					{canScrollLeft && (
						<button
							className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition hidden group-hover:block"
							onClick={() => scroll("left")}
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
					)}
					{canScrollRight && (
						<button
							className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition hidden group-hover:block"
							onClick={() => scroll("right")}
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					)}

					<div
						ref={scrollRef}
						className="flex gap-6 py-4 overflow-x-auto scroll-smooth scrollbar-none"
					>
						{movies.map((movie: any, idx: number) => (
							<div
  								key={`${movie.imdbID}-${idx}`}
  								className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] flex-shrink-0"
							>

								<MovieCard movie={movie} index={idx} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
