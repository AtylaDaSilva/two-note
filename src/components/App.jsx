//React
import React from 'react'

//Components
import Toolbar from './toolbar/Toolbar'; //=================== TODO
import Split from 'react-split';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
import NoNotes from './editor/NoNotes';

//CSS
import '../css/App.css';
import '../css/split.css';

export default function App() {
  function createNewNote() {
    setNotes(currentState => {
      let newState = [...currentState];
      
      const newNote = {
        id: newState.length + 1,
        title: "New Note",
        body: "# New Note"
      };

      newState.push(newNote);

      updateCurrentNote(newNote);      

      return newState;
    });
  }

  function deleteNote(noteIndex) { 
    setNotes(currentState => { 
      let newState = [];

      currentState.forEach((note, index) => {

        if (index !== noteIndex) {
          newState.push(note);
        }
      });

      if (isCurrentNote(notes[noteIndex])) { 
        updateCurrentNote(newState[0] || {id: -1, body:""});
      }

      return newState;
    });
  }

  function updateNote(text) {
    const currentNote = getCurrentNote();
    //newNoteTitle will be the first line of text, excluding any markdown characters (e.g.: #, *)
    const newNoteTitle = removeSpecialCharacters(text.split("\n")[0]);

    setNotes(currentState => {
      return currentState.map(note => {
        return (note.id === currentNote.id) ? { ...note, body: text, title: (newNoteTitle || "New Note") } : note;
      })
    });

    updateCurrentNote({ ...currentNote, body: text, title: (newNoteTitle || "New Note") });
  }

  function isCurrentNote(note) { 
    return note === currentNote;
  }

  function getCurrentNote() { 
    return currentNote;
  }

  function updateCurrentNote(note) {
    setCurrentNote(note);
  }

  function removeSpecialCharacters(text) { 
    const search = /[\u0300-\u036f]|[#*^~´`'"!?/\\|@$%¨&()\-_=+<>,.;:\[\]\{\}\º§¬¢£³²¹ª₢]/g;
    const replace = "";

    return text.normalize("NFD").replaceAll(search, replace);
  }

  function initializeNotes() { 
    return JSON.parse(localStorage.getItem("notes")) || [];
  }

  const [notes, setNotes] = React.useState(initializeNotes)
  const [currentNote, setCurrentNote] = React.useState(notes[0] || {})
  const callbacks = {
    createNewNote,
    deleteNote,
    updateCurrentNote,
    updateNote
  }

  React.useEffect(() => { 
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, currentNote]);

  return (
    <div className="App">
      {//=================== TODO
      /*<header className='App-header'>
        <Toolbar />
      </header>*/
      }
      <div className='App-body'>
        <Split
          className='split'
          sizes={[10, 90]}
        >
          <aside className='App-sidebar'>
            <Sidebar notes={notes} callbacks={ callbacks } />
          </aside>
          <main className='App-main'>
            {
              (notes.length > 0)
                ? <Editor currentNote={currentNote} callbacks={callbacks} />
                : <NoNotes handleCreateNoteButtonClick={ createNewNote } />
            }
          </main>
        </Split>
      </div>
    </div>
  );
}
