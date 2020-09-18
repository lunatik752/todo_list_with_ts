import {TasksStateType} from "../components/app/App";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todoList-reducer";
import {tasksAPI, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
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
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    domainModel: UpdateDomainModelTaskType
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
        case 'UPDATE-TASK': {
            let todoListTasks = state[action.todoListId];
            let newTasksArray = todoListTasks.map(task => task.id === action.taskId ? {
                ...task,
                ...action.domainModel
            } : task);
            state[action.todoListId] = newTasksArray
            return {...state}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
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

export const updateTaskAC = (taskId: string, domainModel: UpdateDomainModelTaskType, todoListId: string): UpdateTaskActionType => {
    return {
        type: 'UPDATE-TASK', taskId, domainModel, todoListId
    }
}

// Thunk

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTasksTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}


export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tasksAPI.createTask(todoListId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainModelTaskType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC("loading"))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
console.log('task is not found in the state')
            return
        }
        const apiModel = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
            tasksAPI.updateTask(todoListId, taskId, apiModel).then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}





