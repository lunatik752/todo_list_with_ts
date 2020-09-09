import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Stories',
    component: EditableSpan
}


const onChangeTitleCallback = action('Value changed');



export const EditableSpanBaseExample = (props: any) => {
    return (<EditableSpan title={'StartValue'} onChangeTitle={onChangeTitleCallback}/>
    )
}
