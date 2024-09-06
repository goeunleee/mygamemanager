// src/app/page.tsx
import { NewsItem } from "@/components/type/type";
import React from "react";
import { convertToHTML } from "@/utils/htmlConverter";
async function fetchNews() {
	const res = await fetch("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=10", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch news");
	}

	const data = await res.json();
	return data.appnews.newsitems;
}

const HomePage = async () => {
	const news: NewsItem[] = await fetchNews();

	return (
		<div>
			<h2>Steam News</h2>
			<ul>
				{news.map((item) => (
					<li key={item.gid} className="newsItem">
						<h4>{item.title}</h4>
						<p dangerouslySetInnerHTML={{ __html: convertToHTML(item.contents) }}></p>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							더 읽기
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
