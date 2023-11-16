//React
import React from 'react';

//ReactMDE
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

//Markdown Converter
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function Editor(props) {
    // Write/Preview state. Starts as "write" by default.
    const [selectedTab, setSelectedTab] = React.useState("write");

    //Render
    return (
        <div className="h-100">
            <ReactMde
                value={props.currentNote.body}
                onChange={(text) => { return props.callbacks.updateNote(text) }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                heightUnits='vh'
                minEditorHeight={94}
                minPreviewHeight={84}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}