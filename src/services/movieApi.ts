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
			page: "1", // Default to page 1
			...Object.fromEntries(
				Object.entries(params).filter(
					([, value]) => value !== undefined && value !== ""
				)
			),
		});

		const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
		const data = await response.json();
		return data;
	},

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

		const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
		const data = await response.json();
		return data;
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
