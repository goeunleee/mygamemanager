// src/app/page.tsx (서버 컴포넌트)
import { fetchSteamNews } from "@/api/getSteamApi";
import SteamNewsList from "@/components/NewsItem";

export default async function HomePage() {
	const news = await fetchSteamNews();
	// console.log("Fetched News:", news);
	if (!news || news.length === 0) {
		return <p>No news available</p>;
	}

	return (
		<div>
			<h2>Steam News</h2>
			<SteamNewsList news={news} />
		</div>
	);
}
