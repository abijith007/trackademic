import React, { useState } from 'react';
import { Megaphone, X, Nfc } from 'lucide-react';

const announcements = [
  { id: 1, title: "Announcement 1", content: "Content for Announcement 1" },
  { id: 2, title: "Announcement 2", content: "Content for Announcement 2" },
  { id: 3, title: "Announcement 3", content: "Content for Announcement 3" },
  // ... more announcements
];

function Announcement() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (announcement) => {
    setShowModal(true);
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className='border h-100 p-5 rounded-3xl shadow-xl bg-white'>
      <h4 className='text-center my-auto'>
        <span className='flex flex-1'>Announcements <Megaphone className='ms-3' size={32} color='orange' /><Nfc className='me-3' size={30} color='orange' /></span>
      </h4>
      <ul className='ps-0 mb-0 my-auto'>
        {announcements.map((announcement) => (
          <li key={announcement.id} className="cursor-pointer bg-gray-100 p-3 mt-4 rounded-3xl mx-auto" onClick={() => handleOpenModal(announcement)}>
            {announcement.title}
          </li>
        ))}
      </ul>
      <div className='flex flex-1'>
        <button className='mt-3 btn btn-outline-primary ms-auto p-2'><span className='text-md'>Show More</span></button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="flex h-full justify-center items-center">
            <div className="modal-box w-10/12 max-w-3xl relative">
              <form method="dialog">                
                <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={() => handleCloseModal()}><X size={26} /></button>
              </form>
              <h2 className="text-3xl flex flex-1 "><Megaphone size={36} color='orange' /><Nfc className='me-3' size={36} color='orange' />{selectedAnnouncement.title}</h2>
              <p className="py-4 text-lg">{selectedAnnouncement.content}</p>
              <div className="modal-action">
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
