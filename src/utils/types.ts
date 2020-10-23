
import {rootReducer, store} from "../state/store";
import { FieldErrorType } from "../api/todoLists-api";


// redux common types
export type RootReducerType = typeof rootReducer
// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<RootReducerType>


export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }

export type  AppDispatchType = typeof store.dispatch
