import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }

}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoLists().then((res) => {
                debugger;
                setState(res.data);
            }
        )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTodoList('newTodoList').then((res) => {
            debugger;
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'a67a4438-dba1-4fd2-91fe-6cbe2ddebc04';
        todoListApi.deleteTodoList(todoListId).then((res) => {
            setState(res.data);
        })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = '6d994397-bbb4-4d24-be92-7042278f1435';
        todoListApi.updateTodoList(todoListId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
