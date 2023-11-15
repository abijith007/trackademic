import IssueList from "../common-components/IsssueList/IssueList";
import NavBar from "../common-components/NavBar/NavBar";
import SideDrawer from "../common-components/SideDrawer/SideDrawer";

function Issues() {
  return (
    <>
      <NavBar />
      <div className="flex h-100 overflow-hidden">
        <SideDrawer />
        <div className="flex flex-1">
          <IssueList/>
        </div>
      </div>  
    </>
  )
}

export default Issues;