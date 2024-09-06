import { useState, useEffect } from "react";
import { NewsItem } from "../type/type";

const useFetchNews = () => {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			const apiUrl = process.env.NEXT_PUBLIC_STEAM_API_URL;

			try {
				const response = await fetch(apiUrl || "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=10", {
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const data = await response.json();
				setNews(data.appnews.newsitems);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, []);

	return { news, loading, error };
};

export default useFetchNews;
