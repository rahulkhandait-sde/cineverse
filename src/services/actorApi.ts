// src/services/actorApi.ts

import { movieApi } from "./movieApi";
import { SearchResponse, Movie, Actor, ActorSearchResult } from "../types/movie";

// Comprehensive actor dataset with popular actors and their known movies
export const actorDataset = [
    {
        name: "Tom Hanks",
        movies: ["Forrest Gump", "Cast Away", "The Green Mile", "Saving Private Ryan", "Apollo 13", "Philadelphia", "Big", "Toy Story", "A Beautiful Day in the Neighborhood", "The Post"],
        genres: ["Drama", "Comedy", "Biography", "Animation"],
        birthYear: 1956,
        nationality: "American"
    },
    {
        name: "Leonardo DiCaprio",
        movies: ["Titanic", "Inception", "The Revenant", "The Wolf of Wall Street", "Django Unchained", "Shutter Island", "The Departed", "Catch Me If You Can", "The Aviator", "Once Upon a Time in Hollywood"],
        genres: ["Drama", "Thriller", "Romance", "Biography"],
        birthYear: 1974,
        nationality: "American"
    },
    {
        name: "Meryl Streep",
        movies: ["The Devil Wears Prada", "Sophie's Choice", "Kramer vs. Kramer", "The Iron Lady", "Mamma Mia!", "Julie & Julia", "Out of Africa", "Adaptation", "Doubt", "The Post"],
        genres: ["Drama", "Comedy", "Biography", "Romance"],
        birthYear: 1949,
        nationality: "American"
    },
    {
        name: "Robert De Niro",
        movies: ["Taxi Driver", "Goodfellas", "The Godfather Part II", "Raging Bull", "Casino", "The Deer Hunter", "Heat", "Cape Fear", "The King of Comedy", "Once Upon a Time in America"],
        genres: ["Crime", "Drama", "Thriller", "Biography"],
        birthYear: 1943,
        nationality: "American"
    },
    {
        name: "Scarlett Johansson",
        movies: ["Lost in Translation", "The Avengers", "Marriage Story", "Her", "Jojo Rabbit", "Black Widow", "Lucy", "Under the Skin", "Ghost in the Shell", "Vicky Cristina Barcelona"],
        genres: ["Action", "Drama", "Comedy", "Sci-Fi"],
        birthYear: 1984,
        nationality: "American"
    },
    {
        name: "Brad Pitt",
        movies: ["Fight Club", "Once Upon a Time in Hollywood", "Inglourious Basterds", "The Curious Case of Benjamin Button", "Ocean's Eleven", "Troy", "Mr. & Mrs. Smith", "Se7en", "12 Monkeys", "Moneyball"],
        genres: ["Drama", "Action", "Thriller", "Comedy"],
        birthYear: 1963,
        nationality: "American"
    },
    {
        name: "Emma Stone",
        movies: ["La La Land", "The Favourite", "Birdman", "Easy A", "The Help", "Crazy, Stupid, Love", "Superbad", "Zombieland", "The Amazing Spider-Man", "Poor Things"],
        genres: ["Comedy", "Drama", "Romance", "Musical"],
        birthYear: 1988,
        nationality: "American"
    },
    {
        name: "Denzel Washington",
        movies: ["Training Day", "Glory", "Malcolm X", "The Hurricane", "Remember the Titans", "American Gangster", "Flight", "Fences", "Man on Fire", "The Equalizer"],
        genres: ["Drama", "Action", "Biography", "Crime"],
        birthYear: 1954,
        nationality: "American"
    },
    {
        name: "Cate Blanchett",
        movies: ["Blue Jasmine", "Carol", "The Aviator", "Elizabeth", "The Lord of the Rings", "Notes on a Scandal", "I'm Not There", "The Curious Case of Benjamin Button", "Thor: Ragnarok", "Tár"],
        genres: ["Drama", "Biography", "Fantasy", "Romance"],
        birthYear: 1969,
        nationality: "Australian"
    },
    {
        name: "Johnny Depp",
        movies: ["Pirates of the Caribbean", "Edward Scissorhands", "Sweeney Todd", "Finding Neverland", "Charlie and the Chocolate Factory", "Alice in Wonderland", "Sleepy Hollow", "Donnie Brasco", "Blow", "Public Enemies"],
        genres: ["Adventure", "Fantasy", "Drama", "Comedy"],
        birthYear: 1963,
        nationality: "American"
    },
    {
        name: "Sandra Bullock",
        movies: ["The Blind Side", "Gravity", "The Proposal", "Miss Congeniality", "Speed", "While You Were Sleeping", "The Lake House", "Crash", "Bird Box", "Ocean's 8"],
        genres: ["Comedy", "Drama", "Romance", "Thriller"],
        birthYear: 1964,
        nationality: "American"
    },
    {
        name: "Morgan Freeman",
        movies: ["The Shawshank Redemption", "Million Dollar Baby", "Driving Miss Daisy", "Unforgiven", "Se7en", "Bruce Almighty", "The Dark Knight", "Invictus", "Glory", "Lean on Me"],
        genres: ["Drama", "Crime", "Biography", "Comedy"],
        birthYear: 1937,
        nationality: "American"
    },
    {
        name: "Julia Roberts",
        movies: ["Pretty Woman", "Erin Brockovich", "Notting Hill", "My Best Friend's Wedding", "Ocean's Eleven", "Runaway Bride", "Steel Magnolias", "The Pelican Brief", "Eat Pray Love", "Wonder"],
        genres: ["Romance", "Comedy", "Drama", "Biography"],
        birthYear: 1967,
        nationality: "American"
    },
    {
        name: "Al Pacino",
        movies: ["The Godfather", "Scarface", "Scent of a Woman", "Dog Day Afternoon", "Serpico", "The Godfather Part II", "Heat", "Carlito's Way", "Glengarry Glen Ross", "Donnie Brasco"],
        genres: ["Crime", "Drama", "Thriller", "Biography"],
        birthYear: 1940,
        nationality: "American"
    },
    {
        name: "Charlize Theron",
        movies: ["Monster", "Mad Max: Fury Road", "Atomic Blonde", "The Devil's Advocate", "Young Adult", "Tully", "Bombshell", "North Country", "The Italian Job", "Prometheus"],
        genres: ["Drama", "Action", "Thriller", "Biography"],
        birthYear: 1975,
        nationality: "South African"
    },
    {
        name: "Will Smith",
        movies: ["The Pursuit of Happyness", "Ali", "Men in Black", "Independence Day", "I Am Legend", "Hitch", "The Fresh Prince of Bel-Air", "Bad Boys", "Enemy of the State", "King Richard"],
        genres: ["Drama", "Action", "Comedy", "Biography"],
        birthYear: 1968,
        nationality: "American"
    },
    {
        name: "Nicole Kidman",
        movies: ["Moulin Rouge!", "The Hours", "Eyes Wide Shut", "Big Little Lies", "The Others", "Cold Mountain", "Australia", "Lion", "Bombshell", "Being the Ricardos"],
        genres: ["Drama", "Musical", "Romance", "Thriller"],
        birthYear: 1967,
        nationality: "Australian"
    },
    {
        name: "Tom Cruise",
        movies: ["Top Gun", "Mission: Impossible", "Jerry Maguire", "A Few Good Men", "Rain Man", "The Color of Money", "Risky Business", "Edge of Tomorrow", "Minority Report", "Magnolia"],
        genres: ["Action", "Drama", "Thriller", "Comedy"],
        birthYear: 1962,
        nationality: "American"
    },
    {
        name: "Angelina Jolie",
        movies: ["Girl, Interrupted", "Lara Croft: Tomb Raider", "Mr. & Mrs. Smith", "Changeling", "Maleficent", "Salt", "Wanted", "The Tourist", "Kung Fu Panda", "Eternals"],
        genres: ["Action", "Drama", "Adventure", "Biography"],
        birthYear: 1975,
        nationality: "American"
    },
    {
        name: "Daniel Day-Lewis",
        movies: ["There Will Be Blood", "Lincoln", "My Left Foot", "Gangs of New York", "The Last of the Mohicans", "In the Name of the Father", "Phantom Thread", "The Age of Innocence", "The Boxer", "A Room with a View"],
        genres: ["Drama", "Biography", "Historical", "War"],
        birthYear: 1957,
        nationality: "British"
    },
    {
        name: "Kate Winslet",
        movies: ["Titanic", "Eternal Sunshine of the Spotless Mind", "The Reader", "Revolutionary Road", "Little Children", "Finding Neverland", "Sense and Sensibility", "Steve Jobs", "Ammonite", "Avatar: The Way of Water"],
        genres: ["Drama", "Romance", "Biography", "Historical"],
        birthYear: 1975,
        nationality: "British"
    },
    {
        name: "Ryan Reynolds",
        movies: ["Deadpool", "The Proposal", "Free Guy", "Deadpool 2", "The Hitman's Bodyguard", "Just Friends", "Definitely, Maybe", "Safe House", "Buried", "Red Notice"],
        genres: ["Action", "Comedy", "Romance", "Superhero"],
        birthYear: 1976,
        nationality: "Canadian"
    },
    {
        name: "Jennifer Lawrence",
        movies: ["The Hunger Games", "Silver Linings Playbook", "American Hustle", "Winter's Bone", "Joy", "X-Men", "Passengers", "Mother!", "Red Sparrow", "Don't Look Up"],
        genres: ["Action", "Drama", "Comedy", "Sci-Fi"],
        birthYear: 1990,
        nationality: "American"
    },
    {
        name: "Chris Hemsworth",
        movies: ["Thor", "The Avengers", "Rush", "Snow White and the Huntsman", "In the Heart of the Sea", "Extraction", "Thor: Ragnarok", "Avengers: Endgame", "Bad Times at the El Royale", "Thor: Love and Thunder"],
        genres: ["Action", "Adventure", "Superhero", "Drama"],
        birthYear: 1983,
        nationality: "Australian"
    },
    {
        name: "Margot Robbie",
        movies: ["I, Tonya", "Suicide Squad", "Once Upon a Time in Hollywood", "Birds of Prey", "The Wolf of Wall Street", "Bombshell", "Harley Quinn", "Amsterdam", "Babylon", "Barbie"],
        genres: ["Drama", "Action", "Comedy", "Biography"],
        birthYear: 1990,
        nationality: "Australian"
    },
    {
        name: "Dwayne Johnson",
        movies: ["Jumanji", "Fast & Furious", "Moana", "San Andreas", "Central Intelligence", "Rampage", "Skyscraper", "Jungle Cruise", "Black Adam", "Red Notice"],
        genres: ["Action", "Adventure", "Comedy", "Animation"],
        birthYear: 1972,
        nationality: "American"
    },
    {
        name: "Gal Gadot",
        movies: ["Wonder Woman", "Justice League", "Fast & Furious", "Batman v Superman", "Wonder Woman 1984", "Red Notice", "Death on the Nile", "Cleopatra", "Heart of Stone", "Snow White"],
        genres: ["Action", "Adventure", "Superhero", "Drama"],
        birthYear: 1985,
        nationality: "Israeli"
    }
];



