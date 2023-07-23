import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "../App.css";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note  , updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pen-to-square fa-lg me-3 icono"
              onClick={() => {
              updateNote(note);
             
            }}>
            </i>
          <i
            className="fa-solid fa-trash fa-lg icono"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Note is Deleted" ,"" )
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
