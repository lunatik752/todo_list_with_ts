import {Provider} from "react-redux";
import React from "react";
import {store} from "../../state/store";

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={store}>
        {storyFn()}
    </Provider>
)