import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}

type AddItemPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemPropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async  () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label="Title"
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton color='primary' onClick={addItemHandler} disabled={disabled} style={{marginLeft: '10px'}}>
                <AddBox/>
            </IconButton>
        </div>)

})
