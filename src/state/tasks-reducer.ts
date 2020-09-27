import {
    AddTodoListActionType,
    ChangeTodoListEntityStatusActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
    setTodoListsAC,
    removeTodoListAC,
    addTodoListAC
} from "./todoList-reducer";
import {tasksAPI, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType
    | ChangeTodoListEntityStatusActionType
    | ReturnType<typeof changeTaskEntityStatusAC>

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

export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {
                ...state, [action.todoListId]: action.tasks.map((t: any) => ({
                        ...t,
                        entityTaskStatus: 'idle'
                    })
                )
            }
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.id)
            }

        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityTaskStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    ...action.domainModel
                } : task)
            }

        case addTodoListAC.type: {
            return {...state, [action.payload.todoList.id]: []}
        }
        case removeTodoListAC.type: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy
        }
        case setTodoListsAC.type: {
            const stateCopy = {...state};
            action.payload.todoLists.forEach((tl: any) => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, entityTaskStatus: action.entityTaskStatus} : t)}
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

export const changeTaskEntityStatusAC = (todoListId: string, taskId: string, entityTaskStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    todoListId,
    taskId,
    entityTaskStatus
} as const)


// Thunk

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:"loading"}))
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListId))
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTasksTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:"loading"}));
        dispatch(changeTaskEntityStatusAC(todoListId, taskId, "loading"))
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todoListId))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}


export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
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
        dispatch(setAppStatusAC({status:"loading"}))
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
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, domainModel, todoListId))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}



