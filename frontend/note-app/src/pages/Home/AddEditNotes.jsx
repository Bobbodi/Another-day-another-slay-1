import React from 'react'
import TagInput from '../../components/Input/TagInput'
import { useState } from 'react'
import { MdClose } from "react-icons/md"
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({ nodeData, type, getAllNotes, onClose, showToastMessage }) => {

    const nodeData2 = nodeData || {}

    const [title, setTitle] = useState(nodeData2.title || ""); 
    const [content, setContent] = useState(nodeData2.content || ""); 
    const [tags, setTags] = useState(nodeData2.tags || []);
    const [priority, setPriority] = useState(nodeData2.priority || 0);
    const [dueDate, setDueDate] = useState(nodeData2.dueDate);

    const [error, setError] = useState(null); 

    const onKeyDown = (e) => { 
        if (type ==='edit' && e.key === 'Enter') { 
            editNote();
        }
        if (type ==='add' && e.key === 'Enter') { 
            addNewNote();
        }
    }

    //AddNote 
    const addNewNote = async () => {
      
      try { 
        console.log("here2")
        const response = await axiosInstance.post("/add-note", { 
          title, content, priority, dueDate, tags,
        })

        if (response.data && response.data.note) { 
          console.log("here3")
          showToastMessage("Note Added Succesfully")
          getAllNotes()
          onClose()
        } 

      } catch (error) { 
        if (error.response && error.response.data && error.response.data.message) { 
          setError(error.response.data.message)
        }
      }
    };

    //edit note
    const editNote = async () => {
      const noteId = nodeData._id;
      try { 
        console.log("here2")
        const response = await axiosInstance.put("/edit-note/" + noteId, { 
          title, content, priority, dueDate, tags,
        })

        if (response.data && response.data.note) { 
          console.log("here3")
          showToastMessage("Note Edited Succesfully")
          getAllNotes()
          onClose()
        } 

      } catch (error) { 
        if (error.response && error.response.data && error.response.data.message) { 
          setError(error.response.data.message)
        }
      }
    };


    const handleAddNode = () => { 
      if (!title) { 
        setError("Please enter the title");
        return;
      }
      setError("");

      if (type ==='edit') { 
        console.log("editing")
        editNote()
      } else { 
        console.log("here")
        addNewNote()
      }
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
        <label className="input-label text-2xl">Title</label>
        <input
          type="text"
          className="text-xl text-blue outline-none p-2"
          placeholder="Study BTT tmr"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

    <div className="flex flex-row justify-between">
    
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Priority (0-5):</label>
        <input 
          type="number" 
          className="text-l text-blue outline-none bg-slate-50  rounded-xl p-2"
          placeholder='0' 
          min="0" 
          max="5"
          value={priority}
          onChange={({ target }) => setPriority(target.value)} 
          onKeyDown={onKeyDown}
          />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Due Date (if any)</label>
          <input
            className="text-l text-blue outline-none bg-slate-50  rounded-xl p-2"
            placeholder='2025-05-22T22:26'
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            min="2025-05-22T22:26"
            max="2100-05-22T00:00"
            value={dueDate}
            onChange={({ target }) => setDueDate(target.value)}  
            onKeyDown={onKeyDown}/>
      </div>
    </div> 

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Details</label>
        <textarea
          type="text"
          className="text-sm text-blue outline-none bg-slate-50 p-2 rounded-xl"
          placeholder="Location at Bukit Batok"
          rows={2}
          value={content}
          onChange={({ target }) => setContent(target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="flex flex-col mt-3">
        <label className="input-label mb-2">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4"> {error} </p>}
      <button
        className="btn-secondary"
        onClick={handleAddNode}
        onKeyDown={onKeyDown}
      >
        {type === 'edit' ? 'Save' : 'Add'}
      </button>
    </div>
  )
}

export default AddEditNotes
