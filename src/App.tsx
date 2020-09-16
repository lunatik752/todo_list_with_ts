import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {AddItemForm} from "./AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/tasks-api";
import {FilterValuesType, TodoListDomainType} from './state/todoList-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to bue', filter: 'all', addedDate: '', order: 0,},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''}
        ]
    })


    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId:todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, status: TaskStatuses, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.status = status;
            setTasks({...tasks})
        }
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListDomainType = {id: newTodoListId, title: title, filter: "all", addedDate: '', order: 0};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    function changeTitle(id: string, newTitle: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
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
                                tasksForTodoList = allTodoListTask.filter(task => task.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTask.filter(task => task.status === TaskStatuses.Completed)
                            }

                            return <Grid item>

                                <Paper style={{padding: "10px",  backgroundColor: '#cfe8fc'}}>
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

export default App;


