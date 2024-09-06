import React from "react";
import { NewsItem } from "./type/type";
import { convertToHTML } from "@/utils/htmlConverter";

interface NewsListProps {
	news: NewsItem[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
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
};

export default NewsList;
