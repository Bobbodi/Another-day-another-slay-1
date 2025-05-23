import React from 'react'
import { useState } from 'react'
import {MdAdd, MdClose} from "react-icons/md"


const TagInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState(""); 

    const handleInputChange = (e) => { 
        setInputValue(e.target.value);
        
        return;
    }

    const addNewTag = () => { 
        if (inputValue.trim() !== "") { 
            setTags([...tags, inputValue.trim()]); 
            setInputValue("");
        }
        return;
    };

    const handleKeyDown = (e) => { 
        if (e.key === "Enter") { 
            addNewTag(); 
        } 
        return;
    }

    const handleRemoveTag = (tagToRemove) => { 
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }



return (
    <div>

            {tags?.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap mt-2 text-[#118ab2]">
                    {tags.map((tag, index) => (
                            <span key = {index} className = "text-[#118ab2] flex items-center gap-2 mb-2 text-sm bg-slate-50 px-3 py-1 rounded-full"> 
                            # {tag} 
                            <button onClick = {() => {handleRemoveTag(tag)}}>
                                    <MdClose className="hover:text-[#ef476f]"/>
                            </button>
                            </span>
                    ))}
            </div>
            )}

        <div className = "flex items-center gap-4"> 
            <input 
            type = "text" 
            value = {inputValue}
            className="w-full text-sm bg-slate-50 px-3 py-2 rounded-full outline-none text-[#119ab2]" 
            placeholder="Add tags"  
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}/>

            <button className="p-1.5 flex items-center justify-center rounded-full bg-[#ef476f] hover:bg-[#06d6a0]"
            onClick={() => {
                    addNewTag()
            }}>
                    <MdAdd className="text-2xl text-white"/>
            </button>
            </div> 
    </div>
)
}

export default TagInput

//border border-[#ef476f] border-opacity-50