import React from 'react'
import { MdCreate, MdOutlinePushPin } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useState } from 'react';

const NoteCard = ({
    title, date, content, priority, dueDate, tags, isPinned, onEdit, onDelete, onPinNote, hovered, onMouseEnter, onMouseLeave}) => { 

    const [isPinHovered, setIsPinHovered] = useState(false);

    const displayContent = () => {
        return (
            <>
            {hovered && content.length == 0
                ? <p className="text-s text-white"> . </p>  
                : hovered 
                ? <p className="text-s note-hover-text"> {content} </p>  
                : content.length > 35 
                    ? <p className="text-s note-hover-text">{content?.slice(0, 35)}...</p> 
                    : content.length == 0
                        ? <p className="text-s text-white">.</p>
                        : <p className="text-s note-hover-text"> {content} </p>  
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
                <h6 className="text-s font-medium note-hover-text">{hovered ? title : title.length > 27 ? `${title?.slice(0, 27)}...` : title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
            </div>

            <div
                className="hover:bg-gray-100 hover:rounded-full"
                onMouseEnter={() => setIsPinHovered(true)}
                onMouseLeave={() => setIsPinHovered(false)}
            >
                <MdOutlinePushPin
                    className={`icon-btn hover:icon-btn ${
                        (isPinned && !isPinHovered) || (!isPinned && isPinHovered)
                            ? "text-green"
                            : "text-slate-300"
                    } m-3`} 
                    onClick={onPinNote}
                />
            </div>
        </div>
        <p className="text-s note-hover-text"> {displayContent()} </p> 
        
        <div className="flex items-center justify-between mt-2">
            <h1 className='text-xs text-slate-500'>Priority: {priority}</h1>
            <h1 className='text-xs text-slate-500'>Due in: {moment(dueDate).format('Do MMM YYYY')}</h1>
        </div>

        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500 note-hover-text">
                {tags.map((item) => 
                    `#${item} `
                )}
            </div>
            <div className="flex items-center gap-2">
                <MdCreate className="text-gray-300 cursor-pointer hover:text-green"
                    onClick={onEdit} />
                <MdDelete className="text-gray-300 cursor-pointer hover:text-red"
                    onClick={onDelete} />
            </div>

        </div>
    </div>
)

}

export default NoteCard

//<p className="text-s note-hover-text">{hovered ? content : content.length > 35 ? `${content?.slice(0, 35)}...` : content}</p>
