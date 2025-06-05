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
import Star from "../../assets/images/star.png"

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
    const [hoveredNoteId, setHoveredNoteId] = useState(null);

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


    //delete Notes
    const deleteNote = async (data) => {
      const noteId = data._id;
      try { 
        console.log("deleteing")
        const response = await axiosInstance.delete("/delete-note/" + noteId)

        if (response.data && response.data.error === false) { 
          console.log("here3")
          showToastMessage("Task Deleted Succesfully", 'delete')
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

    const updateIsDone = async (nodeData) => { 
        const noteId = nodeData._id;
        try { 
            console.log("here2")
            const response = await axiosInstance.put("/update-note-done/" + noteId, { 
                "isDone": !nodeData.isDone
            })

            if (response.data && response.data.note) { 
                console.log("here3")
                showToastMessage("Task Updated Succesfully")
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
        <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">

                {/* Main Content Area */}

                <div className="bg-yellow-100 rounded-xl shadow-lg p-6 mb-6">
                {/* Today's suggested tasks section */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Today's suggested to-do</h1>
                
                {/* Filter for incomplete tasks (isDone = false) */}
                {allNotes.filter(note => !note.isDone).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allNotes
                        .filter(note => !note.isDone)
                        .slice(0, 3)
                        .map((item) => (
                        <div key={item._id} className="h-full">
                            <NoteCard 
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            priority={item.priority}
                            deadline={item.dueDate}
                            tags={item.tags}
                            isDone={item.isDone}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onDoneNote={() => updateIsDone(item)}
                            hovered={hoveredNoteId===item._id}
                            onMouseEnter={() => setHoveredNoteId(item._id)}
                            onMouseLeave={() => setHoveredNoteId(null)}
                            />
                        </div>
                        ))}
                    </div>
                ) : (
                    <EmptyCard 
                    imgSrc={Star} 
                    message="Fabulous! You've finished everything!"
                    />
                )}
                </div>


                
                <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Upcoming Tasks Section */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Tasks</h1>
                
                {/* Filter for incomplete tasks (isDone = false) */}
                {allNotes.filter(note => !note.isDone).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allNotes
                        .filter(note => !note.isDone)
                        .map((item) => (
                        <div key={item._id} className="h-full">
                            <NoteCard 
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            priority={item.priority}
                            deadline={item.dueDate}
                            tags={item.tags}
                            isDone={item.isDone}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onDoneNote={() => updateIsDone(item)}
                            hovered={hoveredNoteId===item._id}
                            onMouseEnter={() => setHoveredNoteId(item._id)}
                            onMouseLeave={() => setHoveredNoteId(null)}
                            />
                        </div>
                        ))}
                    </div>
                ) : (
                    <EmptyCard 
                    imgSrc={AddNotesImg} 
                    message="No upcoming tasks - add a new task or check your completed tasks below!"
                    />
                )}
                </div> 

                <div className="bg-gray-300 rounded-xl shadow-lg p-6 my-6">
                {/* Completed Tasks Section */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Completed Tasks</h1>
                
                {/* Filter for completed tasks (isDone = true) */}
                {allNotes.filter(note => note.isDone).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allNotes
                        .filter(note => note.isDone)
                        .map((item) => (
                        <div key={item._id} className="h-full opacity-80">
                            <NoteCard 
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            priority={item.priority}
                            deadline={item.dueDate}
                            tags={item.tags}
                            isDone={item.isDone}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onDoneNote={() => updateIsDone(item)}
                            hovered={hoveredNoteId===item._id}
                            onMouseEnter={() => setHoveredNoteId(item._id)}
                            onMouseLeave={() => setHoveredNoteId(null)}
                            />
                        </div>
                        ))}
                    </div>
                ) : (
                    <EmptyCard 
                    imgSrc={NoData} 
                    message="No tasks completed yet - keep going!"
                    />
                )}
                </div>
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
            aria-label="Add new note"
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
                    maxHeight: "90vh",
                    
                    borderRadius: "0.5rem",
                    padding: "0",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }
            }}
            contentLabel="Add/Edit Note"
            className="w-[45%] max-w-3xl overflow-scroll"
            overlayClassName="fixed inset-0 flex items-center justify-center p-4"
            
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
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
        />
    </>
)
} 

