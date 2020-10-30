import {AppRootStateType} from "../../utils/types";

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;

