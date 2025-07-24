# 🎬 CineVerse

A beautiful and modern movie search application built with Next.js, TypeScript, and the OMDB API. This app allows users to search for movies, view detailed information, and rate their favorites.

## ✨ Features

### Core Functionality

- **Movie Search**: Search for movies by title with auto-complete and debounced API calls
- **Movie Details**: View detailed information including plot, cast, ratings, and more
- **User Ratings**: Rate movies with a 5-star rating system (stored locally)
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Pages

- **`/movies`** - Movie list page with search functionality
- **`/movies/[id]`** - Individual movie details page

### UI/UX Features

- Modern and clean design inspired by popular movie platforms
- Smooth animations and transitions using Framer Motion
- Loading states and error handling
- Skeleton loading for better UX
- Beautiful gradient backgrounds and cards

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Components**: Custom UI components with shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: OMDB API for movie data

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-search
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

### Searching for Movies

1. Navigate to the Movies page
2. Use the search bar to enter a movie title
3. Results will appear automatically as you type (debounced)
4. Click on any movie card to view detailed information

### Rating Movies

1. Go to a movie's detail page
2. Click on the stars to rate the movie (1-5 stars)
3. Your rating will be saved locally and persist across sessions

### Dark Mode

- Use the toggle button in the header to switch between light and dark modes
- Your preference will be saved and applied on future visits

## 🎯 Key Features Implemented

### ✅ Required Features

- [x] Movie search with OMDB API integration
- [x] Movie listing page (`/movies`)
- [x] Movie details page (`/movies/:id`)
- [x] Debounced search functionality
- [x] Star rating system with local storage
- [x] Dark mode toggle with persistence
- [x] Responsive design
- [x] TypeScript implementation
- [x] Redux Toolkit for state management
- [x] Framer Motion animations
- [x] Advanced loading and error states
- [x] Beautiful modern UI design
- [x] Proper image handling with fallbacks
- [x] SEO-friendly structure

## 🔧 API Configuration

The app uses the OMDB API with the provided API key

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── movies/            # Movies pages
│   │   ├── [id]/         # Dynamic movie detail pages
│   │   └── page.tsx      # Movies listing page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (redirects to /movies)
│   └── providers.tsx     # Redux and theme providers
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── DarkModeToggle.tsx
│   ├── Header.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   └── SearchBar.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/             # API services
├── store/                # Redux store and slices
└── types/                # TypeScript type definitions
```

## 🎨 Design Decisions

### State Management

- **Redux Toolkit** for global state management
- Local storage for user preferences (ratings, dark mode)
- Debounced search to optimize API calls

### UI/UX

- Clean, modern design with consistent spacing and typography
- Card-based layout for movie listings
- Smooth transitions and hover effects
- Proper loading states and error handling
- Accessible color contrasts in both light and dark modes

### Performance

- Image optimization with Next.js Image component
- Debounced search to reduce API calls
- Lazy loading and code splitting
- Efficient re-renders with proper React patterns

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌟 Future Enhancements

- Add user authentication
- Implement watchlist functionality
- Add movie recommendations
- Include trailers and additional media
- Add advanced filtering options
- Implement movie comparison features

## 📄 License

This project is licensed under the [MIT License](LICENSE).


---

Built with ❤️ using Next.js and the OMDB API
