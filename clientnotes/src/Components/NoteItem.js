import React, { useContext,useState } from 'react';
import noteContext from '../Contexts/Notes/Notecontext';
import './NoteItem.css'; 
import NoteAIActions from './NoteAIActions';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updateNote } = props;
  const [expanded, setExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

const toggleExpanded = () => {
setExpanded(!expanded);
};

const handleCopyClick = async () => {
  const textToCopy = `Title: ${note.title}\nDescription: ${note.description}`;
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert("Note copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};


console.log("showAI in NoteItem:", props.showAI);

 return (
<div className="card my-3" style={{ minHeight: "180px" }}>
<div className="card-body d-flex flex-column justify-content-between h-100 text-start">
{/* Title left, badge right */}
<div className="d-flex justify-content-between align-items-start">
<h5 className="card-title mb-1">{note.title}</h5>
<span className="badge bg-secondary">{note.tag}</span>
</div>

            {/* Description */}
    <p className={`card-text note-description ${expanded ? 'expanded' : 'collapsed'} mt-2 mb-0`}>
      {note.description}
    </p>
    {note.description.length > 200 && (
      <button className="toggle-btn mt-1" onClick={toggleExpanded}>
        {expanded ? 'Read less' : 'Read more'}
      </button>
    )}

    {/* Icons */}
    <div className="mt-2 d-flex  align-items-center gap-4 ">
      <i
        className="fa-solid fa-trash "
        role="button"
        title="Delete"
        onClick={() => { deletenote(note._id); }}
      ></i>
      <i
        className="fa-solid fa-pen-to-square"
        role="button"
        title="Edit"
        onClick={() => { updateNote(note); }}
      ></i>
      <i
        className="fa-solid fa-copy"
        role="button"
        title="Copy"
        onClick={handleCopyClick}
          ></i>
    </div>
       {props.showAI && (
  <div className="mt-2">
    <NoteAIActions noteId={note._id} noteContent={note.description} note={note} />
  </div>
)}
  </div>
</div>
);
};

export default NoteItem;
