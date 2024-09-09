export async function fetchSteamNews() {
	const apiUrl = process.env.NEXT_PUBLIC_STEAM_API_URL;

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
