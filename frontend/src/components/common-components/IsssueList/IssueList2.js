import React, { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ArrowDown size={16} /> : <ArrowUp size={16} />;
    }
    return null;
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const sortedAndFilteredData = useMemo(() => {
    let sortableItems = [...data];
    
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        sortableItems = sortableItems.filter((item) => item[key].toString().toLowerCase().includes(filters[key].toLowerCase()));
      }
    });

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

  return (
    <div className="m-5 p-2.5 bg-white w-full rounded-3xl shadow-xl">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
        <thead>
            <tr className='bg-red-600'>
              {['id', 'name', 'country', 'job', 'color'].map(key => (
                <th key={key} onClick={() => requestSort(key)}>
                  <div className="flex items-center justify-center">
                    {key.charAt(0).toUpperCase() + key.slice(1)} {renderSortIcon(key)}
                  </div>
                </th>
              ))}
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
