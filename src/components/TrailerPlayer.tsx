"use client";

import React from "react";

interface TrailerPlayerProps {
    videoId?: string | null;
    title?: string;
}

export function TrailerPlayer({ videoId, title }: TrailerPlayerProps) {
    if (!videoId) {
        return (
            <div className='aspect-video w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-gray-300/40 dark:border-white/10'>
                <div className='text-center p-6'>
                    <div className='text-5xl mb-2'>🎞️</div>
                    <p className='text-gray-700 dark:text-gray-300 font-medium'>
                        Trailer not available
                    </p>
                    {title && (
                        <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
                            Try searching YouTube for "{title} trailer"
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10'>
            <iframe
                className='w-full h-full'
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title || "Trailer"}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
            />
        </div>
    );
}


