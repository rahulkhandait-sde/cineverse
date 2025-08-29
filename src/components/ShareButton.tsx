"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Mail, Copy, MessageCircle } from "lucide-react";
import { Movie } from "../types/movie";

interface ShareButtonProps {
	movie: Movie;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: "w-8 h-8",
	md: "w-10 h-10",
	lg: "w-12 h-12",
};

export const ShareButton: React.FC<ShareButtonProps> = ({
	movie,
	size = "md",
	className = "",
}) => {
	const sizeClass = sizeClasses[size];
	const [isClicked, setIsClicked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const movieUrl = `https://moviehunt-search.vercel.app/movies/${movie.imdbID}`;
	const text = "Check out this amazing movie";
	const title = movie.Title;

	const handleCopy = () => {
		navigator.clipboard.writeText(movieUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 5000);
	};

	const handleShareButton = (platform: "mail" | "whatsapp" | "copy") => {
		switch (platform) {
			case "mail":
				window.open(
					`mailto:?subject=${encodeURIComponent(
						text
					)}&body=${encodeURIComponent(movieUrl)}`,
					"_blank"
				);
				break;
			case "whatsapp":
				window.open(
					`https://api.whatsapp.com/send?text=${encodeURIComponent(
						`Your next favorite story - ${title}\n${text} - ${movieUrl}`
					)}`,
					"_blank"
				);
				break;
			case "copy":
				handleCopy();
				break;
		}
		setIsClicked(true);
		setTimeout(() => setIsClicked(false), 500);
		setIsOpen(false);
	};
	return (
		<div className='relative inline-block'>
			{/* Main Share Button */}
			<motion.button
				onClick={() => setIsOpen((prev) => !prev)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className={`
                    ${sizeClass} my-2 p-2 
                    ${className} 
                    flex items-center justify-center 
                    rounded-full transition-all duration-300 
                    bg-white/10 backdrop-blur-xl border border-white/20 hover:border-red-400
                `}>
				<motion.div
					initial={false}
					animate={{
						scale: isClicked ? [1, 1.2, 1] : 1,
						rotate: isClicked ? [0, 10, -10, 0] : 0,
					}}
					transition={{ duration: 0.3 }}>
					<Share2 className='w-5 h-5 text-red-500' />
				</motion.div>
			</motion.button>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className='absolute right-0 mt-2 w-40 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-3 flex flex-col gap-2 z-50'>
					<div className='flex justify-between gap-2'>
						{/* Mail */}
						<motion.button
							onClick={() => handleShareButton("mail")}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className='flex-1 flex items-center justify-center p-2 rounded-lg bg-blue-100 hover:bg-blue-200'>
							<Mail className='w-5 h-5 text-blue-600' />
						</motion.button>

						{/* WhatsApp */}
						<motion.button
							onClick={() => handleShareButton("whatsapp")}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className='flex-1 flex items-center justify-center p-2 rounded-lg bg-green-100 hover:bg-green-200'>
							<MessageCircle className='w-5 h-5 text-green-600' />
						</motion.button>
					</div>
					{/* Copy */}
					<motion.button
						onClick={() => {
							handleCopy();
							setIsClicked(true);
							setTimeout(() => setIsClicked(false), 1000);
						}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800'>
						<Copy className='w-5 h-5 text-gray-700 mr-2' />
						{copied ? "Copied!" : "Copy"}
					</motion.button>
				</motion.div>
			)}
		</div>
	);
};
