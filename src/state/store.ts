import {combineReducers, createStore} from "redux";
import { tasksReducer } from "./tasks-reducer";
import {todoListReducer} from "./todoList-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;