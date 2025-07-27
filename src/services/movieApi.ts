// src/services/movieApi.ts

import { SearchResponse, MovieDetails } from "../types/movie";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

interface SearchParams {
    s: string;
    page?: number;
    y?: string; // Year
    type?: string; // movie, series, episode
}

export const movieApi = {
    searchMovies: async (
        query: string,
        params: Partial<SearchParams> = {}
    ): Promise<SearchResponse> => {
        if (!API_KEY) {
            throw new Error(
                "OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
            );
        }

        const searchParams = new URLSearchParams({
            s: query,
            apikey: API_KEY,
            page: "1",
            ...Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) => value !== undefined && value !== ""
                )
            ),
        });

        try {
            const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle API-specific errors
            if (data.Response === "False") {
                if (data.Error === "Invalid API key!") {
                    throw new Error("Invalid API key. Please check your OMDB API key configuration.");
                } else if (data.Error === "Too many results.") {
                    throw new Error("Too many results. Please be more specific with your search.");
                } else if (data.Error === "Movie not found!") {
                    // Return empty results instead of throwing for "not found"
                    return { Search: [], totalResults: "0", Response: "False", Error: data.Error };
                } else {
                    throw new Error(data.Error || "Unknown API error");
                }
            }
            
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Network error. Please check your internet connection and try again.");
        }
    },

    // ==========================================================
    // == THIS IS THE NEW FUNCTION YOU NEED TO ADD ==
    // ==========================================================
    searchTvShows: async (
        query: string,
        page: number = 1
    ): Promise<SearchResponse> => {
        if (!API_KEY) {
            throw new Error(
                "OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
            );
        }

        const searchParams = new URLSearchParams({
            s: query,
            apikey: API_KEY,
            type: 'series', // This is the key part for TV shows
            page: page.toString(),
        });

        const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
        const data = await response.json();
        return data;
    },
    // ==========================================================
    // == END OF NEW FUNCTION ==
    // ==========================================================

    searchMoviesWithPagination: async (
        query: string,
        page: number = 1,
        params: Partial<Omit<SearchParams, "page">> = {}
    ): Promise<SearchResponse> => {
        if (!API_KEY) {
            throw new Error(
                "OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
            );
        }

        const searchParams = new URLSearchParams({
            s: query,
            apikey: API_KEY,
            page: page.toString(),
            ...Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) => value !== undefined && value !== ""
                )
            ),
        });

        try {
            const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle API-specific errors
            if (data.Response === "False") {
                if (data.Error === "Invalid API key!") {
                    throw new Error("Invalid API key. Please check your OMDB API key configuration.");
                } else if (data.Error === "Movie not found!") {
                    // Return empty results for pagination
                    return { Search: [], totalResults: "0", Response: "False", Error: data.Error };
                } else {
                    throw new Error(data.Error || "Unknown API error");
                }
            }
            
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Network error. Please check your internet connection and try again.");
        }
    },

    getMovieDetails: async (imdbID: string): Promise<MovieDetails> => {
        if (!API_KEY) {
            throw new Error(
                "OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
            );
        }

        const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();
        return data;
    },

    getMoviesByTitle: async (title: string): Promise<SearchResponse> => {
        if (!API_KEY) {
            throw new Error(
                "OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
            );
        }

        const response = await fetch(
            `${BASE_URL}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`
        );
        const data = await response.json();
        return data;
    },
};
