import {appReducer, InitialAppReducerStateType, setAppErrorAC, setAppStatusAC, setInitializeAppAC} from "./app-reducer";

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

    const action = setAppErrorAC(error);
    const endState = appReducer(startState, action)

    expect(endState.error).toBe(error);
});


test('status should be changed', () => {

    const action = setAppStatusAC("loading");
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading');
});

test('isInitialized should be changed', () => {

    const action = setInitializeAppAC(true);
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true);
});







