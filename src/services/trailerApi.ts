// src/services/trailerApi.ts

const YT_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YT_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export interface TrailerResult {
    videoId: string;
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnailUrl: string;
}

function buildQuery(title: string, year?: string) {
    const parts = [title, year, "official trailer"].filter(Boolean);
    return parts.join(" ");
}

export const trailerApi = {
    async searchTrailerByTitle(title: string, year?: string): Promise<TrailerResult | null> {
        if (!YT_API_KEY) {
            throw new Error(
                "YouTube API key is not configured. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your environment variables."
            );
        }

        const params = new URLSearchParams({
            key: YT_API_KEY,
            q: buildQuery(title, year),
            maxResults: "5",
            part: "snippet",
            type: "video",
            videoEmbeddable: "true",
            safeSearch: "strict",
        });

        try {
            const resp = await fetch(`${YT_SEARCH_URL}?${params.toString()}`, {
                // Cache for a short while to reduce rate usage on client
                next: { revalidate: 60 },
            } as any);

            if (!resp.ok) {
                if (resp.status === 403 || resp.status === 429) {
                    // Rate limited or quota exceeded
                    return null;
                }
                throw new Error(`YouTube API error: ${resp.status}`);
            }

            const data = await resp.json();
            const items: any[] = data.items || [];
            if (items.length === 0) return null;

            // Prefer titles that include both the movie title and the word trailer
            const normalizedTitle = title.toLowerCase();
            const scored = items
                .map((item) => {
                    const snippet = item.snippet;
                    const videoId = item.id?.videoId as string | undefined;
                    if (!videoId) return null;
                    const t = (snippet.title as string).toLowerCase();
                    const ch = (snippet.channelTitle as string) || "";
                    let score = 0;
                    if (t.includes("trailer")) score += 2;
                    if (t.includes(normalizedTitle)) score += 2;
                    if (year && t.includes(String(year))) score += 1;
                    // Slightly prefer verified/movie studio-looking channels (heuristic)
                    if (/warner|universal|sony|paramount|lionsgate|marvel|netflix|prime/i.test(ch)) score += 1;
                    return {
                        score,
                        result: {
                            videoId,
                            title: snippet.title as string,
                            channelTitle: snippet.channelTitle as string,
                            publishedAt: snippet.publishedAt as string,
                            thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "",
                        } as TrailerResult,
                    };
                })
                .filter(Boolean) as Array<{ score: number; result: TrailerResult }>;

            if (scored.length === 0) return null;
            scored.sort((a, b) => b.score - a.score);
            return scored[0].result;
        } catch (err) {
            // Fail soft and return null in UI
            return null;
        }
    },
};


