import React from "react";
import ProfileInfo from "./cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {

    const [searchQuery, setSearchQuery] = React.useState("");
    const navigate = useNavigate();

    // Add this inside your Navbar component
    React.useEffect(() => {
        handleSearch();
        // eslint-disable-next-line
    }, [searchQuery]);

    const onLogout = () => {
        localStorage.clear()
        navigate("/login");
    }

    const onKeyDown = (e) => { 
        if (e.key === 'Enter') { 
            handleSearch();
        }
    }
    

    const handleSearch = () => {
    if (searchQuery.trim() === "") {
        onClearSearch(); // Show all notes when search is empty
    } else {
        onSearchNote(searchQuery);
    }
}

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch(); 
    }
    
    return ( 
        <div className = "bg-[#ffd166] flex items-center justify-between px-6 py-2 drop-shadow"> 
            <h2 className = "text-2xl font-medium text-black py-2"> SlayFocus </h2>

            <SearchBar value = {searchQuery}
            onChange={({target }) => {
                setSearchQuery(target.value)}}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            onKeyDown={onKeyDown}/>

            <ProfileInfo userInfo = {userInfo} onLogout={onLogout}/>

            
        </div>


    );
}
export default Navbar;