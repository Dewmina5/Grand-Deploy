import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminPrivateRoutes = () => {

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
 
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfoString) {
      console.log(storedUserInfo);
      if (!(storedUserInfo.UserType == 'Admin' && storedUserInfo.UnivercityPosition == 'Other' && storedUserInfo.AdminisrationPosition != 'Interview Panel' )) {
        navigate('/');
      }
    } else {
      console.log("not login");
      navigate('/login');
    }

    
  }, [])

  return storedUserInfo.UserType === 'Admin'&& storedUserInfo.UnivercityPosition == 'Other' && storedUserInfo.AdminisrationPosition != 'Interview Panel' ? <Outlet /> : null

}

export default AdminPrivateRoutes
