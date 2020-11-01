import {asyncActions as appAsyncActions, InitialAppReducerStateType} from "./app-reducer";
import {appReducer} from "./index";
import {appActions} from "../../features/CommonActions/App";

let startState: InitialAppReducerStateType;
const {initializeApp} = appAsyncActions

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('error should be changed', () => {

    const error = 'some error';

    const action = appActions.setAppError({error: error});
    const endState = appReducer(startState, action)

    expect(endState.error).toBe(error);
});


test('status should be changed', () => {

    const action = appActions.setAppStatus({status: "loading"});
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading');
});

test('isInitialized should be changed', () => {

    const action = initializeApp.fulfilled(undefined, '', undefined);
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true);
});







