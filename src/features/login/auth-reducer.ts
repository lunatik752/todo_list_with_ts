import {setAppStatus} from "../../components/app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authAPI} from '../../api/auth-api';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {FieldErrorType, LoginParamsType} from "../../api/types";

export type InitialAuthReducerStateType = {
    isLoggedIn: boolean
}

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

    }
})

// типизацию logoutTC можно не делать так как этой санкой мы не пользуемся снаружи

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({})
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
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
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

export const setIsLoggedIn = slice.actions.setIsLoggedInAC
