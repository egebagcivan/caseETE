import * as tokenService from "./tokenService";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/companies`;

interface Company {
  _id: string;
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
  createdAt: string;
}

async function getAllCompanies(): Promise<Company[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Company[];
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}
async function createCompany(company: Company): Promise<Company> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(company),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Company;
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

async function updateCompany(company: Company): Promise<Company> {
  try {
    const res = await fetch(`${BASE_URL}/${company._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(company),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Company;
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

async function deleteCompany(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

export { getAllCompanies, createCompany, updateCompany, deleteCompany };
