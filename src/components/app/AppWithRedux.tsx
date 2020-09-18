import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, LinearProgress} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {AddItemForm} from "../../common/AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListDomainType
} from "../../state/todoList-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "../../state/tasks-reducer";
import {AppRootStateType} from "../../state/store";
import {useDispatch, useSelector} from 'react-redux';
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {TodoList} from "../todoList/TodoList";
import {RequestStatusType} from "../../state/app-reducer";
import {ErrorSnackbar} from "../../common/Allert";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()


    const removeTask = useCallback(function (id: string, todoListId: string) {
        dispatch(removeTasksTC(id, todoListId))
    }, [dispatch])

    const addTask = useCallback(function (todoListId: string, title: string) {
        dispatch(addTaskTC(todoListId, title))
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todoListId: string) {
        dispatch(updateTaskTC(id, {status}, todoListId))
    }, [dispatch])


    const changeFilter = useCallback(function (value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }, [dispatch])

    const removeTodoList = useCallback(function (id: string) {
        dispatch(removeTodoListTC(id))
    }, [dispatch])

    const addTodoList = useCallback(function (title: string) {
        dispatch(addTodoListTC(title));
    }, [dispatch])

    const changeTitle = useCallback(function (id: string, newTitle: string, todoListId: string) {
        dispatch(updateTaskTC(id, {title: newTitle}, todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback(function (newTitle: string, todoListId: string) {
        dispatch(changeTodoListTitleTC(newTitle, todoListId))
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>{
                    todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id];

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px", backgroundColor: '#cfe8fc'}}>
                                    <TodoList
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        todoListId={tl.id}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}</Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


