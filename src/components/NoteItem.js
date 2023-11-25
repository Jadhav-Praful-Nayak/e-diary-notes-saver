import React,{ useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context=useContext(noteContext);
    const {deletenote}=context;
  const { note,updateNote } = props;
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <div className="col-md-3">
      <div className="card header text-end">
        <span className="badge bg-secondary">{formatDate(note.date)}</span>
      </div>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deletenote(note._id)
          props.showAlert("successfully deleted the notes","success")}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
