import {applyMiddleware, combineReducers, createStore} from "redux";
import { tasksReducer } from "./tasks-reducer";
import {todoListReducer} from "./todoList-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;