import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type  EditableSpanPropsType = {
    title: string;
    onChangeTitle: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title)

    function activateEditMode() {
        props.disabled ? setEditMode(false)
        :setEditMode(true);
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
        ? <TextField variant='outlined'
                     value={title}
                     autoFocus
                     onChange={onChangeInputValue}
                     onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode} >{props.title}</span>

})
