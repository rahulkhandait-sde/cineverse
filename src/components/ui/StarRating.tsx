import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface StarRatingProps {
	rating: number;
	onRatingChange?: (rating: number) => void;
	readonly?: boolean;
	size?: "sm" | "md" | "lg";
}

export const StarRating: React.FC<StarRatingProps> = ({
	rating,
	onRatingChange,
	readonly = false,
	size = "md",
}) => {
	const [hoverRating, setHoverRating] = useState(0);

	const sizes = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	};

	return (
		<div className='flex items-center gap-1'>
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type='button'
					disabled={readonly}
					className={cn(
						"transition-colors",
						!readonly && "hover:scale-110 cursor-pointer",
						readonly && "cursor-default"
					)}
					onClick={() => onRatingChange && onRatingChange(star)}
					onMouseEnter={() => !readonly && setHoverRating(star)}
					onMouseLeave={() => !readonly && setHoverRating(0)}>
					<Star
						className={cn(
							sizes[size],
							"transition-colors",
							hoverRating >= star || rating >= star
								? "fill-yellow-400 text-yellow-400"
								: "text-slate-300 dark:text-slate-600"
						)}
					/>
				</button>
			))}
			<span className='ml-2 text-sm text-slate-600 dark:text-slate-400'>
				({rating}/5)
			</span>
		</div>
	);
};
