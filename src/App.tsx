import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import Main from './components/Main/Main';
import Routes from "./components/common/Routes/Routes";
import {HashRouter} from "react-router-dom";


const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <Main/>
             </Provider>
        </HashRouter>
    );
}


export default App;
