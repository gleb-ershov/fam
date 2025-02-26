const REFRESH_TOKEN_EXPIRATION_TIME =
	process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || "14d";
const ACCESS_TOKEN_EXPIRATION_TIME =
	process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || "30m";

export const JWT_CONFIG = {
	ACCESS_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "",
	ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "",
};

if (!JWT_CONFIG.ACCESS_TOKEN_SECRET) {
	throw new Error("JWT_ACCESS_TOKEN_SECRET is not set");
}

if (!JWT_CONFIG.REFRESH_TOKEN_SECRET) {
	throw new Error("JWT_REFRESH_TOKEN_SECRET is not set");
}
