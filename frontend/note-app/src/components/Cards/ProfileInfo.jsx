import React from 'react'
import { getInitials } from '../../utils/helper'
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";


const ProfileInfo = ({ userInfo, onLogout, onProfile, onFriends, onJournal, onStudy, onTasks, isFriends, isJournal, isTasks, isStudy }) => {
  
  return (
    //add feature where if you hover on the tab it will show text displaying what it is
    <div className="flex items-center gap-4">

      <FaTasks className={`
        text-2xl 
        ${isTasks ? 'p-1 border-0.5 border-transparent shadow-[0_0_0_4px_var(--color-dark)] rounded-sm' : ''} 
        ${isTasks ? 'text-dark' : 'text-darkgreen'}
        ${isTasks ? 'hover:text-dark': 'hover:text-red'}
      `}
      onClick={onTasks}> </FaTasks>

      <FaBook className={`
        text-2xl 
        ${isJournal ? 'p-1 border-0.5 border-transparent shadow-[0_0_0_4px_var(--color-dark)] rounded-sm' : ''} 
        ${isJournal ? 'text-dark' : 'text-darkgreen'}
        ${isJournal ? 'hover:text-dark': 'hover:text-red'}
      `}
      
      onClick={onJournal}> </FaBook>

      <FaUserFriends className={`
        text-2xl 
        ${isFriends ? 'p-1 border-0.5 border-transparent shadow-[0_0_0_4px_var(--color-dark)] rounded-sm' : ''} 
        ${isFriends ? 'text-dark' : 'text-darkgreen'}
        ${isFriends ? 'hover:text-dark': 'hover:text-red'}
      `}  onClick={onFriends}></FaUserFriends>

      <FaBookOpenReader className={`
        text-2xl 
        ${isStudy ? 'p-1 border-0.5 border-transparent shadow-[0_0_0_4px_var(--color-dark)] rounded-sm' : ''} 
        ${isStudy ? 'text-dark' : 'text-darkgreen'}
        ${isStudy ? 'hover:text-dark': 'hover:text-red'}
      `} onClick={onStudy}></FaBookOpenReader>

      <button className = "" onClick={onProfile}>
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-mediam bg-green hover:bg-red"> 
            {getInitials(userInfo?.fullName)} 
          </div> 
      </button>
        
      <div>  
          <p className = "text-sm font-medium"> {userInfo?.fullName} </p> 
          <button className = "text-sm text-slate-700 underline" onClick={onLogout}>
              Logout
          </button>
    
      </div>

    </div>
  )
}

export default ProfileInfo
