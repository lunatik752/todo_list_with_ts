import {AppRootStateType} from "../../state/store";

export const selectTodoList = (state: AppRootStateType) => state.todoLists;
