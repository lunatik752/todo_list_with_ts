import {AddItemForm} from "./AddItemsForm";
import React from "react";
import {action} from "@storybook/addon-actions";


export default  {
    title: 'AddItemForm Stories',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={action('Button inside from clicked')}/>
}
