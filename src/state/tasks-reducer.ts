import {tasksAPI, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoList-reducer";


export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {};

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListId: string }>) {
            return {
                ...state, [action.payload.todoListId]:
                    action.payload.tasks.map((t: any) => ({
                        ...t,
                        entityTaskStatus: 'idle'
                    }))
            }
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todoListId].splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityTaskStatus: 'idle'})
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, domainModel: UpdateDomainModelTaskType, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todoListId: string, taskId: string, entityTaskStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityTaskStatus: action.payload.entityTaskStatus}
            }
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        bilder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId];
        })
        bilder.addCase(setTodoListsAC, (state, action) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = [];
                })
            }
        )
    }
})

export const tasksReducer = slice.reducer

export const {setTasksAC, changeTaskEntityStatusAC, updateTaskAC, addTaskAC, removeTaskAC} = slice.actions


// Thunk

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC({tasks: res.data.items, todoListId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTasksTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}));
        dispatch(changeTaskEntityStatusAC({todoListId, taskId, entityTaskStatus: "loading"}))
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({taskId, todoListId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC({task}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
        dispatch(setAppStatusAC({status: "loading"}))
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
                dispatch(updateTaskAC({taskId, domainModel, todoListId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}



