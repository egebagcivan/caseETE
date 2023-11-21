// services
import * as tokenService from "./tokenService";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;
import { UserType } from "../App";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface ChangePasswordFormData {
  password: string;
  newPassword: string;
  newPasswordConf: string;
}

async function signup(signupFormData: SignupFormData): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupFormData),
    });
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) {
      tokenService.setToken(json.token);
    }
  } catch (err) {
    throw new Error(err as string);
  }
}

function getUser(): UserType | null {
  return tokenService.getUserFromToken();
}

function logout(): void {
  tokenService.removeToken();
}

async function login(loginFormData: LoginFormData): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginFormData),
    });
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) tokenService.setToken(json.token);
  } catch (err) {
    throw new Error(err as string);
  }
}

async function changePassword(
  changePasswordFormData: ChangePasswordFormData
): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(changePasswordFormData),
    });
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) {
      tokenService.removeToken();
      tokenService.setToken(json.token);
    }
  } catch (err) {
    throw new Error(err as string);
  }
}

export { signup, getUser, logout, login, changePassword };
