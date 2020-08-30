import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItem} from "./AddItemsForm";
import {EditableSpan} from "./EditableSpan";

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
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void

}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId);
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


    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }



    return <div>
        <div className={'todoListTitle'}>
            <h3>{props.title}</h3>
            <button onClick={removeTodoList}>х</button>
        </div>
        <AddItem addItem={addTask}/>
        <ul>
            {props.tasks.map(task => {

                const onClickHandler = () => props.removeTask(task.id, props.todoListId)

                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeStatus(task.id, newIsDoneValue, props.todoListId)
                }
                const onChangeTitleHandler = (newtTitle: string) => {
                    props.changeTaskTitle(task.id, newtTitle, props.todoListId)
                }

                return <li key={task.id}
                           className={task.isDone ? 'isDone' : ''}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={onChangeStatusHandler}
                    />
                    <EditableSpan title={task.title} onChangeTitle={onChangeTitleHandler}/>
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