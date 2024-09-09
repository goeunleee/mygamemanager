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
		throw new Error("fetch news data fail");
	}

	const data = await res.json();

	return data.appnews.newsitems;
}
export async function fetchMyGames() {
	const apiKey = process.env.API_KEY;
	const steamId = process.env.MY_STEAM_ID;
	const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;

	try {
		const res = await fetch(url);

		// 1. 응답 상태 코드 확인
		if (!res.ok) {
			throw new Error(`API 요청 실패: 상태 코드 ${res.status}`);
		}

		const data = await res.json();

		// 2. JSON 파싱 후 게임 데이터 처리
		const games: Game[] = data.response.games;

		if (games && games.length > 0) {
			console.log(`You own ${games.length} games:`);
			games.forEach((game: Game) => {
				console.log(`${game.name} - Playtime: ${game.playtime_forever / 60} hours`);
			});
		} else {
			console.log("No games found for this Steam ID.");
		}

		return games; // 게임 목록 반환
	} catch (error) {
		console.error("fetching mygame info fail:", error);
	}
}
