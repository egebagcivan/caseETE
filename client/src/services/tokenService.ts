import jwt_decode from "jwt-decode";
import { UserType } from "../App";

interface JWTPayload {
  exp: number;
  user: {
    id: string;
    username: string;
  };
}

function setToken(token: string): void {
  localStorage.setItem("token", token);
}

function getToken(): string | null {
  let token = localStorage.getItem("token");
  if (!token) return null;

  const payload = jwt_decode<JWTPayload>(token);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

function getUserFromToken(): UserType | null {
  const token = getToken();
  if (token) {
    const decodedToken = jwt_decode<JWTPayload>(token);
    return decodedToken.user as UserType;
  }
  return null;
}

function removeToken(): void {
  localStorage.removeItem("token");
}

export { setToken, getToken, getUserFromToken, removeToken };
