import React from 'react';
import './ApplicantList.css';

const ApplicantList = ({ applicants }) => {
  if (!applicants || applicants.length === 0) {
    return <p>No applicants found.</p>;
  }

  return (
    <div className="applicant-table-container">
      <table className="applicant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone</th>
            <th>License</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((a) => (
            <tr key={a.id || a.ID}>
              <td>{a.id || a.ID}</td>
              <td>{a.name || a.Name}</td>
              <td>{a.location || a.PostalCode}</td>
              <td>{a.email || a.Email}</td>
              <td>{a.phone || a.Phone}</td>
              <td>{a.FormInfo?.find(f => f.question === 'Führerschein')?.answers || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantList;
