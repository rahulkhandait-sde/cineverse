import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { movieApi } from "../services/movieApi";
import { MovieDetails, Movie } from "../types/movie";

// Query keys
export const queryKeys = {
	movies: {
		all: ["movies"] as const,
		search: (query: string, year?: string, genre?: string) =>
			["movies", "search", { query, year, genre }] as const,
		detail: (id: string) => ["movies", "detail", id] as const,
	},
};

// Search movies hook
export const useMovieSearch = (
	query: string,
	year?: string,
	genre?: string
) => {
	return useQuery({
		queryKey: queryKeys.movies.search(query, year, genre),
		queryFn: async () => {
			if (!query.trim())
				return { Search: [], totalResults: "0", Response: "True" };

			const params: Record<string, string> = {};
			if (year) params.y = year;
			// Note: OMDb API doesn't support genre filtering directly
			// Genre filtering would need to be implemented client-side

			const response = await movieApi.searchMovies(query, params);
			return response;
		},
		enabled: Boolean(query.trim()),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Movie details hook
export const useMovieDetails = (movieId: string) => {
	return useQuery({
		queryKey: queryKeys.movies.detail(movieId),
		queryFn: async () => {
			const response = await movieApi.getMovieDetails(movieId);
			if (response.Response !== "True") {
				throw new Error("Movie not found");
			}
			return response as MovieDetails;
		},
		enabled: Boolean(movieId),
		staleTime: 10 * 60 * 1000, // 10 minutes - movie details change less frequently
	});
};

// Infinite movie search hook for pagination
export const useInfiniteMovieSearch = (
	query: string,
	year?: string,
	genre?: string
) => {
	return useInfiniteQuery({
		queryKey: [...queryKeys.movies.search(query, year, genre), "infinite"],
		queryFn: async ({ pageParam = 1 }) => {
			if (!query.trim())
				return { Search: [], totalResults: "0", Response: "True" };

			const params: Record<string, string> = {};
			if (year) params.y = year;
			// Note: OMDb API doesn't support genre filtering directly
			// Genre filtering would need to be implemented client-side

			const response = await movieApi.searchMoviesWithPagination(
				query,
				pageParam,
				params
			);
			return response;
		},
		getNextPageParam: (lastPage, allPages) => {
			if (
				lastPage.Response !== "True" ||
				!lastPage.Search ||
				lastPage.Search.length === 0
			) {
				return undefined;
			}

			const totalResults = parseInt(lastPage.totalResults || "0");
			const currentCount = allPages.reduce(
				(acc, page) => acc + (page.Search?.length || 0),
				0
			);

			// OMDb API returns 10 results per page
			if (currentCount < totalResults) {
				return allPages.length + 1;
			}

			return undefined;
		},
		initialPageParam: 1,
		enabled: Boolean(query.trim()),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Hook for client-side genre filtering
export const useMoviesWithGenreFilter = (movies: Movie[], genre?: string) => {
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
	const [isFiltering, setIsFiltering] = useState(false);

	// Memoize the movie IDs to prevent unnecessary re-filtering when the array reference changes
	const movieIds = useMemo(() => {
		return movies.map((movie) => movie.imdbID).join(",");
	}, [movies]);

	useEffect(() => {
		if (!genre || genre === "all") {
			setFilteredMovies(movies);
			setIsFiltering(false);
			return;
		}

		const filterMoviesByGenre = async () => {
			setIsFiltering(true);
			try {
				// Fetch details for all movies in parallel (limited batch to avoid rate limiting)
				const batchSize = 10; // Process 10 movies at a time
				const filteredResults: Movie[] = [];

				for (let i = 0; i < movies.length; i += batchSize) {
					const batch = movies.slice(i, i + batchSize);
					const detailPromises = batch.map((movie) =>
						movieApi.getMovieDetails(movie.imdbID).catch(() => null)
					);

					const details = await Promise.all(detailPromises);

					// Filter this batch
					const batchFiltered = batch.filter((movie, index) => {
						const movieDetails = details[index];
						if (!movieDetails || !movieDetails.Genre) return false;

						const movieGenres = movieDetails.Genre.split(", ").map((g) =>
							g.trim()
						);
						return movieGenres.some(
							(g) => g.toLowerCase() === genre.toLowerCase()
						);
					});

					filteredResults.push(...batchFiltered);
				}

				setFilteredMovies(filteredResults);
			} catch (error) {
				console.error("Error filtering movies by genre:", error);
				setFilteredMovies(movies); // Fallback to unfiltered
			} finally {
				setIsFiltering(false);
			}
		};

		filterMoviesByGenre();
	}, [movieIds, genre, movies]); // Use movieIds instead of movies to prevent infinite loops

	return { filteredMovies, isFiltering };
};
