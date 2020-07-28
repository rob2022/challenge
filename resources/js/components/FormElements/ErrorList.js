import React from 'react';

export default function ErrorList(props) {
    if (!props.errors || props.errors.length === 0) {
        return '';
    }

    const errorText = props.errors && props.errors.length === 1 ?' Error' : 'Errors'

    return (
        <div className="alert alert-danger mt-4" role="alert">
            <strong>{errorText}:</strong>
            <ul>
                {props.errors.map((error, key) => <li key={key}>{error}</li>)}
            </ul>
        </div>
    )
}
