import React from "react";
import ProfileInfo from "./cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Tab from "./Cards/Tab";

const Navbar = ({userInfo}) => {
    
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear()
        navigate("/login");
    }

    const onProfile = () => { 
        navigate("/profile");
    }

    const onTasks = () => { 
        navigate("/dashboard");
    }

    const onJournal = () => { 
        navigate("/journal");
    }

    const onFriends = () => { 
        navigate("/friends");
    }
    
    const onStudy = () => { 
        navigate("/study");
    }

    return ( 
        <div className = "bg-yellow flex items-center justify-between px-6 py-2 drop-shadow"> 
            <h2 className = "text-2xl font-medium text-black py-2"> SlayFocus </h2>

            <div className="flex flex-row gap-3 items-center justify-center"> 
                <ProfileInfo 
                    userInfo = {userInfo} 
                    onLogout={onLogout} 
                    onProfile={onProfile}
                    onFriends={onFriends}
                    onJournal={onJournal}
                    onStudy={onStudy}
                    onTasks={onTasks}/>
            </div>

            
        </div>


    );
}
export default Navbar;


//<Tab userInfo = {userInfo} onNote={onNote}/>