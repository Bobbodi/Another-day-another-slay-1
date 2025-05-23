import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/cat.png"
import NoData from "../../assets/images/bear.png"

import Modal from "react-modal";

import { MdAdd } from "react-icons/md";
import { ImFileEmpty } from "react-icons/im";


const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = React.useState({
        isShown: false, 
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({ 
        isShown: false, 
        type: "add",
        message: ""
    })

    
    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null); 
    const [error, setError] = useState(null);

    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate(); 

    const handleEdit = (noteDetails) => { 
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    }

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


    //getUserInfo
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

    //Get All notes
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

    const ifempty = () => { 
        if (allNotes.length === 0) {
            return (
                <div className="col-span-3 flex flex-col items-center justify-center mt-10">
                    <ImFileEmpty className="text-5xl text-[#ef476f] mb-2" />
                    <span className="text-[#ef476f] text-lg">No notes</span>
                </div>
            );
        }
        return null;
    }


    //delete Notes
    const deleteNote = async (data) => {
      const noteId = data._id;
      try { 
        console.log("deleteing")
        const response = await axiosInstance.delete("/delete-note/" + noteId)

        if (response.data && response.data.error === false) { 
          console.log("here3")
          showToastMessage("Note Deleted Succesfully", 'delete')
          getAllNotes()
          onClose()
        } 

      } catch (error) { 
        if (error.response && error.response.data && error.response.data.message) { 
          setError("beep boop error time")
        }
      }
    };

    //Search for a note 
    const onSearchNote = async (query) => { 
        if (!query || query.trim() === "") {
            setIsSearch(false);
            getAllNotes();
            return;
        }
        try { 
            const response = await axiosInstance.get('/search-notes', {
                params: { query },
            })

            if (response.data && response.data.notes) { 
                setIsSearch(true); 
                setAllNotes(response.data.notes);
            }
        } catch (error) { 
            console.log(error);
        }
    }

    const updateIsPinned = async (nodeData) => { 
        const noteId = nodeData._id;
        try { 
            console.log("here2")
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, { 
                "isPinned": !nodeData.isPinned
            })

            if (response.data && response.data.note) { 
                console.log("here3")
                showToastMessage("Note Updated Succesfully")
                getAllNotes()
            
            } 

        } catch (error) { 
            if (error.response && error.response.data && error.response.data.message) { 
            setError(error.response.data.message)
            }
        }
    }


    const handleClearSearch = () => { 
        setIsSearch(false);
        getAllNotes(); 
    }

    useEffect(() => { 
        getAllNotes();
        getUserInfo(); 
        return () => {};
    }, [])
    
    return (
        <>
        <Navbar userInfo={userInfo} onSearchNote = {onSearchNote} handleClearSearch = {handleClearSearch}/>

        <div className="container mx-auto"> 
                {allNotes.length > 0 ? 
                    (<div className="grid grid-cols-3 gap-4 m-4">
                        {allNotes.map((item) => (
                        <NoteCard 
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            priority={item.priority}
                            deadline={item.dueDate}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => updateIsPinned(item)}
                        />
                    ))} 
                    </div>)
                : <EmptyCard 
                imgSrc = {isSearch ? NoData : AddNotesImg} 
                message = {isSearch 
                    ? "Oops! No notes match your search"
                    : "Click the '+' button at the bottom to keep track of your tasks and thoughts!"
                }
                />
            }
            
        </div>

        <button
            className="fixed w-16 h-16 flex items-center justify-center rounded-full bottom-10 right-10 bg-[#ffd166] hover:bg-[#ef476f] hover:shadow-2xl transition-shadow z-50"
            onClick={() => {
                setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                });
            }}>
            <MdAdd className="text-2xl text-[#06d6a0]" />
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
            <AddEditNotes 
                type={openAddEditModal.type}
                nodeData={openAddEditModal.data}
                getAllNotes={getAllNotes}
                onClose={() => { 
                    setOpenAddEditModal({ isShown:false, type:"add", data:null});
                }}
                showToastMessage={showToastMessage}
            />
        </Modal>

        <Toast
            isShown = {showToastMsg.isShown}
            message = {showToastMsg.message}
            type = {showToastMsg.type}
            onClose = {handleCloseToast}
        />

        </>  
    )
} 

export default Home