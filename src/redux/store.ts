import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


let rootReducer = combineReducers({

})

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;