/* eslint-disable @typescript-eslint/no-unused-vars */
import { Game } from "@/components/type/type";
export async function fetchSteamNews() {
	const apiUrl = process.env.STEAM_API_URL;

	if (!apiUrl) {
		throw new Error("steam news api url을 가져올 수 없습니다.");
	}

	const res = await fetch(apiUrl, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("news Api 요청실패");
	}

	const data = await res.json();

	return !apiUrl || !data ? [] : data.appnews.newsitems;
}
export async function fetchMyGames() {
	const apiKey = process.env.API_KEY;
	const steamId = process.env.MY_STEAM_ID;
	const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Mygame API url을 가져올 수 없습니다: code ${res.status}`);
		}

		const data = await res.json();

		const games: Game[] = data.response.games;

		if (games && games.length > 0) {
			console.log(`You own ${games.length} games:`);
			// games.forEach((game: Game) => {
			// 	console.log(`${game.name} - Playtime: ${game.playtime_forever / 60} hours`);
			// });
		} else {
			console.log("No games found for this Steam ID.");
		}

		return games; // 게임 목록 반환
	} catch (error) {
		console.error("fetching mygame info fail:", error);
		return [];
	}
}
