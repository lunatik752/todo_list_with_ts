import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../common/AddItemsForm";
import {EditableSpan} from "../../common/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "../task/Task";
import {TaskStatuses} from "../../api/tasks-api";
import {TodoListDomainType} from "../todoLists/todoList-reducer";
import {TaskDomainType} from "../task/tasks-reducer";
import {useActions} from "../../state/store";
import {tasksActions} from "../task";
import {todoListsActions} from "../todoLists";


type PropsType = {
    todoList: TodoListDomainType
    tasks: Array<TaskDomainType>
    demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {

        const {fetchTasks, addTask, removeTask, updateTask} = useActions(tasksActions)
        const {changeTodoListFilter, removeTodoListTC, changeTodoListTitleTC} = useActions(todoListsActions)


        const changeTaskStatus = useCallback(function (taskId: string, status: TaskStatuses, todoListId: string) {
            updateTask({taskId, domainModel: {status}, todoListId})
        }, [updateTask])

        const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todoListId: string) {
            updateTask({taskId, domainModel: {title: newTitle}, todoListId})
        }, [updateTask])

        const addTaskCallback = useCallback((title: string) => {
            addTask({todoListId: props.todoList.id, title: title});
        }, [addTask, props.todoList.id])

        const onAllClickHandler = useCallback(() => {
            changeTodoListFilter({newFilter: 'all', todoListId: props.todoList.id})
        }, [changeTodoListFilter, props.todoList.id]);

        const onActiveClickHandler = useCallback(() => {
            changeTodoListFilter({newFilter: 'active', todoListId: props.todoList.id})
        }, [changeTodoListFilter, props.todoList.id]);

        const onCompletedClickHandler = useCallback(() => {
            changeTodoListFilter({newFilter: 'completed', todoListId: props.todoList.id})
        }, [changeTodoListFilter, props.todoList.id]);


        const removeTodoList = () => {
            removeTodoListTC(props.todoList.id)
        }

        const changeTodoListTitle = useCallback((newtTitle: string) => {
            changeTodoListTitleTC({newTitle: newtTitle, todoListId: props.todoList.id})
        }, [changeTodoListTitleTC, props.todoList.id]);

        let tasksForTodoList = props.tasks;

        if (props.todoList.filter === 'active') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
        }
        if (props.todoList.filter === 'completed') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
        }


        useEffect(() => {
            if (demo) {
                return
            }
            fetchTasks(props.todoList.id)
        }, [demo, fetchTasks, props.todoList.id])

        return <div>
            <div className={'todoListTitle'}>
                <h3><EditableSpan title={props.todoList.title} onChangeTitle={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoList} disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback} disabled={props.todoList.entityStatus === 'loading'}/>
            <div>
                {tasksForTodoList.map(task => <Task
                    key={task.id}
                    task={task} removeTask={removeTask}
                    changeStatus={changeTaskStatus} todoListId={props.todoList.id}
                    changeTaskTitle={changeTaskTitle}/>)}
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
