import React, { useState, useEffect, useMemo } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import getIssuesService from '../../../services/getIssuesService';
import getUsersService from '../../../services/getUsersService';
import updateIssueService from '../../../services/updateIssueService';

const filterKeyMap = {
  'Issue ID': 'issueID',
  'Issue Title': 'title',
  'Issue Description': 'description',
  'Status': 'status',
  'Assigned To': 'assignee',
  'Created By': 'createdBy'
};

const IssueList = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ 'Issue ID': '', 'Issue Title': '', 'Issue Description': '', 'Status': '', 'Assigned To': '', 'Created By': '', });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assigneeList, setAssigneeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);  // Set this to how many items you want per page
  const [editableIssue, setEditableIssue] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState('');


  useEffect(() => {
    const getAllData = async () => {
      setIsLoading(true);
      setData(await getIssuesService());
      setAssigneeList(await getUsersService());
      setIsLoading(false);
    };
    getAllData();
  }, []);

  const refresh = async () => {
    setData(await getIssuesService());
  }

  const openModal = (rowData) => {
    setPreviewUrl(null);
    setSelectedRowData(rowData);
    setEditableIssue({ ...rowData });
    console.log(rowData)
    setIsModalOpen(true);
    console.log(rowData);
    if (rowData.attachmentURL)
      setPreviewUrl(rowData.attachmentURL);

  };

  const closeModal = () => setIsModalOpen(false);

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleUpdate = async () => {
    let attachmentDetails = {};
    if (selectedFile) {
      const base64 = await fileToBase64(selectedFile);
      attachmentDetails = {
        base64: base64,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        lastModified: selectedFile.lastModified
      };
    }

    let payload = {
      issueID: editableIssue.issueID,
      title: editableIssue.title,
      description: editableIssue.description,
      assignee: editableIssue.assignee,
      createdBy: editableIssue.createdBy,
      attachmentURL: editableIssue.attachmentURL,
      assignee: Number(editableIssue.assignee),
      attachment: attachmentDetails
    }
    await updateIssueService(payload);
    refresh();
    closeModal();
  }

  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFileType(e.target.files[0].type);

  };


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

  const getFullNameById = (userID) => {
    const user = assigneeList.find((u) => Number(u.userID) === Number(userID));
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  const sortedAndFilteredData = useMemo(() => {
    if (isLoading) return [];
    console.log(data);
    let sortableItems = [...data];

    Object.keys(filters).forEach((filterKey) => {
      const filterValue = filters[filterKey].toLowerCase();

      if (filterValue) {
        console.log(filterKey)
        if (filterKey === 'Assigned To' || filterKey === 'Created By') {
          // Special handling for 'Assigned To' and 'Created By'
          sortableItems = sortableItems.filter((item) => {
            const userID = filterKey === 'Assigned To' ? item.assignee : item.createdBy;
            const user = assigneeList.find((u) => Number(u.userID) === Number(userID));
            const fullName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
            return fullName.includes(filterValue);
          });
        } else {
          // Regular filtering for other columns
          const dataKey = filterKeyMap[filterKey];
          if (dataKey) {
            sortableItems = sortableItems.filter((item) =>
              item[dataKey]?.toString().toLowerCase().includes(filterValue)
            );
          }
        }
      }
    });

    if (sortConfig.key) {
      const sortKey = filterKeyMap[sortConfig.key];  // Ensure to use the mapped key
      sortableItems.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [data, filters, sortConfig, isLoading]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedAndFilteredData]);

  const renderPaginationControls = () => {
    return (
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <span className='text-xs'>Previous</span>
          </button>

          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              className={`join-item btn ${currentPage === pageNumber + 1 ? 'btn-primary' : ''}`}
              onClick={() => setCurrentPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            <span className='text-xs'>Next</span>
          </button>
        </div>
      </div>
    );
  };

  function getStatusClass(status) {
    switch (status) {
      case 'Open':
        return 'primary';
      case 'In Progress':
        return 'warning';
      case 'Resolved':
        return 'success'
      case 'Blocked':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  return (
    <div className="m-5 p-2.5 bg-white w-full rounded-3xl shadow-xl">
      <div className="overflow-x-auto">
        <div className='flex flex-1'>
          <button className='btn btn-light btn-sm' onClick={() => refresh()}>Refresh</button>
        </div>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {['Issue ID', 'Issue Title', 'Issue Description', 'Status', 'Assigned To', 'Created By'].map(key => (
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
            {paginatedData.map((item) => (
              <tr key={item.issueID} onClick={() => openModal(item)} className="cursor-pointer">
                <td className='p-1 text-center'>{item.issueID}</td>
                <td className='p-1'>{item.title}</td>
                <td className='p-1'>{item.description}</td>
                <td className={`p-1  text-center  my-auto mx-auto bg-${getStatusClass(item.status)} bg-gradient`}>{item.status}</td>
                <td className='p-1 text-center'>
                  {
                    (() => {
                      const assignee = assigneeList.find(x => Number(x.userID) === Number(item.assignee));
                      return assignee.profilePhoto ? <div className="avatar rounded-full"  title={assignee.firstName +' '+ assignee.lastName}>
                        <div className="w-12 rounded-full">
                          <img src={assignee.profilePhoto} />
                        </div>
                      </div> : <div className="avatar placeholder rounded-full"  title={assignee.firstName +' '+ assignee.lastName}>
                        <div className="bg-neutral text-neutral-content rounded-full w-12 cursor-pointer">
                          <span className="text-xs">{assignee.firstName[0]} {assignee.lastName[0]}</span>
                        </div>
                      </div>;
                    })()
                  }
                </td>
                <td className='p-1 text-center'>{
                  (() => {
                    const assignee = assigneeList.find(x => Number(x.userID) === Number(item.createdBy));
                    return assignee.profilePhoto ? <div className="avatar rounded-full"  title={assignee.firstName +' '+ assignee.lastName}>
                      <div className="w-12 rounded-full">
                        <img src={assignee.profilePhoto} />
                      </div>
                    </div> : <div className="avatar placeholder rounded-full cursor-pointer" title={assignee.firstName +' '+ assignee.lastName}>
                      <div className="bg-neutral text-neutral-content rounded-full w-12 cursor-pointer">
                        <span className="text-xs">{assignee.firstName[0]} {assignee.lastName[0]}</span>
                      </div>
                    </div>;
                  })()
                }      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPaginationControls()}
      {isModalOpen && selectedRowData && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-xl font-semibold mb-2">Edit Issue</h2>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={editableIssue.title}
                    onChange={(e) => setEditableIssue({ ...editableIssue, title: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    value={editableIssue.description}
                    onChange={(e) => setEditableIssue({ ...editableIssue, description: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select
                    value={editableIssue.status}
                    onChange={(e) => setEditableIssue({ ...editableIssue, status: e.target.value })}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Closed">Closed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Assignee</label>
                  <select
                    value={editableIssue.assignee}
                    onChange={(e) => setEditableIssue({ ...editableIssue, assignee: e.target.value })}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {assigneeList.map((user) => (<option value={user.userID}>{user.firstName + ' ' + user.lastName}</option>))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Created Date</label>
                  <input
                    type="text"
                    value={new Date(editableIssue.createdAt).toLocaleString()}
                    disabled
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Additional fields can be added here similar to the above pattern */}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">File Upload</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
                  />{editableIssue.attachmentURL}
                  {previewUrl && fileType.startsWith('image/') && <img src={previewUrl} alt="Preview" />}
                  {previewUrl && fileType.startsWith('video/') && <video src={previewUrl} controls />}
                  {previewUrl && fileType === 'application/pdf' && <object data={previewUrl} type="application/pdf" width="100%" height="600px" />}
                  {previewUrl && (
                    <div>
                      <iframe src={previewUrl} width="100%" height="250px"></iframe>
                      <a href={previewUrl} target='_blank' download>Download</a>
                    </div>
                  )}
                </div>


              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
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
