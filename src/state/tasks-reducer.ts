import {TasksStateType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todoList-reducer";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


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
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    status: TaskStatuses
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todoListId: string
}

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        case 'REMOVE-TASK': {
            let todoListTasks = {...state}[action.todoListId];
            state[action.todoListId] = todoListTasks.filter(task => task.id !== action.id)
            return {...state}
        }
        case "ADD-TASK": {
            debugger
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            stateCopy[newTask.todoListId] = [newTask, ...tasks]
            return stateCopy
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

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
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

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todoListId)
                dispatch(action)
            })
    }
}

export const removeTasksTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoListId))
            })
    }
}


export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todoListId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            tasksAPI.updateTask(todoListId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todoListId))
            })
        }
    }
}





