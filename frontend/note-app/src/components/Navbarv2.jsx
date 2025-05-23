import React from "react";
import ProfileInfo from "./cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {

    const [searchQuery, setSearchQuery] = React.useState("");
    const navigate = useNavigate();

    
    return ( 
        <div className = "bg-[#ffd166] flex items-center justify-between px-6 py-2 drop-shadow"> 
            <h2 className = "text-2xl font-medium text-black py-2"> SlayFocus </h2>
            
        </div>


    );
}
export default Navbar;