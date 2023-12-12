import React, {useEffect, useState} from 'react';
import NavBar from '../common-components/NavBar/NavBar';
import SideDrawer from '../common-components/SideDrawer/SideDrawer';
import CardStatistics from '../common-components/Card/CardStatistics';
import { Bug, ClipboardCheck, RotateCw, ShieldX } from 'lucide-react';
import Clock from '../common-components/Clock/Clock';
import DigitalClock from '../common-components/DigitalClock/DigitalClock';
import Announcement from '../common-components/Announcement/Announcement';
import PieChart from '../common-components/Charts/PieChart/PieChart';
import { LineChart } from '../common-components/Charts/LineChart/LineChart';
import Chatbot from '../common-components/Chatbot/Chatbot';
import getDashboardService from '../../services/getDashboardService';


// const chartdata = [
//   ["Type", "Number of Issues"],
//   ["Open", 11],
//   ["In Progress", 2],
//   ["Resolved", 2],
//   ["Closed", 2],
//   ["Blocked", 7],
// ];

// const chartoptions = {
//   title: "Issues by Status",
//   is3D: true,
// };

// const linedata = [
//   [
//     "Day",
//     "Guardians of the Galaxy",
//     "The Avengers",
//     "Transformers: Age of Extinction",
//   ],
//   [1, 37.8, 80.8, 41.8],
//   [2, 30.9, 69.5, 32.4],
//   [3, 25.4, 57, 25.7],
//   [4, 11.7, 18.8, 10.5],
//   [5, 11.9, 17.6, 10.4],
//   [6, 8.8, 13.6, 7.7],
//   [7, 7.6, 12.3, 9.6],
//   [8, 12.3, 29.2, 10.6],
//   [9, 16.9, 42.9, 14.8],
//   [10, 12.8, 30.9, 11.6],
//   [11, 5.3, 7.9, 4.7],
//   [12, 6.6, 8.4, 5.2],
//   [13, 4.8, 6.3, 3.6],
//   [14, 4.2, 6.2, 3.4],
// ];



function Dashboard() {
  const adjustedHeight = 'calc(100vh - 64px)';
  const [isToggle, setIsToggle] = useState(false)  
  const [opacity, setOpacity] = useState(1);
  const [openIssues, setOpenIssues] = useState(0);
  const [closedIssues, setClosedIssues] = useState(0);
  const [inProgressIssues, setInProgressIssues] = useState(0);
  const [blockedIssues, setBlockedIssues] = useState(0);
  const [resolvedIssues, setResolvedIssues] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [chartData, setChartData] = useState([["Type", "Number of Issues"],
  ["Open", openIssues],
  ["In Progress", inProgressIssues],
  ["Resolved", resolvedIssues],
  ["Closed", closedIssues],
  ["Blocked", blockedIssues],]);

  const lineoptions = {
    chart: {
      title: "Type of Issues Created Timeline",

    },
  };

  const chartoptions = {
    title: "Issues by Status",
    is3D: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardService();
      setOpenIssues(response.openIssues);
      setClosedIssues(response.closedIssues);
      setInProgressIssues(response.inProgressIssues);
      setBlockedIssues(response.blockedIssues);
      setResolvedIssues(response.resolvedIssues);
      setLineData(response.lineData);
    };
  
    fetchData();
  
    // Update chartData after state updates
    setChartData([
      ["Type", "Number of Issues"],
      ["Open", openIssues],
      ["In Progress", inProgressIssues],
      ["Resolved", resolvedIssues],
      ["Closed", closedIssues],
      ["Blocked", blockedIssues],
    ]);
  }, [openIssues, closedIssues, inProgressIssues, blockedIssues, resolvedIssues]);
  

 
  const toggleClock = () => {
    setOpacity(0);
    setTimeout(() => {
      setIsToggle(!isToggle);
      setOpacity(1); 
    }, 500); 
  }

  return (
    <>
      <NavBar />
      <div className="flex h-100 overflow-hidden">
        <div className="" style={{ height: adjustedHeight }}>
          <SideDrawer />
        </div>
        <div className="flex-1 overflow-auto" style={{ height: adjustedHeight }}>
          <div className="mt-5 container">
            <div className="grid grid-rows-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <CardStatistics
                title={"Open Issues"}
                value={openIssues}
                valueColor={"text-red-500"}
                titleColor={"text-red-500"}
                icon={<Bug size={42} />}
              />
              <CardStatistics
                title={"Closed Issues"}
                value={closedIssues}
                valueColor={"text-green-500"}
                titleColor={"text-green-500"}
                icon={<ClipboardCheck size={42} strokeWidth={1.75} />}
              />
              <div className='col-span-2 row-span-2'>
                <Announcement />
              </div>

              <div
      className="my-auto mx-auto w-44 cursor-pointer transition-opacity duration-500"
      onClick={toggleClock}
      style={{ opacity: opacity }}
    >
      {isToggle ? <Clock /> : <DigitalClock />}
    </div>

              <CardStatistics
                title={"In Progress"}
                value={inProgressIssues}
                valueColor={"text-yellow-500"}
                titleColor={"text-yellow-500"}
                icon={<RotateCw size={42} strokeWidth={1.75} />}
              />
              <CardStatistics
                title={"Resolved"}
                value={resolvedIssues}
                valueColor={"text-blue-500"}
                titleColor={"text-blue-500"}
                icon={<ClipboardCheck size={42} strokeWidth={1.75} />}
              />
              <CardStatistics
                title={"Blocked Issues"}
                value={blockedIssues}
                valueColor={"text-red-500"}
                titleColor={"text-red-500"}
                icon={<ShieldX size={42} strokeWidth={1.75} />}
              />

              <div className='col-span-2 row-span-2'>
                <PieChart data={chartData} options={chartoptions} height={"300px"} width={"100%"} />
              </div>
              <div className='col-span-3 row-span-2'>
                <LineChart data={lineData} options={lineoptions} height={"265px"} width={"100%"} />
              </div>
            </div>
          </div>
        </div>
        <Chatbot/>
      </div>
    </>)
}

export default Dashboard;