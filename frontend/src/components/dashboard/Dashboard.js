// Dashboard.js
import React from 'react';
import NavBar from '../common-components/NavBar/NavBar';
import SideDrawer from '../common-components/SideDrawer/SideDrawer';
import CardStatistics from '../common-components/Card/CardStatistics';
import { Bug, ClipboardCheck } from 'lucide-react';
import Clock from '../common-components/Clock/Clock';

function Dashboard() {
  // Assuming NavBar height is 64px, adjust if different
  const adjustedHeight = 'calc(100vh - 64px)';

  return (
    <>
      <NavBar />
      <div className="flex h-screen overflow-hidden">
        <div className="z-10" style={{ height: adjustedHeight }}>
          <SideDrawer />
        </div>
        <div className="flex-1 overflow-auto" style={{ height: adjustedHeight }}>
          <div className="my-5 container">
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              <CardStatistics
                title={"Open Issues"}
                value={"90"}
                valueColor={"text-red-500"}
                titleColor={"text-red-500"}
                icon={<Bug size={42} />}
              />
              <CardStatistics
                title={"Closed Issues"}
                value={"130"}
                valueColor={"text-green-500"}
                titleColor={"text-green-500"}
                icon={<ClipboardCheck size={42} strokeWidth={1.75} />}
              />
              <CardStatistics 
                title={"Closed Issues"} 
                value={"130"} 
                valueColor={"text-green-500"} 
                titleColor={"text-green-500"} 
                icon={<ClipboardCheck size={42} strokeWidth={1.75} />}
              />
              <CardStatistics 
                title={"Closed Issues"} 
                value={"130"} 
                valueColor={"text-green-500"} 
                titleColor={"text-green-500"} 
                icon={<ClipboardCheck size={42} strokeWidth={1.75} />}
              />
              {/* Add more CardStatistics as needed */}
              <div className='w-40 mx-auto'>
                <Clock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default Dashboard;
