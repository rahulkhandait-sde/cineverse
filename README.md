# 🎬 CineVerse - Premium Movie Search Platform

<p align="center">
  <img src="public/favicon.svg" alt="CineVerse Logo" width="100" height="100">
</p>

<p align="center">
  <strong>A modern, premium movie search application inspired by Netflix, IMDb, and BookMyShow</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Redux-2.8.2-764ABC?style=for-the-badge&logo=redux" alt="Redux Toolkit">
</p>

## 🌟 Features

### 🎨 Premium UI/UX
- **Glassmorphic Design**: Beautiful glass-like effects with backdrop blur
- **Gradient Animations**: Dynamic gradients and smooth transitions
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach that works on all devices
- **Premium Loading States**: Shimmer effects and skeleton screens
- **Interactive Animations**: Smooth hover effects and micro-interactions

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Instant search results with debouncing
- **Smart Filters**: Year range, genre, and type filtering
- **Suggestion Pills**: Clickable search suggestions
- **Infinite Pagination**: Load more movies with progress indicators
- **Empty States**: Beautiful illustrations for no results

### 🎬 Movie Experience
- **Detailed Movie Pages**: Comprehensive movie information
- **Star Ratings**: Interactive 5-star rating system with persistence
- **High-Quality Posters**: Optimized image loading and fallbacks
- **Toast Notifications**: User feedback for interactions
- **Dynamic Titles**: Page titles that update based on content

### ⚡ Performance & Technical
- **Next.js 15**: Latest App Router with optimized performance
- **Redux Toolkit**: Efficient state management
- **React Query**: Server state management and caching
- **TypeScript**: Full type safety
- **PWA Ready**: Manifest and icons for mobile installation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OMDB API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Get your OMDB API key**
   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Sign up for a free API key
   - Copy your API key

4. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```env
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## �️ Tech Stack

### Frontend Framework
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type safety and developer experience

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.19.1** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Component variants

### State Management
- **Redux Toolkit 2.8.2** - Efficient Redux with modern patterns
- **TanStack React Query 5.81.2** - Server state management
- **React Redux 9.2.0** - React bindings for Redux

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles and animations
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # App providers
│   └── movies/
│       ├── page.tsx        # Movies search page
│       └── [id]/page.tsx   # Movie details page
├── components/             # Reusable components
│   ├── ui/                 # Base UI components
│   ├── Header.tsx          # Navigation header
│   ├── SearchBar.tsx       # Search with filters
│   ├── MovieCard.tsx       # Movie display card
│   ├── MovieGrid.tsx       # Movies grid layout
│   ├── LoadingStates.tsx   # Loading and empty states
│   └── DarkModeToggle.tsx  # Theme toggle
├── hooks/                  # Custom React hooks
│   ├── useDebounce.ts      # Search debouncing
│   └── useMovieQueries.ts  # Movie API queries
├── services/               # API services
│   └── movieApi.ts         # OMDB API integration
├── store/                  # Redux store
│   ├── store.ts            # Store configuration
│   └── movieSlice.ts       # Movies state slice
├── types/                  # TypeScript definitions
│   └── movie.ts            # Movie data types
├── lib/                    # Utilities
│   └── utils.ts            # Helper functions
└── providers/              # Context providers
    └── ReactQueryProvider.tsx
```

## � API Integration

### OMDB API
The app uses the [OMDB API](http://www.omdbapi.com/) for movie data:

- **Search Movies**: `GET /?s={query}&type=movie&y={year}`
- **Movie Details**: `GET /?i={imdbID}&type=movie`
- **Rate Limiting**: 1000 requests per day (free tier)

### API Configuration
```typescript
// services/movieApi.ts
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';
```

### Error Handling
- Network error handling with retry logic
- API rate limit detection
- User-friendly error messages
- Fallback states for missing data

## 🎨 Design System

### Color Palette
```css
/* Light Mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;

/* Dark Mode */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 217.2 91.2% 59.8%;
```

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Scales**: text-xs to text-6xl
- **Weights**: 300 (light) to 900 (black)

### Components
- **Glassmorphism**: backdrop-blur with opacity overlays
- **Gradients**: Dynamic color transitions
- **Shadows**: Multi-layer shadows for depth
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## � Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: OMDB API Key
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here

# Optional: Analytics (if implemented)
# NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📱 PWA Support

The app includes PWA (Progressive Web App) features:

- **Manifest**: `public/manifest.json`
- **Icons**: Multiple sizes for different platforms
- **Service Worker**: (Ready for implementation)
- **Mobile Installation**: Add to home screen support

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command `npm run build`, publish directory `out`
- **Railway**: Automatic Next.js deployment
- **Docker**: Dockerfile included for containerization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OMDB API** for providing comprehensive movie data
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the incredible utility-first framework
- **Lucide** for beautiful, consistent icons
- **Next.js team** for the amazing React framework

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include screenshots for UI-related issues

---

<p align="center">
  Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
</p>
