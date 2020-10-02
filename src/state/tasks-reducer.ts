import {tasksAPI, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoList-reducer";


export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {};

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await tasksAPI.getTasks(todoListId);
        const tasks = res.data.items;
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
        return {tasks, todoListId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const removeTasksTC = createAsyncThunk('tasks/removeTasks', async (param: { taskId: string, todoListId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        todoListId: param.todoListId,
        taskId: param.taskId,
        entityTaskStatus: "loading"
    }))
    try {
        const res = await tasksAPI.deleteTask(param.todoListId, param.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {taskId: param.taskId, todoListId: param.todoListId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch
        (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTaskTasks', async (param: { todoListId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await tasksAPI.createTask(param.todoListId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch
        (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const _addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
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


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
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
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId];
        })
        builder.addCase(setTodoListsAC, (state, action) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = [];
                })
            }
        )
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map((t: any) => ({...t, entityTaskStatus: 'idle'}))
            }
        )
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todoListId].splice(index, 1)
                }
            }
        )
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({...action.payload.task, entityTaskStatus: 'idle'})
            }
        )

    }
})


export const tasksReducer = slice.reducer

export const {changeTaskEntityStatusAC, updateTaskAC, addTaskAC} = slice.actions


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



