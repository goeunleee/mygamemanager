require("dotenv").config();

module.exports = {
	env: {
		NEXT_PUBLIC_STEAM_API_URL: process.env.STEAM_API_URL,
	},
};
