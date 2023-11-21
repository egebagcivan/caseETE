// npm modules
import jwt_decode from 'jwt-decode';
import { UserType } from '../App';

// Define the structure of the JWT payload
interface JWTPayload {
  exp: number;
  user: {
    // Define user properties here
    // For example:
    id: string;
    username: string;
    // ... other user properties
  };
}

function setToken(token: string): void {
  localStorage.setItem('token', token);
}

function getToken(): string | null {
  let token = localStorage.getItem('token');
  if (!token) return null;
  
  const payload = jwt_decode<JWTPayload>(token);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

function getUserFromToken(): UserType | null {
  const token = getToken();  // Burada direkt olarak getToken() kullanılıyor
  if (token) {
    const decodedToken = jwt_decode<JWTPayload>(token);
    return decodedToken.user as UserType; // UserType'a uygun dönüşüm
  }
  return null;
}



function removeToken(): void {
  localStorage.removeItem('token');
}

export { setToken, getToken, getUserFromToken, removeToken };
