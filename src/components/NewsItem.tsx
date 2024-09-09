/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { NewsItem } from "@/components/type/type";
import { convertToHTML } from "@/utils/htmlConverter";

interface SteamNewsListProps {
	news: NewsItem[];
}

export default function SteamNewsList({ news }: SteamNewsListProps) {
	return (
		<ul>
			{news.map((item) => (
				<NewsItemComponent key={item.gid} item={item} />
			))}
		</ul>
	);
}

function NewsItemComponent({ item }: { item: NewsItem }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	const IMG_REPLACEMENTS = {
		"{STEAM_CLAN_IMAGE}": "https://clan.akamai.steamstatic.com/images/",
		"{STEAM_CLAN_LOC_IMAGE}": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/clans",
	};

	// 1. 정규식으로 [img] 태그 안의 이미지 URL 추출 및 변환
	function replaceSteamPlaceholders(imageUrl: string): string {
		let src = imageUrl;
		for (const [placeholder, replacement] of Object.entries(IMG_REPLACEMENTS)) {
			src = src.replace(placeholder, replacement);
		}
		return src;
	}
	// 이미지 URL 추출
	const imageMatch = item.contents.match(/\[img\](.*?)\[\/img\]/);
	const rawImageUrl = imageMatch ? imageMatch[1] : null;
	const imageUrl = rawImageUrl ? replaceSteamPlaceholders(rawImageUrl) : null;
	// 2. 정규식으로 직접 포함된 <img src="..."> 태그 추출
	const directImageMatch = item.contents.match(/<img.*?src="(.*?)".*?>/);
	const directImageUrl = directImageMatch ? directImageMatch[1] : null;

	const finalImageUrl = imageUrl || directImageUrl;

	return (
		<li className="newsItem" onClick={handleToggle}>
			<h4 style={{ cursor: "pointer" }}>{item.title}</h4>

			{/* 접혀있을때 */}
			{!isExpanded && finalImageUrl && (
				<p>
					<a href={item.url} target="_blank" rel="noopener noreferrer">
						<img src={finalImageUrl} alt="Steam News" width="100" height="100" />
					</a>
					<div>더 읽기</div>
				</p>
			)}

			{/* 펴졌을때 */}
			{isExpanded && (
				<>
					<p dangerouslySetInnerHTML={{ __html: convertToHTML(item.contents) }}></p>
					<a href={item.url} target="_blank" rel="noopener noreferrer" className="readMore">
						뉴스 포털 이동
					</a>
				</>
			)}
		</li>
	);
}
