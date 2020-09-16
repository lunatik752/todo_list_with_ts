import {Provider} from "react-redux";
import React from "react";
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todoListReducer} from "../../state/todoList-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todoListId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''}
        ],
        ["todoListId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todoListId2", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todoListId2", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState );

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)