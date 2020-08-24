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
    changeStatus: (id: string, isDone: boolean) => void,
    filter: string
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
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

    let inputClassName = error ? 'error' : ''


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={inputClassName}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(task => {
                const onClickHandler = () => props.removeTask(task.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeStatus(task.id, newIsDoneValue)
                }
                return <li key={task.id}
                           className={task.isDone ? 'isDone' : ''}>
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
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}