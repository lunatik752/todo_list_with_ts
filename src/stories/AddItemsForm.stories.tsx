import {AddItemForm} from "../common/AddItemsForm";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react/types-6-0";


export default  {
    title: 'Example/AddItemForm Stories',
    component: AddItemForm
} as Meta

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={action('Button inside from clicked')}/>
}
