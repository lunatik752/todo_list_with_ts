import React, {ChangeEvent, useState} from "react";


type  EditableSpanPropsType = {
    title: string;
    onChangeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title)

    function activateEditMode() {
        setEditMode(true);
        setTitle(props.title)
    }

    function deactivateEditMode() {
        setEditMode(false);
        props.onChangeTitle(title)
    }

    function onChangeInputValue(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input
            value={title}
            autoFocus
            onChange={onChangeInputValue}
            onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}