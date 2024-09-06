// src/components/ClientHomePage.tsx

"use client"; // 클라이언트 컴포넌트로 선언

import React from "react";
import useFetchNews from "./hook/fetchData";
import NewsList from "./NewsList";

const ClientHomePage: React.FC = () => {
	const { news, error } = useFetchNews(); // 클라이언트 훅 호출

	if (error) {
		return <p>Error: {error}</p>;
	}

	return <NewsList news={news} />;
};

export default ClientHomePage;
