import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

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

    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }





    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;


