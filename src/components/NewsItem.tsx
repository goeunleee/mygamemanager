/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // 클라이언트 컴포넌트 선언

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
	const [isExpanded, setIsExpanded] = useState(false); // 클릭 여부 상태 관리

	const handleToggle = () => {
		setIsExpanded(!isExpanded); // 클릭 시 상태 토글
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

			{/* isExpanded가 false일 때 이미지가 있으면 보여줌 */}
			{!isExpanded && finalImageUrl && (
				<p>
					<a href={item.url} target="_blank" rel="noopener noreferrer">
						<img src={finalImageUrl} alt="Steam News" width="100" height="100" />
					</a>
					<p>더 읽기</p>
				</p>
			)}

			{/* isExpanded가 true일 때 전체 내용을 보여줌 */}
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
