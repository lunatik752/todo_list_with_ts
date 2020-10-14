import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {tasksReducer} from "../components/task/tasks-reducer";
import {todoListReducer} from "../components/todoLists/todoList-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../components/app/app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<RootReducerType>


// @ts-ignore
window.store = store;


type  AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])
}
