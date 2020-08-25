import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string,
    filter: string
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks])
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }



    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }

    }


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to bue',
            filter: 'all'
        }
    ])


    return (
        <div className="App">
            {
                todoLists.map(tl => {

                        let tasksForTodoList = tasks;

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasks.filter(task => !task.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasks.filter(task => task.isDone)
                        }

                        return <TodoList title={tl.title}
                                         tasks={tasksForTodoList}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         changeStatus={changeStatus}
                                         filter={tl.filter}
                                         todoListId={tl.id}
                        />
                    }
                )}
        </div>
    );
}

export default App;


