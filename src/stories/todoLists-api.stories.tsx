import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todoListAPI} from "../api/todolist-api";

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
  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then((res) => {
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "pamparan"}, settings).then( (res) => {
            debugger;
            setState(res.data);
        } )
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '3feda5d8-0a30-49db-9173-c59889c24b78';
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then( (res) => {
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
        todoListAPI.updateTodoList(todoListId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
