import {tasksAPI} from "../../api/tasks-api";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType, setAppStatus} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoListsActions} from '../todoLists/'
import {TaskType} from "../../api/types";
import {ThunkError} from "../../utils/types";
import {appActions} from "../app";


export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType
}

type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    debugger
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await tasksAPI.getTasks(todoListId);
        const tasks = res.data.items;
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {tasks, todoListId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({})
    }
})



const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todoListId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        todoListId: param.todoListId,
        taskId: param.taskId,
        entityTaskStatus: "loading"
    }))
    try {
        const res = await tasksAPI.deleteTask(param.todoListId, param.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {taskId: param.taskId, todoListId: param.todoListId}
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue({})
        }
    } catch
        (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({})
    }
})


export  const addTask = createAsyncThunk<TaskType, { title: string, todoListId: string }, ThunkError>('tasks/addTask',
    async (param, thunkAPI): Promise<any> => {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await tasksAPI.createTask(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return  res.data.data.item
            } else {
                handleServerAppError(res.data, thunkAPI, false)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            return handleServerNetworkError(error, thunkAPI, false)
        }
    }
)

const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateDomainModelTaskType, todoListId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
    if (!task) {
        console.log('task is not found in the state')
        return thunkAPI.rejectWithValue({})
    }
    const apiModel = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...param.domainModel
    }
    try {
        const res = await tasksAPI.updateTask(param.todoListId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {taskId: param.taskId, domainModel: param.domainModel, todoListId: param.todoListId}
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue({})
        }
    } catch
        (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({})
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
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityTaskStatus: action.payload.entityTaskStatus}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todoListsActions.addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todoListsActions.removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListId];
        })
        builder.addCase(todoListsActions.fetchTodoListsTC.fulfilled, (state, action) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = [];
                })
            }
        )
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map((t: any) => ({...t, entityTaskStatus: 'idle'}))
            }
        )
        builder.addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todoListId].splice(index, 1)
                }
            }
        )
        builder.addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift({...action.payload, entityTaskStatus: 'idle'})
            }
        )
        builder.addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }

            }
        )

    }
})


export const tasksReducer = slice.reducer

export const {changeTaskEntityStatusAC} = slice.actions


type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
