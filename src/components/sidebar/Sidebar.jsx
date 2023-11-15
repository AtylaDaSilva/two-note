//React
import React from 'react'

//React Bootstrap components
import { Button } from 'react-bootstrap';

//CSS
import '../../css/sidebar/Sidebar.css';

//Render
export default function Sidebar(props) {
    return (
        <div className="Sidebar">
            <div className="Sidebar-header">
                <h2 className='Sidebar-title'>Notes</h2>
                <Button
                    variant='primary'
                    className='add-note-btn'
                    onClick={ props.callbacks.createNewNote }
                > + </Button>
            </div>
            <div className="Siderbar-note-container">
                {props.notes.map((note, index) => {
                    return (
                        <div
                            key={index}
                            className={`Sidebar-note ${
                                props.currentNote.id === note.id
                                ? "highlighted-note"
                                : "non-highlighted-note"
                            }` }
                        >
                            <div
                                className='container-sm d-flex align-items-center justify-content-between clickable'
                                onClick={() => {
                                    return props.callbacks.updateCurrentNote(note);
                                } }
                            >
                                <h3 className='note-title'>{note.title}</h3>
                            </div>
                            <button
                                    className="bi-trash d-flex align-items-center"
                                    onClick={() => {
                                        return props.callbacks.deleteNote(index);
                                    } }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </button>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}