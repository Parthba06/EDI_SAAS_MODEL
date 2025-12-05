import { useEffect, useState } from "react";

interface YouTubeStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

export default function useYouTube(channelId: string) {
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
        );
        const json = await res.json();
        const s = json.items?.[0]?.statistics;

        if (s) {
          setStats({
            subscriberCount: s.subscriberCount,
            viewCount: s.viewCount,
            videoCount: s.videoCount,
          });
        }
      } catch (e) {
        console.error("YouTube API Error:", e);
      }
    }
    fetchStats();
  }, [channelId]);

  return stats;
}
