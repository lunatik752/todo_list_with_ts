import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItem} from "./AddItemsForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bue', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
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
        delete tasks[id]
    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }


    return (
        <div className="App">
            <AddItem addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                        let allTodoListTask = tasks[tl.id];
                        let tasksForTodoList = allTodoListTask

                        if (tl.filter === 'active') {
                            tasksForTodoList = allTodoListTask.filter(task => !task.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTask.filter(task => task.isDone)
                        }

                        return <TodoList
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
                        />
                    }
                )}
        </div>
    );
}

export default App;


