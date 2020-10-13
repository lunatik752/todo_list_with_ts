import {setAppStatusAC} from "../../components/app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authAPI, LoginParamsType} from '../../api/auth-api';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {FieldErrorType} from "../../api/todoLists-api";

export type InitialAuthReducerStateType = {
    isLoggedIn: boolean
}

export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

    }
})

// типизацию logoutTC можно не делать так как этой санкой мы не пользуемся снаружи

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})


const slice = createSlice({
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
        builder.addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true;
            }
        )
        builder.addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false;
            }
        )
    }
})


export const authReducer = slice.reducer;

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
