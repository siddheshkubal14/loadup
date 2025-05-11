import React, { useEffect, useState } from 'react';
import { fetchApplicants } from './services/api';
import ApplicantList from './components/ApplicantList/ApplicantList';
import axios from 'axios';
import './App.css';

const App = () => {
  const [filters, setFilters] = useState({ location: '', license: '' });
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const limit = 10;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeFilters = {};
        Object.keys(filters).forEach((key) => {
          const val = filters[key].trim();
          if (val) activeFilters[key] = val;
        });

        const data = await fetchApplicants({ ...activeFilters, page, limit });
        setApplicants(data?.data);
        setTotalPages(data?.dataObj?.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [filters, page]);

  useEffect(() => {
    setPage(1); 
  }, [filters]);


  const handleContact = async () => {
    console.log(applicants);
    const ids = applicants.map(applicant => applicant.ID);
    await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/applicants`, { applicantIds: ids });
    alert('Mock contact initiated. Check backend logs.');
  };

  return (
    <div className="app-container">
      <h1>Applicant Dashboard</h1>

      <div className="filters">
        <span>Location</span>
        <input
          type="text"
          name="location"
          placeholder="eg: 50067"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <span>License</span>
        <input
          type="text"
          name="license"
          placeholder="eg: CE"
          value={filters.license}
          onChange={handleFilterChange}
        />
      </div>

      {error && <p className="error">{error}</p>}
      <ApplicantList applicants={applicants} />
      <button disabled={!applicants.length} className={!applicants.length ? 'disabled' : 'contact-button'} onClick={handleContact}>Contact All</button>

      <div style={{ marginTop: '1rem' }}>
        <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}
          className={page === 1 ? 'disabled' : ''}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}
          className={page === totalPages ? 'disabled' : ''}>Next</button>
      </div>
    </div>
  );
};

export default App;
