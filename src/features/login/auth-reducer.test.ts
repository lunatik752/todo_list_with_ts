import {authReducer, setIsLoggedIn, InitialAuthReducerStateType} from "./auth-reducer";


let startState: InitialAuthReducerStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be changed', () => {

    const action = setIsLoggedIn({value: true});
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true);
});
