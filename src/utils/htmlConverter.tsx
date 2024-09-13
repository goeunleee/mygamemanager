// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToHTML(input: string): string {
	const imageBaseUrl = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/";

	const output = input
		// {STEAM_CLAN_IMAGE} 플레이스홀더를 실제 이미지 URL로 변환
		.replace(/\{STEAM_CLAN_IMAGE\}/g, imageBaseUrl)
		.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" alt="Image" width="300" height="300">') // 이미지 크기 설정
		.replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>")
		.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>')
		.replace(/\[list\](.*?)\[\/list\]/gs, (match: any, p1: string) => {
			return "<ul>" + p1.replace(/\[\*\](.*?)(?=\[\*|\<\/ul>)/g, "<li>$1</li>") + "</ul>";
		});

	return output;
}
