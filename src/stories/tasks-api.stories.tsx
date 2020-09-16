import React, {useState} from 'react'
import {tasksAPI} from "../api/tasks-api";


export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasks = () => {
        tasksAPI.getTasks(todoListId).then((res) => {
                setState(res.data.items);
            }
        )
    }

    return <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
        <button onClick={getTasks}>get tasks</button>
        <div> {JSON.stringify(state)}</div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        tasksAPI.createTask(todoListId, taskTitle).then((res) => {
            debugger;
            setState(res.data);
        })
    }
    return <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'Task title'} value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>Create task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todoListId, taskId).then((res) => {
            setState(res.data);
        })
    }

    return <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>delete task</button>

        <div>{JSON.stringify(state)}</div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const updateTask = () => {
        tasksAPI.updateTask(todoListId, taskId, {
            title: title,
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <input placeholder={'todoListId'} value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'task title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={'description'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input placeholder={'status'} type='number' value={status}
               onChange={(e) => setStatus(Number(e.currentTarget.value))}/>
        <input placeholder={'priority'} type='number' value={priority}
               onChange={(e) => setPriority(Number(e.currentTarget.value))}/>
        <button onClick={updateTask}>update task</button>
        <div> {JSON.stringify(state)}</div>
    </div>
}

