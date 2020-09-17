import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemsForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {FilterValuesType} from "./state/todoList-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";


type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (todoListId: string, title: string) => void,
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void,
    filter: string,
    todoListId: string,
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}

export const TodoList = React.memo(function (props: PropsType) {

        console.log("Todolist called")

        const addTask = useCallback((title: string) => {
            props.addTask(props.todoListId, title);
        }, [props.addTask, props.todoListId])

        const onAllClickHandler = useCallback(() => {
            props.changeFilter('all', props.todoListId)
        }, [props.changeFilter, props.todoListId]);

        const onActiveClickHandler = useCallback(() => {
            props.changeFilter('active', props.todoListId)
        }, [props]);

        const onCompletedClickHandler = useCallback(() => {
            props.changeFilter('completed', props.todoListId)
        }, [props.changeFilter, props.todoListId]);


        const removeTodoList = () => {
            props.removeTodoList(props.todoListId)
        }

        const changeTodoListTitle = useCallback((newtTitle: string) => {
            props.changeTodoListTitle(newtTitle, props.todoListId)
        }, [props.changeTodoListTitle, props.todoListId]);

        let tasksForTodoList = props.tasks;

        if (props.filter === 'active') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
        }
        if (props.filter === 'completed') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
        }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListId))
    }, [])


        return <div>
            <div className={'todoListTitle'}>
                <h3><EditableSpan title={props.title} onChangeTitle={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map(task => <Task
                    key={task.id}
                    task={task} removeTask={props.removeTask}
                    changeStatus={props.changeStatus} todoListId={props.todoListId}
                    changeTaskTitle={props.changeTaskTitle}/>)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                        color='default'
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                        color='primary'
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    }
)