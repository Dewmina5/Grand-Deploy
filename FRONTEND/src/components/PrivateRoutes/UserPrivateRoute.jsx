import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const UserPrivateRoutes = () => {

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
 
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfoString) {
      console.log(storedUserInfo);
      if (!(storedUserInfo.UserType == 'User')) {
        navigate('/');
      }
    } else {
      console.log("not login");
      navigate('/login');
    }

    
  }, [])

  return storedUserInfo?.UserType === 'User' ? <Outlet /> : null

}

export default UserPrivateRoutes
