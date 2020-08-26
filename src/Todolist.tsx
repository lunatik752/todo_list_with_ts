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
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    filter: string,
    todoListId: string,
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.todoListId);
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
        props.changeFilter('all', props.todoListId)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoListId)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoListId)
    }

    let inputClassName = error ? 'error' : '';

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }


    return <div>
        <div className={'todoListTitle'}>
            <h3>{props.title}</h3>
            <button onClick={removeTodoList}>х</button>
        </div>
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
                const onClickHandler = () => props.removeTask(task.id, props.todoListId)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeStatus(task.id, newIsDoneValue, props.todoListId)
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