export default Home


//grid grid-cols-3 gap-5 m-5


// return (
//         <>
//         <Navbar userInfo={userInfo} onSearchNote = {onSearchNote} handleClearSearch = {handleClearSearch}/>

//         <div className="container mx-auto"> 
//                 {allNotes.length > 0 ? 
//                     (<div className="grid grid-cols-3 gap-5 m-5">
//                         {allNotes.map((item) => (
//                         <NoteCard 
//                             key={item._id}
//                             title={item.title}
//                             date={item.createdOn}
//                             content={item.content}
//                             priority={item.priority}
//                             deadline={item.dueDate}
//                             tags={item.tags}
//                             isDone={item.isDone}
//                             onEdit={() => handleEdit(item)}
//                             onDelete={() => deleteNote(item)}
//                             onDoneNote={() => updateIsDone(item)}
//                             hovered={hoveredNoteId===item._id}
//                             onMouseEnter={() => setHoveredNoteId(item._id)}
//                             onMouseLeave={() => setHoveredNoteId(null)}
//                         />
//                     ))} 
//                     </div>)
//                 : <EmptyCard 
//                 imgSrc = {isSearch ? NoData : AddNotesImg} 
//                 message = {isSearch 
//                     ? "Oops! No notes match your search"
//                     : "Click the '+' button at the bottom to keep track of your tasks and thoughts!"
//                 }
//                 />
//             }
            
//         </div>

//         <button
//             className="fixed w-16 h-16 flex items-center justify-center rounded-full bottom-10 right-10 bg-yellow hover:bg-red hover:shadow-2xl transition-shadow z-50"
//             onClick={() => {
//                 setOpenAddEditModal({
//                     isShown: true,
//                     type: "add",
//                     data: null,
//                 });
//             }}>
//             <MdAdd className="text-2xl text-green" />
//         </button>

//         <Modal 
//             isOpen={openAddEditModal.isShown}
//             onRequestClose={() => {}}
//             style={{
//                 overlay: {
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 }
//             }}
//             contentLabel=""
//             className="w-[50%] max-h-6/7 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//         >
//             <AddEditNotes 
//                 type={openAddEditModal.type}
//                 nodeData={openAddEditModal.data}
//                 getAllNotes={getAllNotes}
//                 onClose={() => { 
//                     setOpenAddEditModal({ isShown:false, type:"add", data:null});
//                 }}
//                 showToastMessage={showToastMessage}
//             />
//         </Modal>

//         <Toast
//             isShown = {showToastMsg.isShown}
//             message = {showToastMsg.message}
//             type = {showToastMsg.type}
//             onClose = {handleCloseToast}
//         />

//         </>  
//     )



//adding the completedTasks area

                // {/* Main Content Area */}
                // <div className="bg-white rounded-xl shadow-lg p-6">
                //     <h1 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Tasks</h1>
                    
                //     {/* Notes Grid */}
                //     {allNotes.length > 0 ? (
                //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                //             {allNotes.map((item) => ( 
                //                 <div key={item._id}
                //                     className="h-full" // Ensure consistent height
                //                     >
                //                 <NoteCard 
                //                     key={item._id}
                //                     title={item.title}
                //                     date={item.createdOn}
                //                     content={item.content}
                //                     priority={item.priority}
                //                     deadline={item.dueDate}
                //                     tags={item.tags}
                //                     isDone={item.isDone}
                //                     onEdit={() => handleEdit(item)}
                //                     onDelete={() => deleteNote(item)}
                //                     onDoneNote={() => updateIsDone(item)}
                //                     hovered={hoveredNoteId===item._id}
                //                     onMouseEnter={() => setHoveredNoteId(item._id)}
                //                     onMouseLeave={() => setHoveredNoteId(null)}
                //                 />
                //                 </div> 
                //             ))}
                //         </div>
                //     ) : (
                //         <EmptyCard 
                //             imgSrc={isSearch ? NoData : AddNotesImg} 
                //             message={isSearch 
                //                 ? "Oops! No notes match your search"
                //                 : "Click the '+' button below to create your first note!"
                //             }
                //         />
                //     )}


                //     <h1 className="text-2xl font-bold text-gray-800 my-6">Completed Tasks</h1>

                // </div>