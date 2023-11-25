import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = () => {
        // e.preventDefault()
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("successfully added the notes", "success")
    };
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value });
    };
    return ( <
        div >
        <
        div className = "container" >
        <
        h2 className = "text-center" >
        <
        strong > E - diary - Save your activities < /strong> <
        /h2> <
        div className = "form-floating d-grid gap-2 col-4 mx-auto" >
        <
        input type = "text"
        className = "form-control"
        id = "title"
        placeholder = "title"
        name = "title"
        value = { note.title }
        onChange = { onchange }
        minLength = { 3 }
        required /
        >
        <
        label htmlFor = "floatingInput" > Title < /label> <
        /div> <
        div className = "form-floating d-grid row-6 col-4 mx-auto" >
        <
        input type = "text"
        className = "form-control"
        id = "description"
        name = "description"
        placeholder = "description"
        onChange = { onchange }
        minLength = { 6 }
        value = { note.description }
        required /
        >
        <
        label htmlFor = "floatingInput" > description < /label> <
        /div> <
        div className = "form-floating d-grid gap-2 col-4 mx-auto" >
        <
        input type = "text"
        className = "form-control"
        id = "tag"
        name = "tag"
        value = { note.tag }
        placeholder = "General"
        onChange = { onchange }

        /> <
        label htmlFor = "floatingInput" > Tag < /label> <
        /div> <
        div className = " d-grid col-1 mx-auto" >
        <
        button className = "btn btn-primary"
        style = {
            { paddingTop: "250px 0px" } }
        type = "button"
        onClick = { handleClick } >
        Add Notes <
        /button> <
        /div> <
        /div> <
        /div>
    );
};

export default AddNote;