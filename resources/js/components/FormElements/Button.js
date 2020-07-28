import React from 'react';

export default function Button(props) {
    const handleClick = (event) => {
        event.preventDefault();

        props.onClick();
    }

    return (
        <button
            className="btn-primary btn"
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.title}
        </button>
    )
}
