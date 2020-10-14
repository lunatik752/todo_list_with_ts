import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "../../common/AddItemsForm";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "../todoList/TodoList";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FilterValuesType} from "./todoList-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../task/tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Redirect} from "react-router-dom";
import {authSelectors} from "../../features/login";
import {todoListsActions, todoListsSelectors} from "./index";
import {tasksSelectors} from "../task";

import {useActions} from "../../state/store";

type PropsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsType> = ({demo = false}) => {


    const todoLists = useSelector(todoListsSelectors.selectTodoList);
    const tasks = useSelector(tasksSelectors.selectTasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {addTodoListTC, changeTodoListTitleTC, removeTodoListTC, fetchTodoListsTC, changeTodoListFilterAC} = useActions(todoListsActions)
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
        changeTodoListFilterAC({newFilter: value, todoListId})
    }, [dispatch])

    const removeTodoList = useCallback(function (id: string) {
        removeTodoListTC(id)
    }, [removeTodoListTC])

    const addTodoList = useCallback(function (title: string) {
        addTodoListTC(title)
    }, [addTodoListTC])

    const changeTitle = useCallback(function (taskId: string, newTitle: string, todoListId: string) {
        dispatch(updateTaskTC({taskId, domainModel: {title: newTitle}, todoListId}))
    }, [dispatch])

    const changeTodoListTitle = useCallback(function (newTitle: string, todoListId: string) {
        changeTodoListTitleTC({newTitle, todoListId})
    }, [changeTodoListTitleTC])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodoListsTC()
    }, [demo, fetchTodoListsTC, isLoggedIn])


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
