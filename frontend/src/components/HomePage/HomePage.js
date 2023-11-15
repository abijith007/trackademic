import Footer from "../common-components/Footer/Footer";
import NavBar from "../common-components/NavBar/NavBar";

function HomePage(){
  return(<>
  <NavBar/>
  <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://i.pinimg.com/originals/53/b5/45/53b545e413ca93a94b8bd3e53e40c119.png" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
<Footer/>
</>)
}

export default HomePage;