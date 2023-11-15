import NavBar from "../common-components/NavBar/NavBar";
import SideDrawer from "../common-components/SideDrawer/SideDrawer";
import Abijith from "../../assets/abijith.jpg";
import Shakshi from "../../assets/shakshi.PNG";
function AboutUs() {  
  return (
    <>
      <NavBar />
      <div className="flex h-100 overflow-hidden">
        <SideDrawer />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center min-w-fit shadow-xl rounded-3xl bg-white p-10 my-auto">            
            <h4>The Developers</h4>
            <div className="flex justify-center gap-20">
              <div className="flex flex-col m-3 items-center">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src={Abijith}
                  
                />
                <p className="mt-2 text-blue-600 text-2xl font-bold">Abijith Trichur Ramachandran</p>
              </div>
              <div className="flex flex-col m-3 items-center">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src={Shakshi}
                  alt="Shakshi Parekh"
                />
                <p className="mt-2 text-blue-600 text-2xl font-bold">Shakshi Parekh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs;
