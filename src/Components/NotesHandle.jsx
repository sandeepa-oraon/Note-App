import React, { useEffect, useState } from 'react'
function NotesHandle(props) {
    
    const {notes, deleteHandler, editHandler}= props

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(notes.title);

    const charLimit= 100- notes.title.length
    
    // useEffect(()=>{
    //     console.log(notes);
    // }, [])
    

    const handleDelete = () => {
        // Call the delete handler with the note's id
        deleteHandler(notes.id);
    };
    const handleEdit = () => {
        setIsEditing(true)
    }
    const handleSave = () => {
        setIsEditing(false)
        editHandler(notes.id, editedText)
    }
    return (
        <div className='noteHandle notes'>
            <textarea cols={20} rows={5} maxLength={100}
                value={editedText} readOnly={!isEditing}
                onChange={(e) => setEditedText(e.target.value)}
            ></textarea>
            <div className="NotesHandle"> 
                <p>{charLimit} left</p>       
                <div className="">
                    {/* <button className="save">Edit</button> */}
                    {isEditing ? (
                        <button className="save" onClick={handleSave}>
                            Save
                        </button>
                    ) : (
                        <button className="save" onClick={handleEdit}>
                            Edit
                        </button>
                    )}
                    <button className="delete" onClick={handleDelete}>Delete</button>
                    {/* <button className="Edit" onClick={handleEdit}>Edit</button> */}
                    
                </div>
            </div>
        </div>
    )
}

export default NotesHandle