// npm modules
import { useState, useEffect } from 'react';

// services
import * as companyService from '../../services/companyService';

// css
import styles from './Companies.module.css';

// Define the company type (adjust according to your company object structure)
interface Company {
  _id: string;
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyData = await companyService.getAllCompanies();
      setCompanies(companyData);
    }
    fetchCompanies();
  }, []);

  if (!companies.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>;
  }
  
  return (
    <main className={styles.container}>
      <h1>Hello. This is a list of all the companies.</h1>
      {companies.map(company => (
        <div key={company._id}>
          <h2>{company.country}</h2>
          <p>{company.name}</p>
          <p>{company.legalNumber}</p>
          <p>{company.website}</p>
        </div>
      ))}
    </main>
  );
}

export default Companies;
