import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todoList-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {todoListsApi} from "../api/todoLists-api";


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType


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
    status: TaskStatuses,
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
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todoListId] = action.tasks
            return copyState
        }

        case 'REMOVE-TASK': {
            let todoListTasks = {...state}[action.todoListId];
            state[action.todoListId] = todoListTasks.filter(task => task.id !== action.id)
            return {...state}
        }
        case "ADD-TASK": {
            let task = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: ''
            };
            let todoListTasks = {...state}[action.todoListId];
            state[action.todoListId] = [task, ...todoListTasks]
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let todoListTasks = state[action.todoListId];
            let newTasksArray = todoListTasks.map(task => task.id === action.id ? {
                ...task,
                status: action.status
            } : task);
            state[action.todoListId] = newTasksArray
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTasks = state[action.todoListId];
            let newTasksArray = todoListTasks.map(task => task.id === action.id ? {
                ...task,
                title: action.title
            } : task);
            state[action.todoListId] = newTasksArray
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
        case "SET-TODOLISTS": {
            const stateCopy = {...state};
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        default:
            return state
    }
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todoListId}
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

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: taskId,
        status: status,
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


// Thunk

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}






