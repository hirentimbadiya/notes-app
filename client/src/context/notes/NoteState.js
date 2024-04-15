import React, { useMemo, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_HOST;

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const memoizedNotes = useMemo(() => notes, [notes]);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      });

      if (response.status !== 200) throw new Error("Failed to Fetch the Notes!");

      const json = await response.json()
      setNotes(json)
    } catch (error) {
      console.error(error.message);
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

      if (response.status !== 201) throw new Error("Failed to Add the Note!");

      const note = await response.json();
      setNotes(notes.concat(note))
    } catch (error) {
      console.error(error.message);
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

      if (response.status !== 200) throw new Error("Failed to Delete the Note!");

      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
    } catch (error) {
      console.error(error.message);
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

      if (response.status !== 200) throw new Error("Failed to Update the Note!");

      let newNotes = JSON.parse(JSON.stringify(notes))

      for (const note of newNotes) {
        if (note._id === id) {
          note.title = title;
          note.description = description;
          note.tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <NoteContext.Provider value={{ memoizedNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;