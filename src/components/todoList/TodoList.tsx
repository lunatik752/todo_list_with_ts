import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../common/AddItemsForm";
import {EditableSpan} from "../../common/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "../task/Task";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {FilterValuesType, TodoListDomainType} from "../../state/todoList-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../state/tasks-reducer";
import {RequestStatusType} from "../../state/app-reducer";


type PropsType = {
    todoList: TodoListDomainType
    tasks: Array<TaskType>
    entityStatus: RequestStatusType
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {

        console.log("Todolist called")

        const addTask = useCallback((title: string) => {
            debugger
            props.addTask(props.todoList.id, title);
        }, [props.addTask, props.todoList.id])

        const onAllClickHandler = useCallback(() => {
            props.changeFilter('all', props.todoList.id)
        }, [props.changeFilter, props.todoList.id]);

        const onActiveClickHandler = useCallback(() => {
            props.changeFilter('active', props.todoList.id)
        }, [props]);

        const onCompletedClickHandler = useCallback(() => {
            props.changeFilter('completed', props.todoList.id)
        }, [props.changeFilter, props.todoList.id]);


        const removeTodoList = () => {
            props.removeTodoList(props.todoList.id)
        }

        const changeTodoListTitle = useCallback((newtTitle: string) => {
            props.changeTodoListTitle(newtTitle, props.todoList.id)
        }, [props.changeTodoListTitle, props.todoList.id]);

        let tasksForTodoList = props.tasks;

        if (props.todoList.filter === 'active') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
        }
        if (props.todoList.filter === 'completed') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
        }

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todoList.id))
    }, [])

        return <div>

            <div className={'todoListTitle'}>
                <h3><EditableSpan title={props.todoList.title} onChangeTitle={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            <div>
                {tasksForTodoList.map(task => <Task
                    key={task.id}
                    task={task} removeTask={props.removeTask}
                    changeStatus={props.changeStatus} todoListId={props.todoList.id}
                    changeTaskTitle={props.changeTaskTitle}/>)}
            </div>
            <div>
                <Button variant={props.todoList.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                        color='default'
                >All
                </Button>
                <Button variant={props.todoList.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                        color='primary'
                >Active
                </Button>
                <Button variant={props.todoList.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    }
)