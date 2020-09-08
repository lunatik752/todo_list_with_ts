import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {AddItemForm} from "./AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from 'react-redux';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
const dispatch = useDispatch()


    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }

    function removeTodoList(id: string) {
        dispatch(removeTodoListAC(id))
    }

    const addTodoList = useCallback( (title: string) => {
        dispatch(addTodoListAC(title));
    }, [])

    function changeTitle(id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        dispatch(changeTodoListTitleAC(newTitle, todoListId))
    }


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
                            let allTodoListTask = tasks[tl.id];
                            let tasksForTodoList = allTodoListTask

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodoListTask.filter(task => !task.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTask.filter(task => task.isDone)
                            }

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


