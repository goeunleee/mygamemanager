/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

interface NewsItem {
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
}

function convertToHTML(input: string) {
	const output = input
		.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" alt="Image">')
		.replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>")
		.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>')
		.replace(/\[list\](.*?)\[\/list\]/gs, (match: any, p1: string) => {
			return "<ul>" + p1.replace(/\[\*\](.*?)(?=\[\*|\<\/ul>)/g, "<li>$1</li>") + "</ul>";
		});

	return output;
}

async function HomePage() {
	console.log("STEAM_API_URL:", process.env.STEAM_API_URL); // 환경 변수 출력

	// 환경 변수가 제대로 설정되었는지 확인합니다.
	const apiUrl = process.env.STEAM_API_URL;

	// if (!apiUrl) {
	// 	throw new Error("STEAM_API_URL 환경 변수가 설정되지 않았습니다.");
	// }

	const response = await fetch(apiUrl! ?? "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=5", {
		cache: "no-store", // 서버에서만 호출
	});

	if (!response.ok) {
		throw new Error("데이터를 패치 실패");
	}

	const data = await response.json();
	const news: NewsItem[] = data.appnews.newsitems;

	return (
		<div>
			<h2>게임 뉴스</h2>
			<ul>
				{news.map((item) => (
					<li key={item.gid}>
						<h3>{item.title}</h3>
						<p dangerouslySetInnerHTML={{ __html: convertToHTML(item.contents) }}></p>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							더 읽기
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default HomePage;
