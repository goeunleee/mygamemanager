/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DataFetcher.tsx

import React, { useEffect, useState } from "react";

interface NewsItem {
	gid: string;
	title: string;
	url: string;
	contents: string;
}

const Fetch_News: React.FC = () => {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=5");

				if (!response.ok) {
					throw new Error("데이터를 불러오는데 실패했습니다.");
				}

				const data = await response.json();
				setNews(data.appnews.newsitems);
			} catch (error: any) {
				setError(error.message);
			}
		};

		fetchData();
	}, []);

	if (error) return <div>오류 발생: {error}</div>;

	return (
		<div>
			<h2>게임 뉴스</h2>
			<ul>
				{news.map((item) => (
					<li key={item.gid}>
						<h3>{item.title}</h3>
						<p>{item.contents}</p>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							더 읽기
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Fetch_News;
