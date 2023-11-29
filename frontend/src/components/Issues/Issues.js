import CreateIssue from "../common-components/CreateIssue/CreateIssue";
import IssueList from "../common-components/IsssueList/IssueList2";
import NavBar from "../common-components/NavBar/NavBar";
import SideDrawer from "../common-components/SideDrawer/SideDrawer";

function Issues() {
  return (
    <>
      <NavBar />
      <div className="flex h-100 overflow-hidden">
        <SideDrawer />
        <div className="flex flex-1 justify-center mt-3">
          <IssueList/>
          <CreateIssue/>
        </div>
      </div>  
    </>
  )
}

export default Issues;