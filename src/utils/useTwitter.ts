import { useEffect, useState } from "react";

interface TwitterStats {
  followers_count: number;
  following_count: number;
  tweet_count: number;
  like_count: number;
}

export default function useTwitter(username: string) {
  const [stats, setStats] = useState<TwitterStats | null>(null);

  useEffect(() => {
    async function fetchTwitter() {
      try {
        const res = await fetch(`http://localhost:4000/twitter/${username}`);
        const json = await res.json();
        const m = json?.data?.public_metrics;

        if (m) {
          setStats({
            followers_count: m.followers_count,
            following_count: m.following_count,
            tweet_count: m.tweet_count,
            like_count: m.like_count,
          });
        }
      } catch (e) {
        console.error("Twitter Fetch Error:", e);
      }
    }
    fetchTwitter();
  }, [username]);

  return stats;
}
