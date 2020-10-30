import {combineReducers} from "redux";
import {tasksReducer} from "../components/task/tasks-reducer";
import {todoListReducer} from "../components/todoLists/todoList-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { appReducer } from "../components/app";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store;


