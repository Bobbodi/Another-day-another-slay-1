import React from 'react'
import { MdCreate, MdOutlinePushPin } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useState } from 'react';
import { BiNoEntry } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';
import Toast from '../ToastMessage/Toast';

const JournalCard = ({
    entry, date, hovered, onMouseEnter, onMouseLeave, onDelete}) => { 

    const [isDoneHovered, setIsDoneHovered] = useState(false);

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

    const displayContent = () => {
        return (
            <>
            {entry ? (
                hovered ? (
                    <p className="text-s note-hover-text whitespace-pre-wrap break-words">
                    {entry}
                    </p>
                ) : (
                    <p className="text-s note-hover-text">
                    {entry.length > 25 ? `${entry.slice(0, 25)}...` : entry}
                    </p>
                )
                ) : (
                <p className="text-s text-white">.</p>
                )}
            </>
        )
    }

return (
    <div
        className="border rounded-2xl p-4 bg-white hover:shadow-2xl transition-all duration-200 ease-in-out group"
        style={{ borderColor: "#ffd166", borderWidth: "3px" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <style>
            {`
                .group:hover {
                    border-color: #ef476f !important;
                }
                .group:hover .note-hover-text {
                    color: #ef476f !important;
                }
            `}
        </style>
        <div className="flex items-center justify-between">
            <div>
                <span className='text-xl text-red'>{moment(date).format('Do MMM YYYY')}</span>
            </div>

            <div className="flex items-center gap-2">
                <MdDelete className="text-gray-300 cursor-pointer hover:text-red"
                    onClick={onDelete} />
            </div>

        </div>

        <p className="text-s note-hover-text"> {displayContent()} </p> 


        <Toast
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
        />
    </div>

    
)

}

export default JournalCard

//<p className="text-s note-hover-text">{hovered ? content : content.length > 35 ? `${content?.slice(0, 35)}...` : content}</p>
