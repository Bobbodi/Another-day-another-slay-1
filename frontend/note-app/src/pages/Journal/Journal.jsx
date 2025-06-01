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
import Toast from "../../components/ToastMessage/Toast";

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
        
    const [showToastMsg, setShowToastMsg] = useState({ 
            isShown: false, 
            type: "add",
            message: ""
        })

    const handleCloseToast = () => { 
        setShowToastMsg({
            isShown: false, 
            message: "",
        })
    };

    const showToastMessage = (message, type) => { 
        setShowToastMsg({
            isShown: true, 
            message,
            type
        })
    };

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

    //delete Notes
    const deleteJournal = async (data) => {
      const journalId = data._id;
      try { 
        
        const response = await axiosInstance.delete("/delete-journal/" + journalId)

        if (response.data && response.data.error === false) { 
          
          showToastMessage("Journal Deleted Succesfully", 'delete')
          getAllJournal()
          onClose()
        } 

      } catch (error) { 
        if (error.response && error.response.data && error.response.data.message) { 
          setError("beep boop error time")
        }
      }
    };

return (
  <div className="min-h-screen bg-gray-50">
    <Navbarv3 userInfo={userInfo} />
    
    <div className="container mx-auto px-4 py-8">
      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Journal Entries</h1>
        
        {/* Journal Entries Grid */}
        {allJournal.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJournal.map((item) => (
              <JournalCard 
                key={item._id}
                date={item.createdOn}
                entry={item.entry}
                hovered={hoveredJournalId===item._id}
                onMouseEnter={() => setHoveredJournalId(item._id)}
                onMouseLeave={() => setHoveredJournalId(null)}
                onDelete={() => deleteJournal(item)}
                
              />
            ))}
          </div>
        ) : (
          <EmptyCard 
            imgSrc={AddNotesImg} 
            message="Feeling things? Click the '+' button below to write down your thoughts!"
          />
        )}
      </div>
    </div>

    {/* Floating Add Button */}
    <button
      className="fixed w-16 h-16 flex items-center justify-center rounded-full bottom-10 right-10 bg-yellow-500 hover:bg-red-500 text-white shadow-lg hover:shadow-xl transition-all z-50"
      onClick={() => {
        setOpenAddEditModal({
          isShown: true,
          type: "add",
          data: null,
        });
      }}
      aria-label="Add new journal entry"
    >
      <MdAdd className="text-3xl" />
    </button>

    {/* Modal */}
    <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000
        },
        content: {
          maxHeight: "70vh",
          width: "90%",
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "0.5rem",
          padding: "0",
          border: "none",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
      }}
      contentLabel="Add Journal Entry"
      overlayClassName="fixed inset-0 flex items-center justify-center p-4"
    >
      <AddJournal
        type={openAddEditModal.type}
        nodeData={openAddEditModal.data}
        getAllJournal={getAllJournal} //edited () => 
        onClose={() => { 
          setOpenAddEditModal({ isShown:false, type:"add", data:null});
        }}
        showToastMessage={showToastMessage}
        
      />
    </Modal>

    <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        />
  </div>
)
}

export default Journal
