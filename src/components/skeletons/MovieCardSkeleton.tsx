import React from 'react';

export const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export const MovieCardSkeletonGrid = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};
