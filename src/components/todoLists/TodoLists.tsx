import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "../../common/AddItemsForm";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "../todoList/TodoList";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListDomainType
} from "../todoList/todoList-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../task/tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {TasksStateType} from "../app/AppWithRedux";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsType> = ({demo = false}) => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()


    const removeTask = useCallback(function (taskId: string, todoListId: string) {
        dispatch(removeTaskTC({taskId, todoListId}))
    }, [dispatch])

    const addTask = useCallback(function (todoListId: string, title: string) {
        dispatch(addTaskTC({todoListId, title}))
    }, [dispatch])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todoListId: string) {
        dispatch(updateTaskTC({taskId, domainModel: {status}, todoListId}))
    }, [dispatch])


    const changeFilter = useCallback(function (value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC({newFilter: value, todoListId}))
    }, [dispatch])

    const removeTodoList = useCallback(function (id: string) {
        dispatch(removeTodoListTC(id))
    }, [dispatch])

    const addTodoList = useCallback(function (title: string) {
        dispatch(addTodoListTC(title));
    }, [dispatch])

    const changeTitle = useCallback(function (taskId: string, newTitle: string, todoListId: string) {
        dispatch(updateTaskTC({taskId, domainModel: {title: newTitle}, todoListId}))
    }, [dispatch])

    const changeTodoListTitle = useCallback(function (newTitle: string, todoListId: string) {
        dispatch(changeTodoListTitleTC({newTitle, todoListId}))
    }, [dispatch])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [demo, dispatch, isLoggedIn])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>

        <Grid container spacing={3}>{
            todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id];

                    return <Grid key={tl.id} item>
                        <Paper style={{padding: "10px", backgroundColor: '#cfe8fc'}}>
                            <TodoList
                                todoList={tl}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                }
            )}
        </Grid>
    </>
}
