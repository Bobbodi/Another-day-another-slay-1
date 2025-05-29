import React from 'react'
import Navbarv3 from '../../components/Navbarv3';
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import avatarSample from "../../assets/images/avatar-sample.jpg"


import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { dataset, chartSetting } from './scatterStats'

const Profile = () => {

  const [userInfo, setUserInfo] = useState(null); 
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => { 
      getUserInfo(); 
      getAllNotes();
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

  //can calc number of notes created
  const getAllNotes = async () => { 
        try { 
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) { 
                setAllNotes(response.data.notes);
            }
        } catch (error) { 
            console.log("beep boop error time")
        }
    }

  const onEditAvatar = async () => {
    navigate("/profile/avatar");
  }

  const onEditProfile = async () => {
    navigate("/profile/editprofile");
  }


  return (
    <>
      <Navbarv3 userInfo={userInfo}/>

      <div className="flex">
        <div className="flex flex-col items-center justify-center bg-yellow h-screen w-[30vw] overflow-auto"> 
          
          <div className="w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-red my-3 border-2 border-white shadow-md">
            <img 
              src={avatarSample} 
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>


          <table class="table-auto text-lg">
            <tbody>
              <tr>
                <td class="px-2">Username</td>
                <td class="text-red">{userInfo?.fullName}</td>
              </tr>
              <tr>
                <td class="px-2">Email</td>
                <td class="text-red">{userInfo?.email}</td>
              </tr>
            </tbody>
          </table> 

          <button className = "mt-4" onClick={onEditProfile}>
            <div className="w-40 flex items-center p-1.5 bg-slate-100 rounded-full hover:bg-red"> 
              <p className= "mx-3"> Edit Details </p>
              <FaArrowRight className="mx-1"/>
              
            </div> 
          </button>

          
           <button className = "mt-4" onClick={onEditAvatar}>
              <div className="w-40 flex items-center p-1.5 bg-slate-100 rounded-full hover:bg-red"> 
              <p className= "mx-3"> Edit Avatar </p>
              <FaArrowRight className="mx-1"/>
            </div> 
           </button>
          

        </div> 

        <div className="flex flex-col justify-center items-center w-full"> 
          <p className="text-white text-xl flex justify-center items-center"> Your Statistics </p> 
          
          <div className="flex flex-row grid grid-cols-2 m-6
            rounded-2xl p-4 bg-white hover:shadow-2xl transition-all 
            duration-200 ease-in-out group">
            
              <PieChart
                series={[
                  {
                    data: desktopOS,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    valueFormatter,
                  },
                ]}
                height={200}
                width={200}
              />

              <ScatterChart
                dataset={dataset}
                series={[
                  { datasetKeys: { id: 'version', x: 'a1', y: 'a2' }, label: 'Series A' },
                  { datasetKeys: { id: 'version', x: 'b1', y: 'b2' }, label: 'Series B' },
                ]}
                {...chartSetting}
              />
            

          


          </div> 
        </div> 

    


    
  


      </div> 
    </>
  )
}

export default Profile

{/* <div className="flex flex-row grid grid-cols-3 gap-4 m-4"> 
            <p className="w-full"> Number of Pending Tasks: {allNotes.length} </p> 
          </div> */}