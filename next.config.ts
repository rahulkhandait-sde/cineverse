import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				port: "",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "ia.media-imdb.com",
				port: "",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "images-na.ssl-images-amazon.com",
				port: "",
				pathname: "/images/**",
			},
		],
	},
};

export default nextConfig;
