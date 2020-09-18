import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../common/EditableSpan";
import {Meta} from "@storybook/react/types-6-0";


export default {
    title: 'Example/EditableSpan Stories',
    component: EditableSpan
} as Meta


const onChangeTitleCallback = action('Value changed');



export const EditableSpanBaseExample = (props: any) => {
    return (<EditableSpan title={'StartValue'} onChangeTitle={onChangeTitleCallback}/>
    )
}
