// import React from 'react'
// import Navbarv3 from '../../components/Navbarv3'
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import NoData from "../../assets/images/bear.png"
// import EmptyCard from "../../components/EmptyCard/EmptyCard";
// import SearchBar from '../../components/SearchBar/SearchBar';

// const Friends = () => {
//     const [userInfo, setUserInfo] = useState(null); 
//     const [allFriends, setAllFriends] = useState([]);
//     const [allPeople, setAllPeople] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [error, setError] = useState(null);

//     const [isSearch, setIsSearch] = useState(false);
//     const [hoveredNoteId, setHoveredNoteId] = useState(null);

//     const navigate = useNavigate();

//     useEffect(() => { 
//         getUserInfo(); 
//         getAllFriends();
//         getAllPeople(); 
//         return () => {};
//     }, [])
        
//     //SEARCH
//     //Search for a note 
//     const onSearchPeople = async (query) => { 
//         if (!query || query.trim() === "") {
//             setIsSearch(false);
//             getAllPeople();
//             return;
//         }
//         try { 
//             const response = await axiosInstance.get('/search-people', {
//                 params: { query },
//             })

//             if (response.data && response.data.friends) { 
//                 setIsSearch(true); 
//                 setAllPeople(response.data.friends);
//             }
//         } catch (error) { 
//             console.log(error);
//         }
//     }

//     const handleClearSearch = () => { 
//         setIsSearch(false);
//         getAllPeople(); 
//     }

//     const getUserInfo = async () => { 
//         try { 
//             const response = await axiosInstance.get("/get-user");
//             if (response.data && response.data.user) { 
//                 setUserInfo(response.data.user);
//             }
//         } catch (error) { 
//             if (error.response.status == 401) { 
//                 localStorage.clear(); 
//                 navigate("/login");
//             }
//         }
//     }

//     const getAllFriends = async () => { 
//         try { 
//             const response = await axiosInstance.get("/get-all-friends");
//             if (response.data && response.data.friends) { 
//                 setAllFriends(response.data.friends);
//             }
//         } catch (error) { 
//             if (error.response.status == 401) { 
//                 localStorage.clear(); 
//                 navigate("/login");
//             }
//         }
//     }

//     const getAllPeople = async () => { 
//         try { 
//             const response = await axiosInstance.get("/get-all-people");
//             if (response.data && response.data.people) { 
//                 setAllPeople(response.data.people);
//             }
//         } catch (error) { 
//             if (error.response.status == 401) { 
//                 localStorage.clear(); 
//                 navigate("/login");
//             }
//         }
//     }

    

//     const onKeyDown = (e) => { 
//         if (e.key === 'Enter') { 
//             handleSearch();
//         }
//     }
    

//     const handleSearch = () => {
//     if (searchQuery.trim() === "") {
//         onClearSearch(); // Show all notes when search is empty
//     } else {
//         onSearchPeople(searchQuery);
//     }
// }

//     const onClearSearch = () => {
//         setSearchQuery("");
//         handleClearSearch(); 
//     }

//     const renderUserList = (users) => {
//         return (
//             <div className="user-list">
//                 {users.map(user => (
//                     <div 
//                         key={user._id} 
//                         className="user-item"
//                         onMouseEnter={() => setHoveredNoteId(user._id)}
//                         onMouseLeave={() => setHoveredNoteId(null)}
//                     >
//                         <div className="user-avatar">
//                             {user.avatar ? (
//                                 <img src={user.avatar} alt={user.username} />
//                             ) : (
//                                 <div className="avatar-placeholder">
//                                     {user.username.charAt(0).toUpperCase()}
//                                 </div>
//                             )}
//                         </div>
//                         <div className="user-details">
//                             <h4>{user.username}</h4>
//                             <p>{user.email}</p>
//                         </div>
//                         {hoveredNoteId === user._id && (
//                             <button className="add-friend-btn">
//                                 {allFriends.some(friend => friend._id === user._id) ? 
//                                     "Friends" : "Add Friend"}
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
   

//   return (
//     <>
//         <Navbarv3 userInfo={userInfo}  />
        
//         <div className="container mx-auto"> 
//                 {allFriends.length > 0  
//                     ? (<div className="grid grid-cols-1 gap-5 m-5">
//                         {allFriends.map((item) => (
//                             <p>{item.fullName}</p>
//                             ))} 
//                       </div>) 
//                     : (<EmptyCard 
//                         imgSrc = {NoData} 
//                         message = {"Click the '+' button at the bottom to keep track of your tasks and thoughts!"
//                         }/>)
//                 }
//         </div> 
        
