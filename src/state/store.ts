import {combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todoList-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<RootReducerType>


// @ts-ignore
window.store = store;
