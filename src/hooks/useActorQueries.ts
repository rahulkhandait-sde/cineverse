/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { actorApi } from "../services/actorApi";
import { Movie } from "../types/movie";

// Query keys for actor-related queries
export const actorQueryKeys = {
	actors: {
		all: ["actors"] as const,
		search: (query: string) => ["actors", "search", query] as const,
		movies: (actorName: string) => ["actors", "movies", actorName] as const,
		popular: () => ["actors", "popular"] as const,
		byGenre: (genre: string) => ["actors", "genre", genre] as const,
	},
};

// Search actors hook
export const useActorSearch = (query: string) => {
	return useQuery({
		queryKey: actorQueryKeys.actors.search(query),
		queryFn: async () => {
			if (!query.trim()) return [];
			return await actorApi.searchActors(query);
		},
		enabled: Boolean(query.trim()),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Get movies by actor hook
export const useMoviesByActor = (actorName: string) => {
	console.log("🎭 useMoviesByActor called with actorName:", actorName);
	return useQuery({
		queryKey: actorQueryKeys.actors.movies(actorName),
		queryFn: async () => {
			console.log("🎭 Query function called for actor:", actorName);
			if (!actorName.trim()) {
				console.log("🎭 Empty actor name, returning empty result");
				return { Search: [], totalResults: "0", Response: "True" };
			}
			const result = await actorApi.getMoviesByActor(actorName);
			console.log("🎭 Query result:", result);
			return result;
		},
		enabled: Boolean(actorName.trim()),
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

// Get popular actors hook
export const usePopularActors = () => {
	return useQuery({
		queryKey: actorQueryKeys.actors.popular(),
		queryFn: () => actorApi.getPopularActors(),
		staleTime: 30 * 60 * 1000, // 30 minutes - popular actors don't change often
	});
};

// Get actors by genre hook
export const useActorsByGenre = (genre: string) => {
	return useQuery({
		queryKey: actorQueryKeys.actors.byGenre(genre),
		queryFn: () => actorApi.getActorsByGenre(genre),
		enabled: Boolean(genre && genre !== "all"),
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

// Infinite query for movies by actor with pagination
export const useInfiniteMoviesByActor = (actorName: string) => {
	return useInfiniteQuery({
		queryKey: [...actorQueryKeys.actors.movies(actorName), "infinite"],
		queryFn: async ({ pageParam = 1 }) => {
			if (!actorName.trim()) {
				return { Search: [], totalResults: "0", Response: "True" };
			}
			return await actorApi.getMoviesByActorWithPagination(
				actorName,
				pageParam
			);
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

			// 10 results per page
			if (currentCount < totalResults) {
				return allPages.length + 1;
			}

			return undefined;
		},
		initialPageParam: 1,
		enabled: Boolean(actorName.trim()),
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

// Combined search hook that can search both movies and actors
export const useCombinedSearch = (
	query: string,
	searchType: "movie" | "actor" | "both" = "both"
) => {
	const movieQuery = useQuery({
		queryKey: ["movies", "search", query],
		queryFn: async () => {
			if (!query.trim() || searchType === "actor") {
				return { Search: [], totalResults: "0", Response: "True" };
			}
			// Import movieApi here to avoid circular dependency
			const { movieApi } = await import("../services/movieApi");
			return await movieApi.searchMovies(query);
		},
		enabled:
			Boolean(query.trim()) &&
			(searchType === "movie" || searchType === "both"),
		staleTime: 5 * 60 * 1000,
	});

	const actorQuery = useQuery({
		queryKey: ["actors", "search", query],
		queryFn: async () => {
			if (!query.trim() || searchType === "movie") {
				return [];
			}
			return await actorApi.searchActors(query);
		},
		enabled:
			Boolean(query.trim()) &&
			(searchType === "actor" || searchType === "both"),
		staleTime: 5 * 60 * 1000,
	});

	return {
		movies: movieQuery.data,
		actors: actorQuery.data,
		isLoading: movieQuery.isLoading || actorQuery.isLoading,
		error: movieQuery.error || actorQuery.error,
		isFetching: movieQuery.isFetching || actorQuery.isFetching,
	};
};
