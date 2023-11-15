import NavBar from "../common-components/NavBar/NavBar";
import SideDrawer from "../common-components/SideDrawer/SideDrawer";
import Abijith from "../../assets/abijith.jpg";
import Shakshi from "../../assets/shakshi.PNG";
function AboutUs() {  
  return (
    <>
      <NavBar />
      <div className="flex h-100 overflow-hidden"> {/* Adjusted to h-screen for full height */}
        <SideDrawer />
        <div className="flex-1 flex items-center justify-center"> {/* Center content */}
          <div className="text-center min-w-fit shadow-xl rounded-3xl bg-white p-10 my-auto"> {/* Center text */}
            <h1 className="text-4xl mb-12">About Us</h1>
            <h4>The Developers</h4>
            <div className="flex justify-center gap-20">
              <div className="flex flex-col m-5 items-center">
                <img
                  className="w-60 h-60 object-cover rounded-full" // Circular image
                  src={Abijith} // Replace with your image URL
                  
                />
                <p className="mt-2 text-blue-600 text-2xl font-bold">Abijith Trichur Ramachandran</p>
              </div>
              <div className="flex flex-col m-5 items-center">
                <img
                  className="w-60 h-60 object-cover rounded-full" // Circular image
                  src={Shakshi}// Replace with your image URL
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
