import { injectable } from "inversify";
import { JWT_CONFIG } from "./jwtService.config";
import jsonwebtoken from "jsonwebtoken";

type TExpirationTime = `${number}d`;
type TGenerateTokenPayload = Omit<JWTPayload, "iat" | "exp">;
type TokenPair = {
	accessToken: string;
	refreshToken: string;
};

interface JWTPayload {
	iss?: string;
	sub?: string;
	aud?: string;
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
	userId: string;
	username: string;
	email: string;
}

export interface IJWTService {
	generateAccessToken: (
		payload: TGenerateTokenPayload
	) => TokenPair["accessToken"];
	generateRefreshToken: (
		payload: TGenerateTokenPayload
	) => TokenPair["refreshToken"];
	generateTokenPair: (payload: TGenerateTokenPayload) => TokenPair;
	verifyAccessToken: (token: string) => JWTPayload;
	verifyRefreshToken: (token: string) => JWTPayload;
	decodeToken: (token: string) => JWTPayload | null;
}

@injectable()
export class JWTService implements IJWTService {
	constructor() {}

	generateAccessToken(payload: TGenerateTokenPayload) {
		const token = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.ACCESS_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn:
					JWT_CONFIG.ACCESS_TOKEN_EXPIRATION_TIME as TExpirationTime,
			}
		);
		return token;
	}

	generateRefreshToken(payload: TGenerateTokenPayload) {
		const token = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.REFRESH_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn:
					JWT_CONFIG.REFRESH_TOKEN_EXPIRATION_TIME as TExpirationTime,
			}
		);
		return token;
	}

	generateTokenPair(payload: TGenerateTokenPayload) {
		const accessToken = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.ACCESS_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn:
					JWT_CONFIG.ACCESS_TOKEN_EXPIRATION_TIME as TExpirationTime,
			}
		);

		const refreshToken = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.REFRESH_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn:
					JWT_CONFIG.REFRESH_TOKEN_EXPIRATION_TIME as TExpirationTime,
			}
		);
		return { accessToken, refreshToken };
	}

	verifyAccessToken(token: TokenPair["accessToken"]): JWTPayload {
		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const decoded = jsonwebtoken.verify(
				token,
				JWT_CONFIG.ACCESS_TOKEN_SECRET
			) as JWTPayload;

			if (!decoded.userId || !decoded.email) {
				throw new Error("Invalid token payload structure");
			}

			return decoded;
		} catch (error) {
			if (error instanceof jsonwebtoken.TokenExpiredError) {
				throw new Error("Token has expired");
			}
			throw new Error("Invalid access token");
		}
	}

	verifyRefreshToken(token: TokenPair["refreshToken"]): JWTPayload {
		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const decoded = jsonwebtoken.verify(
				token,
				JWT_CONFIG.REFRESH_TOKEN_SECRET
			) as JWTPayload;

			if (!decoded.userId || !decoded.email) {
				throw new Error("Invalid token payload structure");
			}

			return decoded;
		} catch (error) {
			if (error instanceof jsonwebtoken.TokenExpiredError) {
				throw new Error("Token has expired");
			}
			throw new Error("Invalid refresh token");
		}
	}

	decodeToken(
		token: TokenPair["accessToken" | "refreshToken"]
	): JWTPayload | null {
		try {
			const decoded = jsonwebtoken.decode(token) as JWTPayload | null;

			if (
				decoded &&
				decoded.username &&
				decoded.email &&
				decoded.userId
			) {
				return decoded;
			}
			return null;
		} catch {
			return null;
		}
	}
}
