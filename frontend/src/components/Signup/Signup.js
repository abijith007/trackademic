import React, { useState } from 'react';
import NavBar from '../common-components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import Toast from '../common-components/Toast/Toast';
import signupService from '../../services/signupService';

function Signup() {  
  const navigate = useNavigate();
  const [showSignupError, setShowSignupError] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSignupLoading, setSignupLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setSignupLoading(true);

    const signupDetails = {
      firstName: event.target[0].value.trim(),
      lastName: event.target[1].value.trim(),
      email: event.target[2].value.trim(),
      password: event.target[3].value.trim(),
      confirmPassword: event.target[4].value.trim()
    }

    if (validateSignup(signupDetails))
    {      
      const signupSuccess = await signupService(signupDetails);

      setShowSignupSuccess(signupSuccess);
      setShowSignupError(!signupSuccess);
      if (signupSuccess) {        
        triggerSuccessToast();
        setTimeout(() => {          
          navigate('/login');
      }, 2000);

      } else {
        triggerErrorToast();
        setSignupLoading(false);
      }
    }
  };

  const validateSignup = (signupDetails) => {    
    setValidationErrors({});
    let errors = {};
    if (!signupDetails.firstName) errors.firstName = "First name is required";
    if (!signupDetails.lastName) errors.lastName = "Last name is required";
    if (!signupDetails.email) errors.email = "Email is required";
    if (!signupDetails.password) errors.password = "Password is required";
    if (signupDetails.password !== signupDetails.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSignupLoading(false);
      return false
    }
    return true;
  }

  const triggerErrorToast = () => {
    setTimeout(() => setShowSignupError(false), 10000);
  };

  const triggerSuccessToast = () => {
    setTimeout(() => setShowSignupSuccess(false), 10000);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <NavBar />
      {showSignupError && <Toast location='toast-end toast-top' type="danger" message="Signup Error" />}
      {showSignupSuccess && <Toast location='toast-end toast-top' type="success" message="You are registered successfully " />}
      <div className="relative flex flex-col items-center justify-center overflow-hidden height-90vh">
        <div className="w-full p-6 bg-white border-t-8 border-blue-900 rounded-md shadow-md border-top-1 sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-700">Signup</h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div >
                <label className="label">
                  <span className="label-text">First Name {validationErrors.firstName ? <span className='text-danger me-0 w-100'><br/>{validationErrors.firstName}</span>: ''}</span>
                </label>
                <input type="text" placeholder="First Name" className="w-full input input-bordered" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Last Name {validationErrors.lastName ? <span className='text-danger me-0 w-100'><br/>{validationErrors.lastName}</span>: ''}</span>
                </label>
                <input type="text" placeholder="Last Name" className="w-full input input-bordered" />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Email {validationErrors.email ? <span className='text-danger me-0 w-100'><br/>{validationErrors.email}</span>: ''}</span>
              </label>
              <input type="email" placeholder="Email Address" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password {validationErrors.password ? <span className='text-danger me-0 w-100'><br/>{validationErrors.password}</span>: ''}</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password {validationErrors.confirmPassword ? <span className='text-danger me-0 w-100'><br/>{validationErrors.confirmPassword}</span>: ''}</span>
              </label>
              <input type="password" placeholder="Confirm Password" className="w-full input input-bordered" />
            </div>
            <button type="submit" className="w-100 btn btn-outline btn-primary text-white btn-wide btn-circle">
              {!isSignupLoading ? <span>Signup</span> : <span className="loading loading-spinner"></span>}
            </button>
            <button onClick={goToLogin} type="button" className="w-100 btn text-white btn-secondary btn-wide btn-circle">
              Already have an account? Login
            </button>
          </form >
        </div >
      </div >
    </>
  );
}

export default Signup;