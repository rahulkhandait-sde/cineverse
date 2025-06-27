import React from "react";

export const Loading = () => {
	return (
		<div className='flex items-center justify-center p-8'>
			<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-slate-100'></div>
		</div>
	);
};

export const LoadingCard = () => {
	return (
		<div className='animate-pulse'>
			<div className='bg-slate-200 dark:bg-slate-700 aspect-[2/3] rounded-lg mb-4'></div>
			<div className='h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2'></div>
			<div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
		</div>
	);
};
