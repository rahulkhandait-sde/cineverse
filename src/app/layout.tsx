import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "CineVerse - Premium Movie Discovery Platform",
		template: "%s | CineVerse",
	},
	description:
		"Discover millions of movies, TV series, and episodes with CineVerse - Your premium cinematic universe awaits. Search, explore, and rate your favorite content in stunning 4K quality.",
	keywords: [
		"movies",
		"tv series",
		"cinema",
		"entertainment",
		"streaming",
		"movie database",
		"film discovery",
		"premium content",
	],
	authors: [{ name: "CineVerse Team" }],
	creator: "CineVerse",
	publisher: "CineVerse",
	applicationName: "CineVerse",
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://cineverse.app",
		siteName: "CineVerse",
		title: "CineVerse - Premium Movie Discovery Platform",
		description:
			"Discover millions of movies, TV series, and episodes with CineVerse - Your premium cinematic universe awaits.",
		images: [
			{
				url: "/favicon.svg",
				width: 512,
				height: 512,
				alt: "CineVerse Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@CineVerse",
		creator: "@CineVerse",
		title: "CineVerse - Premium Movie Discovery Platform",
		description:
			"Discover millions of movies, TV series, and episodes with CineVerse - Your premium cinematic universe awaits.",
		images: ["/favicon.svg"],
	},
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml", sizes: "32x32" },
			{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
			{ url: "/icon-512.svg", type: "image/svg+xml", sizes: "512x512" },
		],
		apple: [
			{ url: "/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" },
		],
		shortcut: "/favicon.ico",
	},
	manifest: "/manifest.json",
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5,
		userScalable: true,
	},
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              try {
                const darkMode = localStorage.getItem('darkMode');
                if (darkMode === 'true' || (!darkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
