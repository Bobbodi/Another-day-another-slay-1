import React from 'react'
import { MdCreate, MdOutlinePushPin } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useState } from 'react';
import { BiNoEntry } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';

const JournalCard = ({
    entry, date, hovered, onMouseEnter, onMouseLeave}) => { 

    const [isPinHovered, setIsPinHovered] = useState(false);

    const displayContent = () => {
        return (
            <>
            {hovered && entry.length == 0
                ? <p className="text-s text-white"> . </p>  
                : hovered 
                ? <p className="text-s note-hover-text"> {entry} </p>  
                : entry.length > 35 
                    ? <p className="text-s note-hover-text">{entry?.slice(0, 35)}...</p> 
                    : entry.length == 0
                        ? <p className="text-s text-white">.</p>
                        : <p className="text-s note-hover-text"> {entry} </p>  
            }
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

        </div>

        <p className="text-s note-hover-text"> {displayContent()} </p> 

    </div>
)

}

export default JournalCard

//<p className="text-s note-hover-text">{hovered ? content : content.length > 35 ? `${content?.slice(0, 35)}...` : content}</p>
