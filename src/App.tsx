import React from 'react';
import {Provider} from "react-redux";
import Main from './components/Main/Main';
import {HashRouter} from "react-router-dom";
import store from './redux/store';


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
