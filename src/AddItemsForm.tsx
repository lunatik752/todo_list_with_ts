import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "@material-ui/core";


type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItem(props: AddItemPropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem()
        }
    }
    let inputClassName = error ? 'error' : '';

    return (
        <div>
            <input className={inputClassName}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <Button variant='contained' color='primary' onClick={addItem}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>)

}