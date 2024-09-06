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
	// NEXT_PUBLIC_ 접두사를 사용하여 환경 변수 접근
	const apiUrl = process.env.NEXT_PUBLIC_STEAM_API_URL;

	console.log("확인 NEXT_PUBLIC_STEAM_API_URL:", apiUrl);

	if (!apiUrl) {
		throw new Error("NEXT_PUBLIC_STEAM_API_URL 환경 변수가 설정되지 않았습니다.");
	}

	const response = await fetch(apiUrl, {
		cache: "no-store",
	});

	console.log("응답 상태:", response.status);

	if (!response.ok) {
		const errorData = await response.text();
		console.error("데이터 패칭 실패, 상태 코드:", response.status, "응답 내용:", errorData);
		throw new Error("데이터 패칭 실패");
	}

	const data = await response.json();
	console.log("받은 데이터:", data);

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
