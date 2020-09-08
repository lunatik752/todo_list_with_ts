import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AppBar, IconButton, Toolbar, Typography, Button} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import AddItemForm from "./AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, todoListReducer,
} from "./state/todoList-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

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


    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bue', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    })


    function removeTask(id: string, todoListId: string) {
        let action = removeTaskAC(id, todoListId);
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListId: string) {
        let action = addTaskAC(title, todoListId);
        dispatchToTasks(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let action = changeTaskStatusAC(id, isDone, todoListId);
        dispatchToTasks(action)
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let action = changeTodoListFilterAC(value, todoListId)
        dispatchToTodoLists(action)
    }

    function removeTodoList(id: string) {
        let action = removeTodoListAC(id);
        dispatchToTodoLists(action)

    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchToTasks(action);
        dispatchToTodoLists(action)
    }

    function changeTitle(id: string, newTitle: string, todoListId: string) {
        let action = changeTaskTitleAC(id, newTitle, todoListId);
        dispatchToTasks(action)
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const action = changeTodoListTitleAC(newTitle, todoListId);
        dispatchToTodoLists(action)
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

                            return <Grid item>

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


