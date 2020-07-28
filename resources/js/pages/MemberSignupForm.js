import React from 'react';

import FormBuilder from "../components/FormBuilder";

export default class MemberSignupForm extends React.Component {
    render() {
        return (
            <FormBuilder
                title="Member Signup Form"
                schemaUrl="/api/form-schema"
            />
        );
    }
}
