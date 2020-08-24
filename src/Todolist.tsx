import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export  type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title);
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(task => {

                const onClickHandler = () => props.removeTask(task.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeStatus(task.id, newIsDoneValue)
                }


                return <li key={task.id}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={onChangeHandler}
                    />
                    <span>{task.title}</span>
                    <button onClick={onClickHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All
            </button>
            <button onClick={onActiveClickHandler}>Active
            </button>
            <button onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}