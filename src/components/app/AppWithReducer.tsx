import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "../todoList/TodoList";
import {v1} from "uuid";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {AddItemForm} from "../../common/AddItemsForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    todoListReducer,
} from "../../state/todoList-reducer";
import {addTaskTC, removeTaskTC, tasksReducer, updateTaskTC} from "../../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0, entityStatus:'succeeded'},
        {id: todoListId2, title: 'What to bue', filter: 'all', addedDate: '',
            order: 0, entityStatus:'succeeded'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: '', entityTaskStatus: 'idle'},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId:todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: '',entityTaskStatus: 'idle'}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: '', entityTaskStatus: 'idle'},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: '', entityTaskStatus: 'idle'}
        ]
    })


    function removeTask(taskId: string, todoListId: string) {
        let action = removeTaskTC.fulfilled({taskId, todoListId}, 'requestId',{taskId, todoListId} );
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListId: string) {
        let action = addTaskTC.fulfilled({task:{
            title: title,
            status: TaskStatuses.New,
            id: 'id exist',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Hi,
            startDate: '',
            todoListId: todoListId
        }}, 'requestId', {todoListId, title});
        dispatchToTasks(action)
    }

    function changeStatus(id: string, status: TaskStatuses, todoListId: string) {
        let action = updateTaskTC.fulfilled({taskId: id, domainModel: {status}, todoListId}, 'requestId', {taskId: id, domainModel: {status}, todoListId})
        // (id, {status}, todoListId);
        dispatchToTasks(action)
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let action = changeTodoListFilterAC({newFilter: value, todoListId})
        dispatchToTodoLists(action)
    }

    function removeTodoList(id: string) {
        let action = removeTodoListAC({todoListId: id});
        dispatchToTodoLists(action)

    }

    function addTodoList(title: string) {
        const action = addTodoListAC({
            todoList: {
                id: '123',
                order: 0,
                addedDate: '',
                title: title,
            }}
        );
        dispatchToTasks(action);
        dispatchToTodoLists(action)
    }

    function changeTitle(id: string, newTitle: string, todoListId: string) {
        let action = updateTaskTC.fulfilled({taskId: id, domainModel: {title: newTitle}, todoListId}, 'requestId', {taskId: id, domainModel: {title: newTitle}, todoListId});
        dispatchToTasks(action)
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const action = changeTodoListTitleAC({newTitle: newTitle, todoListId});
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
                    <AddItemForm addItem={addTodoList} disabled={false}/>
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

                                <Paper style={{padding: "10px", backgroundColor: '#cfe8fc'}}>
                                    <TodoList
                                        todoList={tl}
                                        key={tl.id}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
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

export default AppWithReducer;


