import React, { useState } from 'react';
import NavBar from '../common-components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import loginService from '../../services/loginService';
import Toast from '../common-components/Toast/Toast';

function Login() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginError, setShowLoginError] = useState(false)  
  const [isLoginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (event) => {    
    event.preventDefault();    
    setLoginLoading(true);
    const email = event.target[0].value.trim();
    const password = event.target[1].value.trim();    
    const loginSuccess = await loginService(email, password, dispatch);      
    setShowLoginError(!loginSuccess);    
    if (loginSuccess) {
      navigate('/dashboard');
      setLoginLoading(false);
    }
    else{
      triggerToast();
      setLoginLoading(false);
    }
  };
  
  const triggerToast = () => {        
    setTimeout(() => setShowLoginError(false), 10000); 
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <NavBar />      
      {showLoginError && <Toast location='toast-end toast-top' type="danger" message="Incorrect Username of Password "/>}
      <div className="relative flex flex-col items-center justify-center overflow-hidden height-90vh">
        <div className="w-full p-6 bg-white border-t-8 border-blue-900 rounded-md shadow-md border-top-1 md:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
            <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password"
                        className="w-full input input-bordered" />
                </div>
                <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                
                <button type="submit" className="w-100 btn btn-outline btn-primary text-white btn-wide btn-circle">
                  {!isLoginLoading ? <span>Login</span> : <span className="loading loading-spinner"></span>}
                </button>
                <button type='button' onClick={goToSignup} className="w-100 btn text-white btn-secondary btn-wide btn-circle">
                  Register Now
                </button>                
            </form>            
        </div>
    </div>    
    </>
  );
}

export default Login;
