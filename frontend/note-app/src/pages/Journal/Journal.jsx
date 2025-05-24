import React from 'react'
import Navbarv3 from '../../components/Navbarv3'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Journal = () => {
    const [userInfo, setUserInfo] = useState(null); 
    const [allNotes, setAllNotes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { 
        getUserInfo(); 
        return () => {};
    }, [])
        

    const getUserInfo = async () => { 
        try { 
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) { 
                setUserInfo(response.data.user);
            }
        } catch (error) { 
            if (error.response.status == 401) { 
                localStorage.clear(); 
                navigate("/login");
            }
        }
    }

  return (
    <>
        <Navbarv3 userInfo={userInfo}  />
        <div>
        Jorunal
        </div>
    </>
  )
}

export default Journal
