import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import createIssueService from '../../../services/createIssueService';
import getUsersService from '../../../services/getUsersService';

const CreateIssue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);
  
  const handleButtonClick = async () => {
    setIsModalOpen(true);    
    setAssignees(await getUsersService());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log(assignees);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const assignee = Number(event.target.elements.assignee.value);
    const status = 'todo';
    const createdBy = 1;
    const formData = {
      title,
      description,      
      assignee,
      status,
      createdBy
    };
    createIssueService(formData);

    handleCloseModal();
  };  

  return (
    <div className="fixed top-0 right-0 m-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full mt-5 p-1"
        onClick={handleButtonClick}
      >
        <Plus size={35} />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className='modal-box w-11/12 max-w-5xl'>
            <div className="flex justify-between items-center">
              <h2>Create Issue</h2>
              <span onClick={()=>
                handleCloseModal()
              }><X/></span>
            </div>
            <hr />
            <form className="bg-white rounded px-8 pb-4" onSubmit={handleSubmit}>
              <div className='grid grid-rows-2 grid-cols-2 gap-5'>
              <div >
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="title">
                  Issue Title
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter issue title" />
              </div>

              <div>
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="description">
                  Issue Description
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Describe the issue" rows="3"></textarea>
              </div>

              <div>
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="due-date">
                  Due Date
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dueDate" type="date" />
              </div>

              <div>
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="assigned-to">
                  Assigned To
                </label>
                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="assignee">
                  {assignees?.map(assignee => (
                    <option key={assignee.userID} value={assignee.userID}>{assignee.firstName + ' ' + assignee.lastName}</option>
                  ))}
                </select>
              </div>
              </div>
              <div className="flex items-center justify-end">
                <button className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateIssue;
