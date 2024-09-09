import { fetchMyGames, fetchSteamNews } from "@/api/getSteamApi";
import GameList from "@/components/Games/GameList";
import SteamNewsList from "@/components/NewsItem";

export default async function HomePage() {
	const news = await fetchSteamNews();
	if (!news || news.length === 0) {
		return <p>No news available</p>;
	}

	const myGame = await fetchMyGames();

	// console.log("Fetched Games:", myGame);
	return (
		<div>
			<h3>Steam News</h3>
			<SteamNewsList news={news} />
			<h3>Your Played Games</h3>
			<GameList games={myGame} />
		</div>
	);
}
