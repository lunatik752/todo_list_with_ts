import {Provider} from "react-redux";
import React from "react";
import {AppRootStateType, RootReducerType} from "../../state/store";
import {combineReducers} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todoListReducer} from "../../state/todoList-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {appReducer} from "../../state/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todoListId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        "todoListId1": [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ],
        "todoListId2": [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
        ]
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        <HashRouter>
            {storyFn()}
        </HashRouter>
    </Provider>
)
