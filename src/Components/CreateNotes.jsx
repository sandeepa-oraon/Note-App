import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Notes from './Notes'
import NotesHandle from './NotesHandle'


function CreateNotes() {
    const [inputText, setInputText] = useState("")
    const [notes, setNotes] = useState([]);
    const [text, setText]= useState([])
    const charLimit= 100 - inputText.length; 
    
    useEffect(() => {
        fetch('https://notes-a3fad-default-rtdb.firebaseio.com/notes.json')
            .then((data) => data.json())
            .then((data) => {
                let tempNotes = [];
                for (const key in data) {
                    let noteStore = {
                        id: key,
                        ...data[key]
                    };
                    tempNotes.push(noteStore);
                }
                setNotes(tempNotes);
            });
    }, []);

    const saveHandler = () => {
        if (inputText.trim()) {
            let newNote = { title: inputText };

            // Post to Firebase
            fetch('https://notes-a3fad-default-rtdb.firebaseio.com/notes.json', {
                method: 'POST',
                body: JSON.stringify(newNote),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                // Add new note to the state
                setNotes([...notes, { id: data.name, title: inputText }]);
                setInputText(""); // Clear input after saving
            });
        }
    };

    const deleteHandler = (id) => {
        fetch('https://notes-a3fad-default-rtdb.firebaseio.com/notes/' + id + '.json', {
            method: 'DELETE'
        }).then(() => {
            // Remove the deleted note from the state
            setNotes(notes.filter((note) => note.id !== id));
            console.log('deleted successfully');
        });
    };

    const editHandler = (id, updatedText) => {
        // Find the note by id and update its title
        const updatedNote = { title: updatedText };

        // Update Firebase
        fetch('https://notes-a3fad-default-rtdb.firebaseio.com/notes/' + id + '.json', {
            method: 'PUT',
            body: JSON.stringify(updatedNote),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // Update the local state after Firebase update
            const updatedNotes = notes.map((note) =>
                note.id === id ? { ...note, title: updatedText } : note
            );
            setNotes(updatedNotes);
            console.log('note updated successfully');
        });
    };

    useEffect(()=> {
        console.log(notes);
    }, [notes])
    return (
        <div className='CreateNotes'>
            {/* <NotesHandle inputText={inputText}/> */}
            
            <div className='notes notes-' >
                <textarea cols={20} rows={5} maxLength={100} 
                placeholder='Type...' value={inputText}
                onChange={(e) => setInputText(e.target.value)}></textarea>
                <div className="notesHandle">
                    <p>{charLimit} left</p>
                    <button className="Save" onClick={saveHandler}>Save</button>
                </div>
            </div>
            <div className="note-card">
                {notes.map((notes) => (
                    <NotesHandle notes={notes} deleteHandler={deleteHandler} key={notes.id}
                    editHandler={editHandler} 
                    />
                ))}
            </div>
    
        </div>
    )
}

export default CreateNotes