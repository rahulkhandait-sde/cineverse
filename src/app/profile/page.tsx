"use client";

import { Header } from "../../components/Header";
import { FavoritesSection } from "@/components/FavoritesSection";
import { WatchlistSection } from "@/components/WatchlistSection";
import { WatchedSection } from "@/components/WatchedSection";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
			<Header />
			<main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8">
				<div className="container mx-auto">
					<FavoritesSection />
					<WatchlistSection />
					<WatchedSection />
				</div>
			</main>
		</div>
	);
}
