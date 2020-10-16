import {appReducer, InitialAppReducerStateType, initializeApp, setAppError, setAppStatus} from "./app-reducer";

let startState: InitialAppReducerStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('error should be changed', () => {

    const error = 'some error';

    const action = setAppError({error: error});
    const endState = appReducer(startState, action)

    expect(endState.error).toBe(error);
});


test('status should be changed', () => {

    const action = setAppStatus({status: "loading"});
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading');
});

test('isInitialized should be changed', () => {

    const action = initializeApp.fulfilled(undefined, '',undefined);
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true);
});







