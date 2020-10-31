import {tasksAPI} from "../../api/tasks-api";
import {RequestStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskType, TodoListType, UpdateModelTaskType} from "../../api/types";
import {ThunkError, AppRootStateType} from "../../utils/types";
import {appActions} from "../../features/CommonActions/App";
import {asyncActions as asyncTodoListsActions} from './../todoLists/todoList-reducer'


export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todoListId: string }, string, ThunkError>('tasks/fetchTasks', async (todoListId: string, thunkAPI): Promise<any> => {
    thunkAPI.dispatch(appActions.setAppStatus({status: "loading"}));
    try {
        const res = await tasksAPI.getTasks(todoListId);
        const tasks = res.data.items;
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
        return {tasks, todoListId}
    } catch (error) {
        return handleServerNetworkError(error, thunkAPI)

    }
})


export const removeTask = createAsyncThunk<{ taskId: string, todoListId: string }, { taskId: string, todoListId: string }, ThunkError>('tasks/removeTask', async (param: { taskId: string, todoListId: string }, thunkAPI): Promise<any> => {
    thunkAPI.dispatch(appActions.setAppStatus({status: "loading"}));
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        todoListId: param.todoListId,
        taskId: param.taskId,
        entityTaskStatus: "loading"
    }))
    try {
        const res = await tasksAPI.deleteTask(param.todoListId, param.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {taskId: param.taskId, todoListId: param.todoListId}
        } else {
            return handleServerAppError(res.data, thunkAPI)
        }
    } catch
        (error) {
        return handleServerNetworkError(error, thunkAPI)
    }
})


export const addTask = createAsyncThunk<TaskType, { title: string, todoListId: string }, ThunkError>('tasks/addTask',
    async (param, thunkAPI): Promise<any> => {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await tasksAPI.createTask(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, thunkAPI, false)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            return handleServerNetworkError(error, thunkAPI, false)
        }
    }
)

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateDomainModelTaskType, todoListId: string }, thunkAPI): Promise<any> => {
    thunkAPI.dispatch(appActions.setAppStatus({status: "loading"}))
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateModelTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.domainModel
    }
    const res = await tasksAPI.updateTask(param.todoListId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return param
        } else {
           return  handleServerAppError(res.data, thunkAPI)
        }
    } catch
        (error) {
       return  handleServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todoListId: string, taskId: string, entityTaskStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex((t: TaskDomainType) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityTaskStatus: action.payload.entityTaskStatus}
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodoListsActions.addTodoListTC.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(asyncTodoListsActions.removeTodoListTC.fulfilled, (state, action) => {
                delete state[action.payload.todoListId];
            })
            .addCase(asyncTodoListsActions.fetchTodoListsTC.fulfilled, (state, action) => {
                    action.payload.todoLists.forEach((tl: TodoListType) => {
                        state[tl.id] = [];
                    })
                }
            )
            .addCase(fetchTasks.fulfilled, (state, action) => {
                    state[action.payload.todoListId] = action.payload.tasks.map(t => ({
                        ...t,
                        entityTaskStatus: 'idle'
                    }))
                }
            )
            .addCase(removeTask.fulfilled, (state, action) => {
                    const index = state[action.payload.todoListId].findIndex((t: TaskDomainType) => t.id === action.payload.taskId)
                    if (index > -1) {
                        state[action.payload.todoListId].splice(index, 1)
                    }
                }
            )
            .addCase(addTask.fulfilled, (state, action) => {
                    state[action.payload.todoListId].unshift({...action.payload, entityTaskStatus: 'idle'})
                }
            )
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })

    }
})


export const {changeTaskEntityStatusAC} = slice.actions


type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
