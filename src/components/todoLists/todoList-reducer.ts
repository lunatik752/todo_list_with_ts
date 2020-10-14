import {TodoListType} from "../../api/todoLists-api";
import {RequestStatusType} from "../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListTC, changeTodoListTitleTC, fetchTodoListsTC, removeTodoListTC} from "./todoList-actions";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{ newFilter: FilterValuesType, todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].filter = action.payload.newFilter;
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].entityStatus = action.payload.entityStatus;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].title = action.payload.newTitle;
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        })
    }
})

export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions

export const todoListReducer = slice.reducer



