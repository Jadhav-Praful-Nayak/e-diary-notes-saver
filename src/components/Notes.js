import React, { useContext, useState, useEffect,useRef } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes,getNotes,editNote}=context;
  let navigate=useNavigate()
  // const [notes, getNotes,setNotes] = useState([]);
  const ref=useRef(null)
  const refClose=useRef(null)
  useEffect(() => {
    // Assuming context.notes contains the array of notes
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/signin')
    }
    // eslint-disable-next-line 
  }, [getNotes]);
  
  const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: "" });

  const handleClick = () => {
    // e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("successfully updated the notes","success")
    
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

   

    const updateNote=(currentNote)=>
    {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle"  value={note.etitle} onChange={onchange} aria-describedby="emailHelp" minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Descriptions</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} onChange={onchange} name="edescription" minLength={6} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" value={note.etag} onChange={onchange} name='etag'/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="container">
        <div className="row my-3">
          <h2>Your notes</h2>
          {/* {notes.map((note) => {
            return <NoteItem updateNote={updateNote} key={note._id} note={note} />;
          })} */}
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => {
              return <NoteItem showAlert={props.showAlert} updateNote={updateNote} key={note._id} note={note} />;
            })
          ) : (
            <p>No notes found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
