// services
import * as tokenService from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/companies`;

interface Company {
  _id: string; // MongoDB için gerekli olan _id alanını ekleyin
  name: string;
  legalNumber: string;
  country: string;
  website?: string; // Opsiyonel olarak işaretlenmiş
}

async function getAllCompanies(): Promise<Company[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return await res.json() as Company[];
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

export { getAllCompanies };
