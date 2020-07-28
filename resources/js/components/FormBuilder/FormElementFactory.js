import React from 'react';

import Button from '../FormElements/Button';
import TextArea from '../FormElements/TextArea';
import Input from '../FormElements/Input';

const componentTypeMap = {
    button: Button,
    textarea: TextArea,
    number: Input,
    text: Input,
};

export default function FormElementFactory(props) {
    const dynamicProps = {
        ...props.attributes,
        onClick: props.onFormAction,
        onChange: props.onValueChange,
        value: props.value,
        errors: props.errors,
        disabled: props.disabled,
    };

    const Component = componentTypeMap[props.attributes.type];

    return <Component {...dynamicProps}/>;
}
