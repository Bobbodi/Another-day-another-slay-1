import React from 'react'
import TagInput from '../../components/Input/TagInput'
import { useState } from 'react'
import { MdClose } from "react-icons/md"
import axiosInstance from '../../utils/axiosInstance'

const AddNotes = ({ nodeData, getAllJournal, onClose }) => {
    //Show date when adding 
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const weekday = today.toLocaleString('default', { weekday: 'long' });


    const nodeData2 = nodeData || {}

    const [entry, setEntry] = useState(nodeData2.entry || ""); 

    const [error, setError] = useState(null); 

    const onKeyDown = (e) => { 
        if (e.key === 'Enter') { 
            addNewJournal();
        }
    }

    //AddNote 
    const addNewJournal = async () => {
      
      try { 
        console.log("here2")
        const response = await axiosInstance.post("/add-journal", { 
          entry,
        })

        if (response.data && response.data.journal) { 
          console.log("here3")
          getAllJournal()
          onClose()
        } 

      } catch (error) { 
        if (error.response && error.response.data && error.response.data.message) { 
          setError(error.response.data.message)
        }
      }
    };


    const handleAddNode = () => { 
      if (!entry) { 
        setError("Please enter the title");
        return;
      }
      setError("");

      addNewJournal();
    }

  return (
    <div className='relative'>

      <button
        className="p-2 rounded-full flex items-center justify-center absolute -top-3 -right-3"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400 hover:text-red" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-2xl">Date</label>
        <p>{weekday}, {month} {day}, {year}</p>
      </div>
  
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Yap Time</label>
        <textarea
          type="text"
          className="text-sm text-blue outline-none bg-slate-50 p-2 rounded-xl"
          placeholder="yap yap yap"
          rows={5}
          value={entry}
          onChange={({ target }) => setEntry(target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4"> {error} </p>}

      <button
        className="btn-secondary"
        onClick={handleAddNode}
        onKeyDown={onKeyDown}
      >
        Yap time over
      </button>
    </div>
  )
}

export default AddNotes
