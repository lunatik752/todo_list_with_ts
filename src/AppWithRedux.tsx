import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {AddItemForm} from "./AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodoListDomainType,
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from 'react-redux';
import {TaskStatuses, TaskType} from "./api/tasks-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
const dispatch = useDispatch()


    const removeTask = useCallback(function (id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch])

    const addTask = useCallback(function (title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    },[dispatch])

    const changeStatus = useCallback(function(id: string, status: TaskStatuses, todoListId: string) {
        dispatch(changeTaskStatusAC(id, status, todoListId))
    }, [dispatch])


    const changeFilter = useCallback(function (value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }, [dispatch])

    const removeTodoList = useCallback(function (id: string) {
        dispatch(removeTodoListAC(id))
    }, [dispatch])

    const addTodoList = useCallback( function (title: string)  {
        dispatch(addTodoListAC(title));
    }, [dispatch])

    const changeTitle = useCallback(function (id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback(function (newTitle: string, todoListId: string) {
        dispatch(changeTodoListTitleAC(newTitle, todoListId))
    }, [dispatch])


    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>{
                    todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id];

                            return <Grid  key={tl.id}  item>
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


