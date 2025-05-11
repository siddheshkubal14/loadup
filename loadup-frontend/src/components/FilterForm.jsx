import React from 'react';

const FilterForm = ({ filters, setFilters }) => {
  return (
    <div>
      <label>
        Location:
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        />
      </label>
      <label>
        License:
        <input
          type="text"
          value={filters.license}
          onChange={(e) => setFilters(prev => ({ ...prev, license: e.target.value }))}
        />
      </label>
    </div>
  );
};

export default FilterForm;
