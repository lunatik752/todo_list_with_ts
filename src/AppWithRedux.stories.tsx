import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {Meta} from "@storybook/react/types-6-0";


export default  {
    title: 'AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
}
