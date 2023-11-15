import React, { useState, useMemo } from 'react';

// Sample data
const initialData = [
  { id: 1, name: 'Hart Hagerty', country: 'United States', job: 'Desktop Support Technician', color: 'Purple' },
  { id: 2, name: 'Brice Swyre', country: 'China', job: 'Tax Accountant', color: 'Red' },
  { id: 3, name: 'Marjy Ferencz', country: 'Russia', job: 'Office Assistant I', color: 'Crimson' },
  { id: 4, name: 'Yancy Tear', country: 'Brazil', job: 'Community Outreach Specialist', color: 'Indigo' },
  // Add more data as needed
];

const IssueList = () => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ id: '', name: '', country: '', job: '', color: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to handle filtering
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  // Memoized data for sorting and filtering
  const sortedAndFilteredData = useMemo(() => {
    let sortableItems = [...data];

    // Filtering
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        sortableItems = sortableItems.filter((item) => item[key].toString().toLowerCase().includes(filters[key].toLowerCase()));
      }
    });

    // Sorting
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [data, filters, sortConfig]);

  // Render
  return (
    <div className="m-5 p-2.5 bg-white w-full rounded-3xl shadow-xl">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className='bg-red-600'>
              <th onClick={() => requestSort('id')}>ID</th>
              <th onClick={() => requestSort('name')}>Name</th>
              <th onClick={() => requestSort('country')}>Country</th>
              <th onClick={() => requestSort('job')}>Job</th>
              <th onClick={() => requestSort('color')}>Favorite Color</th>
            </tr>
            <tr>
              {Object.keys(filters).map(key => (
                <th key={key}>
                  <input
                    type="text"
                    value={filters[key]}
                    onChange={(e) => handleFilterChange(e, key)}
                    placeholder={`Filter by ${key}`}
                    className="input input-bordered input-xs w-full"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>
                  {item.job}
                  <br />
                  <span className="badge badge-accent">{item.job}</span>
                </td>
                <td>{item.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueList;
