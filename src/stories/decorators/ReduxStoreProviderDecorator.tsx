import {Provider} from "react-redux";
import React from "react";
import {AppRootStateType} from "../../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todoListReducer} from "../../state/todoList-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {appReducer} from "../../state/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../features/login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus:'idle'},
        {id: "todoListId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus:'loading'}
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
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)