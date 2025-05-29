import React from 'react'
import Navbarv3 from '../../components/Navbarv3'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import Modal from "react-modal";

import { MdAdd } from "react-icons/md";
import JournalCard from '../../components/Cards/JournalCard';
import AddNotesImg from "../../assets/images/cat.png"
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddJournal from "./AddJournal";

const Journal = () => {

    const [openAddEditModal, setOpenAddEditModal] = React.useState({
        isShown: false, 
        type: "add",
        data: null,
    });
   
    const [allJournal, setAllJournal] = useState([]);
    const [userInfo, setUserInfo] = useState(null); 
    const [error, setError] = useState(null);

    const [isSearch, setIsSearch] = useState(false);
    const [hoveredJournalId, setHoveredJournalId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => { 
        getUserInfo(); 
        getAllJournal();
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

    //Get All journal
    const getAllJournal = async () => { 
        try { 
            const response = await axiosInstance.get("/get-all-journal");
            if (response.data && response.data.journals) { 
                setAllJournal(response.data.journals);
            }
        } catch (error) { 
            console.log("beep boop error time")
        }
    }

    useEffect(() => { 
        getAllJournal();
        getUserInfo(); 
        return () => {};
    }, [])

  return (
    <>
        <Navbarv3 userInfo={userInfo}  />
        
        <div className="container"> 
            {allJournal.length > 0 ? 
                (<div className="grid grid-cols-3 gap-5 m-5">
                    {allJournal.map((item) => (
                    <JournalCard 
                        key={item._id}
                        
                        date={item.createdOn}
                        entry={item.entry}
                        
                        hovered={hoveredJournalId===item._id}
                        onMouseEnter={() => setHoveredJournalId(item._id)}
                        onMouseLeave={() => setHoveredJournalId(null)}
                    />
                ))} 
                </div>)
            : <EmptyCard 
                imgSrc = {AddNotesImg} 
                message = {
                    "Feeling things? Click the '+' button at the bottom to write down your thoughts!"
                }
            />
        }
                
            
            
            
        </div>

        <button
            className="fixed w-16 h-16 flex items-center justify-center rounded-full bottom-10 right-10 bg-yellow hover:bg-red hover:shadow-2xl transition-shadow z-50"
            onClick={() => {
                setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                });
            }}>
            <MdAdd className="text-2xl text-green" />
        </button>

        <Modal 
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }
            }}
            contentLabel=""
            className="w-[50%] max-h-6/7 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
            
            <AddJournal
                type={openAddEditModal.type}
                nodeData={openAddEditModal.data}
                getAllJournal={getAllJournal}
                onClose={() => { 
                    setOpenAddEditModal({ isShown:false, type:"add", data:null});
                }}
            />
        </Modal>


    </>
  )
}

export default Journal
