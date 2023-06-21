import React from "react";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

export default function AddNotePage() {
  const navigate = useNavigate();

  const onAddNoteHandler = async (note) => {
    await addNote(note);
    navigate("/");
  };

  return <NoteInput addNote={onAddNoteHandler} />;
}
