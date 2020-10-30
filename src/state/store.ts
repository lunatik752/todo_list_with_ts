import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { appReducer } from "../components/app";
import { tasksReducer } from "../components/task";
import {todoListsReducer} from "../components/todoLists";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
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


