import {setAppStatus} from "../../components/app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authAPI} from '../../api/auth-api';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldErrorType, LoginParamsType} from "../../api/types";

export type InitialAuthReducerStateType = {
    isLoggedIn: boolean
}

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI): Promise<any> => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI)

        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
    }
})

// типизацию logoutTC можно не делать так как этой санкой мы не пользуемся снаружи

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    login,
    logout
}


export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true;
            }
        )
        builder.addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
            }
        )
    }
})


export const authReducer = slice.reducer;

export const {setIsLoggedIn} = slice.actions
