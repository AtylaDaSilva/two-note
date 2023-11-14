//React
import React from 'react';

//ReactMDE
import ReactMde, { TextArea } from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

//CSS
import '../../css/editor/Editor.css';

//Markdown Converter
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function Editor(props) {
    //State
    const [selectedTab, setSelectedTab] = React.useState("write");

    //Render
    return (
        <div className="Editor">
            <ReactMde
                value={props.currentNote.body}
                onChange={(text) => { return props.callbacks.updateNote(text) }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                heightUnits='vh'
                minEditorHeight={81}
                minPreviewHeight={71}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}