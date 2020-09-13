import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";


export default {
    title: 'TasksAPI'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'c4a42836-7577-4320-b6a1-a9b8ab855de9';
        tasksAPI.getTasks(todoListId).then((res) => {
                debugger;
                setState(res.data);
            }
        )
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'c4a42836-7577-4320-b6a1-a9b8ab855de9';
        tasksAPI.createTask(todoListId,'newTask').then((res) => {
            debugger;
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'c4a42836-7577-4320-b6a1-a9b8ab855de9';
        const taskId = '8d12baa4-ccc4-417f-baf8-7310f86c3025';
        tasksAPI.deleteTask(todoListId, taskId).then((res) => {
            setState(res.data);
        })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


// export const UpdateTodoListTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todoListId = '6d994397-bbb4-4d24-be92-7042278f1435';
//         todoListApi.updateTodoList(todoListId, 'SOME NEW TITLE')
//             .then((res) => {
//                 setState(res.data)
//             })
//
//         // здесь мы будем делать запрос и ответ закидывать в стейт.
//         // который в виде строки будем отображать в div-ке
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
