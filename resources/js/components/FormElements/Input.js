import React from 'react';

import ErrorList from "./ErrorList";

export default function Input(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                className="form-control"
                type={props.type === 'number' ? 'number' : 'text'}
                value={props.value}
                placeholder={props.placeholder || ''}
                onChange={(event) => props.onChange(event.target.value)}
                disabled={props.disabled}
            />

            <ErrorList errors={props.errors}/>
        </div>
    )
}
