import React from "react";
import { Game } from "../type/type";
function GameIcon({ appid, img_icon_url }: { appid: number; img_icon_url: string }) {
	const imageUrl = `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_icon_url}.jpg`;

	return <img src={imageUrl} alt="Game Icon" width="50" height="50" style={{ borderRadius: 50 }} />;
}
// import GameIcon from "./GameIcon";

export default function GameList({ games }: { games: Game[] }) {
	return (
		<ul>
			{games.map((game) => (
				<li key={game.appid} style={{ listStyle: "none", marginBottom: "10px" }}>
					<h4>{game.name}</h4>
					<GameIcon appid={game.appid} img_icon_url={game.img_icon_url} />
					<p>Playtime: {Math.floor(game.playtime_forever / 60)} hours</p>
				</li>
			))}
		</ul>
	);
}