export const actorApi = {
    // Search actors by name
    searchActors: async (query: string): Promise<Actor[]> => {
        if (!query.trim()) return [];
        
        // Clean the search query by removing common prefixes
        let cleanQuery = query.toLowerCase();
        cleanQuery = cleanQuery.replace(/^(movies?|films?)\s+by\s+/i, '');
        cleanQuery = cleanQuery.replace(/^(actor|actress)\s+/i, '');
        cleanQuery = cleanQuery.trim();
        
        const results = actorDataset.filter(actor => 
            actor.name.toLowerCase().includes(cleanQuery) ||
            cleanQuery.includes(actor.name.toLowerCase()) ||
            actor.movies.some(movie => movie.toLowerCase().includes(cleanQuery))
        );
        
        console.log(`🔍 Search query: "${query}" -> cleaned: "${cleanQuery}"`);
        console.log(`👥 Found ${results.length} actors:`, results.map(a => a.name));
        
        return results;
    },

    // Get movies by actor name
    getMoviesByActor: async (actorName: string): Promise<SearchResponse> => {
        // Clean the actor name by removing common prefixes like "movies by", "films by", etc.
        let cleanActorName = actorName.toLowerCase();
        cleanActorName = cleanActorName.replace(/^(movies?|films?)\s+by\s+/i, '');
        cleanActorName = cleanActorName.replace(/^(actor|actress)\s+/i, '');
        cleanActorName = cleanActorName.trim();

        console.log(`🔍 Looking for actor: "${actorName}" -> cleaned: "${cleanActorName}"`);
        
        const actor = actorDataset.find(a => 
            a.name.toLowerCase() === cleanActorName ||
            a.name.toLowerCase().includes(cleanActorName) ||
            cleanActorName.includes(a.name.toLowerCase())
        );

        if (!actor) {
            console.log(`❌ Actor not found: "${cleanActorName}"`);
            console.log(`📋 Available actors:`, actorDataset.map(a => a.name));
            return { Search: [], totalResults: "0", Response: "False", Error: "Actor not found" };
        }
        
        console.log(`✅ Found actor: ${actor.name}`);

        try {
            console.log(`🔍 Creating movie data for actor: ${actor.name}`);
            console.log(`📽️ Actor's movies:`, actor.movies);
            
            // Create mock movie data from the actor's known movies
            const mockMovies = actor.movies.map((movieTitle, index) => ({
                imdbID: `tt${String(1000000 + index).padStart(7, '0')}`,
                Title: movieTitle,
                Year: String(1990 + Math.floor(Math.random() * 30)), // Random year between 1990-2020
                Poster: `https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodeURIComponent(movieTitle)}`,
                Type: "movie",
                Plot: `A compelling story featuring ${actor.name} in ${movieTitle}.`,
                Director: "Various Directors",
                Genre: actor.genres.join(", "),
                Runtime: "120 min",
                Rating: "8.0",
                Votes: "1000"
            }));

            console.log(`🎬 Created ${mockMovies.length} movies for ${actor.name}`);

            return {
                Search: mockMovies,
                totalResults: mockMovies.length.toString(),
                Response: "True"
            };
        } catch (error) {
            console.error("Error creating movies for actor:", error);
            return { Search: [], totalResults: "0", Response: "False", Error: "Failed to create movies" };
        }
    },

    // Get popular actors for suggestions
    getPopularActors: (): Actor[] => {
        return actorDataset.slice(0, 10); // Return top 10 actors
    },

    // Get actors by genre
    getActorsByGenre: (genre: string): Actor[] => {
        return actorDataset.filter(actor => 
            actor.genres.some(g => g.toLowerCase() === genre.toLowerCase())
        );
    },

    // Get actor details
    getActorDetails: (actorName: string): Actor | null => {
        return actorDataset.find(actor => 
            actor.name.toLowerCase() === actorName.toLowerCase()
        ) || null;
    },

    // Search movies by actor with pagination
    getMoviesByActorWithPagination: async (
        actorName: string, 
        page: number = 1
    ): Promise<SearchResponse> => {
        // Clean the actor name by removing common prefixes like "movies by", "films by", etc.
        let cleanActorName = actorName.toLowerCase();
        cleanActorName = cleanActorName.replace(/^(movies?|films?)\s+by\s+/i, '');
        cleanActorName = cleanActorName.replace(/^(actor|actress)\s+/i, '');
        cleanActorName = cleanActorName.trim();

        const actor = actorDataset.find(a => 
            a.name.toLowerCase() === cleanActorName ||
            a.name.toLowerCase().includes(cleanActorName) ||
            cleanActorName.includes(a.name.toLowerCase())
        );

        if (!actor) {
            return { Search: [], totalResults: "0", Response: "False", Error: "Actor not found" };
        }

        try {
            // Create mock movie data from the actor's known movies
            const mockMovies = actor.movies.map((movieTitle, index) => ({
                imdbID: `tt${String(1000000 + index).padStart(7, '0')}`,
                Title: movieTitle,
                Year: String(1990 + Math.floor(Math.random() * 30)), // Random year between 1990-2020
                Poster: `https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodeURIComponent(movieTitle)}`,
                Type: "movie",
                Plot: `A compelling story featuring ${actor.name} in ${movieTitle}.`,
                Director: "Various Directors",
                Genre: actor.genres.join(", "),
                Runtime: "120 min",
                Rating: "8.0",
                Votes: "1000"
            }));

            // Simple pagination (10 movies per page)
            const moviesPerPage = 10;
            const startIndex = (page - 1) * moviesPerPage;
            const endIndex = startIndex + moviesPerPage;
            const paginatedMovies = mockMovies.slice(startIndex, endIndex);

            return {
                Search: paginatedMovies,
                totalResults: mockMovies.length.toString(),
                Response: "True"
            };
        } catch (error) {
            console.error("Error creating movies for actor:", error);
            return { Search: [], totalResults: "0", Response: "False", Error: "Failed to create movies" };
        }
    }
};
