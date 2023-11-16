//React
import React from 'react'

//React Bootstrap components
import { Button } from 'react-bootstrap';

export default function NoNotes(props) {
    return (
        <div className='container-fluid h-100 d-flex flex-column align-items-center justify-content-center'>
            <h2>Looks like you don't have any notes.</h2>
            <Button
                variant='primary'
                onClick={props.handleCreateNoteButtonClick}
            >
                Create a Note!
            </Button>
        </div>
    );
}