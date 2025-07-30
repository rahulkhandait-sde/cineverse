"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import StatChart from "@/components/StatChart";
import CustomTooltip from "@/components/CustomTooltip";
const parseBoxOffice = (value: string): number => {
  if (!value || value === "N/A") return 0;
  return parseInt(value.replace(/[^0-9]/g, ""), 10);
};

const parseRuntime = (runtime: string): number => {
  if (!runtime || runtime === "N/A") return 0;
  return parseInt(runtime.replace(/[^0-9]/g, ""), 10);
};

const parseRating = (rating: string): number => {
  if (!rating || rating === "N/A") return 0;
  return parseFloat(rating);
};

const formatBoxOfficeAxis = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const ComparisonStats = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { compareMovies } = useSelector((state: RootState) => state.compare);

  if (compareMovies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-900 text-center px-4"
      >
        <div className="p-8 text-gray-400 shadow-lg rounded-lg max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-2">
            No Movies to Compare
          </h2>
          <p className="text-sm">
            You haven't added any movies yet. Add some to compare their stats
            here!
          </p>
        </div>
      </motion.div>
    );
  }

  const calculateItemsWithSets = (key: "Actors" | "Genre") => {
    const splitAndTrim = (str: string): string[] => {
      if (!str || str === "N/A") return [];
      return str.split(/,\s*/).map((item) => item.trim());
    };

    if (compareMovies.length < 1) {
      return { common: [], uniquePerMovie: [] };
    }

    const allMovieItemLists = compareMovies.map((movie) =>
      splitAndTrim(movie[key])
    );

    const commonSet = new Set(allMovieItemLists[0]);

    for (let i = 1; i < allMovieItemLists.length; i++) {
      const currentSet = new Set(allMovieItemLists[i]);
      commonSet.forEach((item) => {
        if (!currentSet.has(item)) {
          commonSet.delete(item);
        }
      });
    }

    const common = Array.from(commonSet);

    const uniquePerMovie = allMovieItemLists.map((movieItems) => {
      return movieItems.filter((item) => !commonSet.has(item));
    });

    return { common, uniquePerMovie };
  };

  const { common: commonActors, uniquePerMovie: uniqueActorsMap } =
    calculateItemsWithSets("Actors");
  const { common: commonGenres, uniquePerMovie: uniqueGenresMap } =
    calculateItemsWithSets("Genre");

  const primaryChartData = compareMovies.map((movie) => ({
    title:
      movie.Title.length > 15
        ? `${movie.Title.substring(0, 15)}...`
        : movie.Title,
    fullTitle: movie.Title,
    imdbRating: parseRating(movie.imdbRating),
    boxOffice: parseBoxOffice(movie.BoxOffice),
    runtime: parseRuntime(movie.Runtime),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className="p-4 md:p-6 space-y-8 bg-gradient-to-b from-[#101018] to-[#080810] text-gray-200 shadow-2xl shadow-black/30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 pb-2">
        🎬 Movie Comparison Stats
      </h2>

      <motion.div variants={itemVariants}>
        <StatChart
          title="⏱ Runtime (minutes)"
          dataKey="runtime"
          data={primaryChartData}
          barColor="#a855f7"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatChart
          title="⭐ IMDB Rating"
          dataKey="imdbRating"
          data={primaryChartData}
          barColor="#22c55e"
          domain={[0, 10]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatChart
          title="💰 Box Office (USD)"
          dataKey="boxOffice"
          data={primaryChartData}
          barColor="#f59e0b"
          tickFormatter={formatBoxOfficeAxis}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <InfoSection title="🎭 Genres">
            <p className="text-purple-300 font-medium mb-3">
              Common:{" "}
              {commonGenres.length > 0 ? commonGenres.join(", ") : "None"}
            </p>
            <ul className="space-y-2">
              {compareMovies.map((movie, i) => (
                <li key={movie.imdbID} className="text-sm">
                  <span className="font-bold text-gray-100">
                    {movie.Title}:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {uniqueGenresMap[i].length > 0 ? (
                      uniqueGenresMap[i].map((genre, idx) => (
                        <span
                          key={idx}
                          className="chip bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {genre}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </InfoSection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <InfoSection title="👥 Actors">
            <p className="text-pink-300 font-medium mb-3">
              Common:{" "}
              {commonActors.length > 0 ? commonActors.join(", ") : "None"}
            </p>
            <ul className="space-y-2">
              {compareMovies.map((movie, i) => (
                <li key={movie.imdbID} className="text-sm">
                  <span className="font-bold text-gray-100">
                    {movie.Title}:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {uniqueActorsMap[i].length > 0 ? (
                      uniqueActorsMap[i].map((actor, idx) => (
                        <span
                          key={idx}
                          className="chip bg-pink-500/20 text-pink-300 border border-pink-500/30"
                        >
                          {actor}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </InfoSection>
        </motion.div>
        <motion.div variants={itemVariants}>
          <InfoSection title="🏆 Awards & Release">
            <ul className="space-y-3">
              {compareMovies.map((movie) => (
                <li key={movie.imdbID}>
                  <span className="font-bold text-gray-100">{movie.Title}</span>{" "}
                  ({movie.Year})
                  <p className="text-sm text-amber-300/80 mt-1 pl-2 border-l-2 border-amber-500/30">
                    {movie.Awards}
                  </p>
                </li>
              ))}
            </ul>
          </InfoSection>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <InfoSection title="📊 Ratings from All Sources">
          <div className="space-y-8">
            {compareMovies.map((movie) => (
              <SourceRatingsChart key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </InfoSection>
      </motion.div>
    </motion.div>
  );
};

const SourceRatingsChart = ({ movie }: { movie: any }) => {
  const sourceColorMap: { [key: string]: string } = {
    "Internet Movie Database": "#f59e0b",
    "Rotten Tomatoes": "#ef4444",
    Metacritic: "#10b981",
  };

  const chartData = movie.Ratings.map(
    (rating: { Source: string; Value: string }) => {
      let value = 0;

      if (rating.Value.includes("/100")) {
        value = parseFloat(rating.Value.split("/")[0]);
      } else if (rating.Value.includes("/10")) {
        value = parseFloat(rating.Value.split("/")[0]) * 10;
      } else if (rating.Value.includes("%")) {
        value = parseFloat(rating.Value.replace("%", ""));
      }
      return {
        name: rating.Source,
        value: value,
        displayValue: rating.Value,
        fill: sourceColorMap[rating.Source] || "#6b7280",
      };
    }
  );

  return (
    <div>
      <h4 className="text-purple-300 font-bold mb-3 text-lg">{movie.Title}</h4>
      <ResponsiveContainer width="100%" height={chartData.length * 50}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 120, right: 50 }}
        >
          <CartesianGrid
            stroke="#4b5563"
            strokeDasharray="5 5"
            horizontal={false}
          />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fill: "#d1d5db", fontSize: 14 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="value"
            background={{ fill: "#374151", radius: 4 }}
            radius={4}
          >
            {chartData.map((entry: { fill: string }, index: number) => (
              <Bar key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="displayValue"
              position="right"
              fill="#ffffff"
              fontSize={14}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-800/20 p-5 rounded-xl border border-gray-700/50 h-full transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20">
    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4 pb-2 border-b border-gray-700">
      {title}
    </h3>
    {children}
  </div>
);

export default ComparisonStats;
