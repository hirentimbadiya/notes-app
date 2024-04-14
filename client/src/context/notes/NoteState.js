import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_HOST;

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = await response.json()
      setNotes(json)
    } catch (error) {
      console.log(error.message);
    }
  }

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      });
  
      const note = await response.json();
      setNotes(notes.concat(note))
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      });
  
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    } catch (error) {
      console.log(error.message);
    }
  }

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      });
  
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;