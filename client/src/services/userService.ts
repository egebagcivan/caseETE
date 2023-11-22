import * as tokenService from "./tokenService";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/users`;

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

async function getAllUsers(): Promise<User[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as User[];
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

export { getAllUsers };
