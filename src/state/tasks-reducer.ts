import {TasksStateType} from "../App";
import {v1} from "uuid";
import { AddTodoListActionType } from "./todoList-reducer";



type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoListActionType



export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    title: string,
    todoListId: string
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todoListTasks = {...state}[action.todoListId];
            state[action.todoListId] = todoListTasks.filter(task => task.id !== action.id)
            return {...state}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks = {...state}[action.todoListId];
            state[action.todoListId] = [task, ...todoListTasks]
            return {...state}
        }
            case 'CHANGE-TASK-STATUS': {
                let todoListTasks = {...state}[action.todoListId];
                let task = todoListTasks.find(task => task.id === action.id);
                if (task) {
                    task.isDone = action.isDone;
                }
                return {...state}
            }
        case "CHANGE-TASK-TITLE":{
            let todoListTasks = {...state}[action.todoListId];
            let task = todoListTasks.find(task => task.id === action.id);
            if (task) {
                task.title = action.title;
            }
            return {...state}
        }
        case "ADD-TODOLIST": {
          const  stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        id: taskId,
        todoListId: todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: title,
        todoListId: todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: taskId,
        isDone: isDone,
        todoListId: todoListId
    }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id: taskId,
        title: newTitle,
        todoListId: todoListId
    }
}


