import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItem} from "./AddItemsForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from '@material-ui/icons';


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
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
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

    const changeTodoListTitle = (newtTitle: string) => {
        props.changeTodoListTitle(newtTitle, props.todoListId)
    }


    return <div>
        <div className={'todoListTitle'}>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodoListTitle}/></h3>
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
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
                    <IconButton onClick={onClickHandler}>
                        <Delete />
                    </IconButton>
                </li>
            })}
        </ul>
        <div>
            <Button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                    color='default'
                    variant='contained'
            >All
            </Button>
            <Button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    color='primary'
            >Active
            </Button>
            <Button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    color='secondary'
            >Completed
            </Button>
        </div>
    </div>
}