import { fetchMyGames, fetchSteamNews } from "@/api/getSteamApi";
import SteamNewsList from "@/components/NewsItem";

export default async function HomePage() {
	const news = await fetchSteamNews();
	// console.log("Fetched News:", news);
	if (!news || news.length === 0) {
		return <p>No news available</p>;
	}

	const myGame = await fetchMyGames();
	// 서버 콘솔에 로그 출력
	console.log("Fetched Games:", myGame); // 이 로그는 서버 터미널에 출력됩니다
	return (
		<div>
			<h2>Steam News</h2>
			<SteamNewsList news={news} />
		</div>
	);
}
