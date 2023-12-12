import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
import { useState } from 'react';

function NavBar() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePhoto, setprofilePhoto] = useState(useSelector(state => state.user.userDetails.profilePhotoLink));
  const goTo = (page) => () => {    
    navigate('/' + page);
  };

  const handleLogout = () => () => {
    dispatch(logout());    
    navigate("/");    
  }

  return (
    <div className="navbar w-100 bg-blue-900">
      <div className="flex-1 ms-2 align-middle">
        <button className="btn  btn-sm btn-light normal-case align-middle text-center text-xl py-auto" onClick={goTo('')}>trackademic</button>
      </div>
      { isLoggedIn ?
        <div className="flex flex-row-reverse gap-2 me-10">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilePhoto != "" ? profilePhoto : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"} alt="User Avatar" />                
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-100 rounded-box w-52">
              <li><button onClick={goTo('profile')}>Profile</button></li>
              <li><button onClick={handleLogout()}>Logout</button></li>
            </ul>
          </div>
        </div> : 
        <div className="flex flex-row-reverse gap-2 me-5">
          <button className='btn btn-danger  btn-sm' onClick={goTo('login')}>Login</button>
          <button className='btn btn-warning  btn-sm' onClick={goTo('signup')}>Signup</button>
        </div>
      }
    </div>
  );
}

export default NavBar;