//         <div className="container mx-5"> 
//             <p> Add friends to study together!</p>

//             <SearchBar value = {searchQuery}
//             onChange={({target }) => {
//                 setSearchQuery(target.value)}}
//             handleSearch={handleSearch}
//             onClearSearch={onClearSearch}
//             onKeyDown={onKeyDown}
//             text="Search People"/>

            
//             <div className="search-results">
//                 <h3>Search Results</h3>
//                 {allPeople.length > 0 ? (
//                     renderUserList(allPeople)
//                 ) : (
//                     <p>No users found</p>
//                 )}
//             </div>
                
              

//         </div> 

        
//     </>
//   )
// }

// export default Friends


import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import SearchBar from '../../components/SearchBar/SearchBar';

const Friends = () => {
    const [userInfo, setUserInfo] = useState(null); 
    const [allFriends, setAllFriends] = useState([]);
    const [allPeople, setAllPeople] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [hoveredNoteId, setHoveredNoteId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => { 
        getUserInfo(); 
        getAllFriends();
        getAllPeople(); // Load all people initially
        return () => {};
    }, [])
        
    // Search for people
    const onSearchPeople = async (query) => { 
        if (!query || query.trim() === "") {
            setIsSearch(false);
            getAllPeople();
            return;
        }
        try { 
            const response = await axiosInstance.get('/search-people', {
                params: { query },
            })

            if (response.data && response.data.people) { 
                setIsSearch(true); 
                setAllPeople(response.data.people);
            }
        } catch (error) { 
            console.log(error);
        }
    }

    const handleClearSearch = () => { 
        setIsSearch(false);
        getAllPeople(); 
    }

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

    const getAllFriends = async () => { 
        try { 
            const response = await axiosInstance.get("/get-all-friends");
            if (response.data && response.data.friends) { 
                setAllFriends(response.data.friends);
            }
        } catch (error) { 
            if (error.response.status == 401) { 
                localStorage.clear(); 
                navigate("/login");
            }
        }
    }

    const getAllPeople = async () => { 
        try { 
            const response = await axiosInstance.get("/get-all-people");
            if (response.data && response.data.people) { 
                setAllPeople(response.data.people);
            }
        } catch (error) { 
            if (error.response.status == 401) { 
                localStorage.clear(); 
                navigate("/login");
            }
        }
    }

    const onKeyDown = (e) => { 
        
        handleSearch();
        
    }
    
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            onClearSearch();
        } else {
            onSearchPeople(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch(); 
    }

    // Function to render user list
    const renderUserList = (users) => {
        return (
            <div className="user-list">
                {users.map(user => (
                    <div 
                        key={user._id} 
                        className="user-item"
                        onMouseEnter={() => setHoveredNoteId(user._id)}
                        onMouseLeave={() => setHoveredNoteId(null)}
                    >
                        <div className="user-avatar">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.username} />
                            ) : (
                                <div className="avatar-placeholder">
                                    {user.fullName}
                                </div>
                            )}
                        </div>
                        <div className="user-details">
                            <h4>{user.username}</h4>
                        </div>
                        {hoveredNoteId === user._id && (
                            <button className="add-friend-btn">
                                {allFriends.some(friend => friend._id === user._id) ? 
                                    "Friends" : "Add Friend"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="friends-container">
            <SearchBar 
                value={searchQuery}
                onChange={({target}) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
                onKeyDown={onKeyDown}
                text="Search People"
            />

            <div className="friends-content">
                {/* Show search results if in search mode */}
                {isSearch ? (
                    <div className="search-results">
                        <h3>Search Results</h3>
                        {allPeople.length > 0 ? (
                            renderUserList(allPeople)
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="friends-section">
                            <h3>Your Friends</h3>
                            {allFriends.length > 0 ? (
                                renderUserList(allFriends)
                            ) : (
                                <p>You don't have any friends yet</p>
                            )}
                        </div>
                        
                        <div className="people-section">
                            <h3>People You May Know</h3>
                            {allPeople.length > 0 ? (
                                renderUserList(allPeople)
                            ) : (
                                <p>No suggestions available</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Friends