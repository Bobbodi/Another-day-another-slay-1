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
  <div className="relative p-6 bg-white rounded-lg max-w-lg mx-auto">
    {/* Close Button */}
    <button
      className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
      onClick={onClose}
      aria-label="Close modal"
    >
      <MdClose className="text-xl text-gray-500 hover:text-red-500" />
    </button>

    <div className="space-y-6">
      {/* Date Display */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Date</label>
        <p className="text-lg font-medium text-blue-500">
          {weekday}, {month} {day}, {year}
        </p>
      </div>
      
      {/* Journal Entry */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Yap Time</label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
          placeholder="What's on your mind today?"
          value={entry}
          onChange={({ target }) => setEntry(target.value)}
          onKeyDown={onKeyDown}
          
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm py-2">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        onClick={handleAddNode}
      >
        Yap time over
      </button>
    </div>
  </div>
)
}

export default AddNotes
