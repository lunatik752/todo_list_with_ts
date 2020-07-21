import {authAPI} from "../dal/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS = 'social-network/auth/SET_CAPTCHA_URL_SUCCESS';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null the captcha is not required
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
        case   SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: SET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

export const setAuthUserData = (userId: any, email: any, login: any, isAuth: any) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});


//Thunk
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login}: any = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } /*else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }*/
        // let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        // dispatch(stopSubmit('loginForm', {_error: message}))
        // console.log(response.data)



// export const getCaptchaUrl = () => async (dispatch: any) => {
//     const response = await securityAPI.getCaptchaUrl();
//     const captchaUrl = response.data.url;
//     dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;