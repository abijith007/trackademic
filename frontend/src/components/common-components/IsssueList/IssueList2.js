import React, { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const initialData = [
  {
    "issueID": 1,
    "issueTitle": "Issue 1",
    "issueDescription": "This is issue 1",
    "assignedTo": "User 1",
    "createdBy": "User 2",
    "dueDate": "2022-12-31",
    "modifiedDate": "2022-11-01",
    "createdDate": "2022-10-01"
  },
  {
    "issueID": 2,
    "issueTitle": "Issue 2",
    "issueDescription": "This is issue 2",
    "assignedTo": "User 2",
    "createdBy": "User 1",
    "dueDate": "2023-01-31",
    "modifiedDate": "2022-11-02",
    "createdDate": "2022-10-02"
  },
  {
    "issueID": 3,
    "issueTitle": "Issue 3",
    "issueDescription": "This is issue 3",
    "assignedTo": "User 3",
    "createdBy": "User 2",
    "dueDate": "2023-02-28",
    "modifiedDate": "2022-11-03",
    "createdDate": "2022-10-03"
  },
  {
    "issueID": 4,
    "issueTitle": "Issue 4",
    "issueDescription": "This is issue 4",
    "assignedTo": "User 4",
    "createdBy": "User 2",
    "dueDate": "2023-02-28",
    "modifiedDate": "2022-11-03",
    "createdDate": "2022-10-03"
  },
  {
    "issueID": 5,
    "issueTitle": "Issue 5",
    "issueDescription": "This is issue 5",
    "assignedTo": "User 5",
    "createdBy": "User 2",
    "dueDate": "2023-02-28",
    "modifiedDate": "2022-11-03",
    "createdDate": "2022-10-03"
  }
];

const IssueList = () => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ 'Issue ID': '', 'Issue Title': '', 'Issue Description': '', 'Assigned To': '', 'Created By': '', 'Due Date': '',});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const openModal = (rowData) => {
    console.log(rowData);
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

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
              {['Issue ID', 'Issue Title', 'Issue Description', 'Assigned To', 'Created By', 'Due Date'].map(key => (
                <th key={key} onClick={() => requestSort(key)}>
                  <div className="flex items-center justify-center text-[16px]">
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
              <tr key={item.issueID} onClick={()=> openModal(item)} className="cursor-pointer">
                <td>{item.issueID}</td>
                <td>{item.issueTitle}</td>
                <td>{item.issueDescription}</td>
                <td>
                  {item.assignedTo}                  
                </td>
                <td>{item.createdBy}</td>
                <td>{item.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Render the selected row data here */}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueList;
