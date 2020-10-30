import { AppRootStateType } from "../../utils/types";

export const selectTodoList = (state: AppRootStateType) => state.todoLists;
