import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-filter mt-4">
      <input
        type="text"
        className='form-control'
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
