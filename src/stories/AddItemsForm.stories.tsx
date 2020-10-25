import {AddItemForm} from "../common/AddItemsForm";
import React from "react";
import {action} from "@storybook/addon-actions";


export default  {
    title: 'Example/AddItemForm Stories',
    component: AddItemForm
}

const asyncCallback = async (...params: any[]) => {
    action('Button inside form clicked')(...params);
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={asyncCallback}/>
}


export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={asyncCallback}/>
}
