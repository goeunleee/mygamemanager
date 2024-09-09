export type NewsItem = {
	gid: string;
	title: string;
	url: string;
	is_external_url: boolean;
	author: string;
	contents: string;
	feedlabel: string;
	date: number;
	feedname: string;
	feed_type: number;
	appid: number;
	tags: string[];
};

export type Game = {
	appid: number; // 게임의 고유 ID (숫자)
	name: string; // 게임 이름 (문자열)
	playtime_forever: number; // 총 플레이 시간 (분 단위)
	img_icon_url: string; // 게임 아이콘의 해시 URL (문자열)
	playtime_windows_forever: number; // Windows에서의 총 플레이 시간 (분 단위)
	playtime_mac_forever: number; // Mac에서의 총 플레이 시간 (분 단위)
	playtime_linux_forever: number; // Linux에서의 총 플레이 시간 (분 단위)
};
