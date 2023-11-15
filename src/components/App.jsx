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
  /** Creates a new Note object and sets it as the current note.
   */
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

  /**
   * Deletes a note and, if the deleted note is the current note, changes the current note to the first note in the notes state.
   * @param {*} noteIndex The index of the note object to be deleted.
   */
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

  /**
   * Updates the note's body and title with whatever the user typed in the editor. The note's title is the first line of the editor.
   * @param {*} text Text typed into the editor. This param is received from the onChange prop of the ReactMDE component.
   */
  function updateNote(text) {
    const currentNote = getCurrentNote();
    //newNoteTitle will be the first line of text, excluding any markdown characters or accentuation (e.g.: #, *, ~)
    const newNoteTitle = removeSpecialCharacters(text.split("\n")[0]);

    setNotes(currentState => {
      return currentState.map(note => {
        return (note.id === currentNote.id) ? { ...note, body: text, title: (newNoteTitle || "New Note") } : note;
      })
    });

    updateCurrentNote({ ...currentNote, body: text, title: (newNoteTitle || "New Note") });
  }

  /**
   * Returns true if the note is the current note, false otherwise.
   * @param {*} note Note object
   * @returns Boolean
   */
  function isCurrentNote(note) { 
    return note === currentNote;
  }

  /**
   * Returns the current note object
   * @returns currentNote object
   */
  function getCurrentNote() { 
    return currentNote;
  }

  /**
   * Updates the current note object.
   * @param {*} note The new current note object
   */
  function updateCurrentNote(note) {
    setCurrentNote(note);
  }

  /**
   * Removes any accentuation or markdown characters from text. 
   * @param {*} text The string of text to remove special characters.
   * @returns String of text without any special charactes.
   */
  function removeSpecialCharacters(text) { 
    const search = /[\u0300-\u036f]|[#*^~´`'"!?/\\|@$%¨&()\-_=+<>,.;:\[\]\{\}\º§¬¢£³²¹ª₢]/g; //Regexp with gobal flag
    const replace = "";

    return text.normalize("NFD").replaceAll(search, replace);
  }

  /**
   * Initializes notes state by retrieving the notes from localStorage.
   * @returns Array of note objects or empty array
   */
  function initializeNotes() { 
    return JSON.parse(localStorage.getItem("notes")) || [];
  }

  //State
  const [notes, setNotes] = React.useState(initializeNotes)
  const [currentNote, setCurrentNote] = React.useState(notes[0] || { id: "", title: "", body: "" })
  
  //Callback functions to be passed as props
  const callbacks = {
    createNewNote,
    deleteNote,
    updateCurrentNote,
    updateNote
  }

  /**
   * Stores notes in localStorage.
   */
  React.useEffect(() => { 
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, currentNote]);

  //Render
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
            <Sidebar notes={notes} currentNote={currentNote} callbacks={ callbacks } />
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
