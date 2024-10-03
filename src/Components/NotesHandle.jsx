import React, { useEffect, useState } from 'react'
function NotesHandle(props) {
    
    const {notes, deleteHandler}= props
    const charLimit= 100- notes.title.length
    
    // useEffect(()=>{
    //     console.log(notes);
    // }, [])
    

    const handleDelete = () => {
        // Call the delete handler with the note's id
        deleteHandler(notes.id);
    };
    return (
        <div className='noteHandle notes'>
            <textarea cols={20} rows={5} maxLength={100}
                value={notes.title} readOnly
            ></textarea>
            <div className="NotesHandle"> 
                <p>{charLimit} left</p>       
                <div className="">
                    <button className="save">Edit</button>
                    <button className="delete" onClick={handleDelete}>Delete</button>
                    {/* <button className="Edit" onClick={editHandler(props.index)}>Edit</button> */}
                </div>
            </div>
        </div>
    )
}

export default NotesHandle