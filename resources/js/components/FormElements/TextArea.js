import React from 'react';

import ErrorList from "./ErrorList";

export default function TextArea(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <textarea
                id={props.name}
                className="form-control"
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                disabled={props.disabled}
            />

            <ErrorList errors={props.errors}/>
        </div>
    )
}
