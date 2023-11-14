import React from 'react';
import { BellRing, Gauge, HeartHandshake, KanbanSquare } from 'lucide-react';

const SideDrawer = () => {
  return (
    <div className="flex">
      <div style={{ height: 'calc(100vh - 64px)' }} className="group p-3 transition-all duration-500 ease-in-out bg-gray-800 hover:w-48 w-16">
        <div className="flex flex-col items-center">
          <div className="group my-2 flex items-center  hover:bg-blue-500 rounded-lg p-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
            <Gauge size={28} strokeWidth={1.75} className="text-white text-2xl" />
            <span className="ml-2 text-white group-hover:block hidden ">Dashboard</span>
          </div>
          <div className="group my-2 flex items-center  hover:bg-blue-500 rounded-lg p-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
            <KanbanSquare size={28} strokeWidth={1.75} className="text-white text-2xl" />
            <span className="ml-2 text-white group-hover:block hidden">Issue&nbsp;List</span>
          </div>
          <div className="group my-2 flex items-center  hover:bg-blue-500 rounded-lg p-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
            <BellRing size={28} strokeWidth={1.75} className="text-white text-2xl" />
            <span className="ml-2 text-white group-hover:block hidden">Notifications</span>
          </div>
          <div className="group my-2 flex items-center  hover:bg-blue-500 rounded-lg p-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
            <HeartHandshake size={28} strokeWidth={1.75} className="text-white text-2xl" />
            <span className="ml-2 text-white group-hover:block hidden">Feedback</span>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
