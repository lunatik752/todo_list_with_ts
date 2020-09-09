import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoList-reducer";
import {TodoListType} from "../AppWithReducer";


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


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

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
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
            let todoListTasks = state[action.todoListId];
            let newTasksArray = todoListTasks.map(task => task.id === action.id ? {...task, isDone: action.isDone} : task);
            state[action.todoListId] = newTasksArray
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTasks = {...state}[action.todoListId];
            let task = todoListTasks.find(task => task.id === action.id);
            if (task) {
                task.title = action.title;
            }
            return {...state}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            return state
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





