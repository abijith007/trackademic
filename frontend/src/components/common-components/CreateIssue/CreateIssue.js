import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import createIssueService from '../../../services/createIssueService';
import getUsersService from '../../../services/getUsersService';

const CreateIssue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [file, setFile] = useState(null);
  const [userID, setUserID] = useState(useSelector(state => state.user.userDetails.userID));

  const handleButtonClick = async () => {
    setIsModalOpen(true);
    setAssignees(await getUsersService());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log(assignees);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state
  };

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;    
    const assignee = event.target.elements.assignee.value;    
    let attachment = '';
    if (file) {
      attachment = await fileToBase64(file); // Await the resolution of the promise
    }

    let payload = {
      title: title,
      description: description,
      assignee: assignee,
      createdBy: userID,
      attachment: attachment
    }
     console.log(attachment); 
    await createIssueService(payload);
    setFile(null);
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
              <span onClick={() =>
                handleCloseModal()
              }><X /></span>
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
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="assigned-to">
                    Attachment
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
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
