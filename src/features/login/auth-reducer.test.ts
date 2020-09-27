import {authReducer, setIsLoggedInAC, InitialAuthReducerStateType} from "./auth-reducer";


let startState: InitialAuthReducerStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be changed', () => {

    const action = setIsLoggedInAC({value: true});
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true);
});
