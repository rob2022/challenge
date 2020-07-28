import React from 'react';
import api from '../../api';

import FormValidator from "../../helpers/FormValidator";
import FormElementFactory from "../../components/FormBuilder/FormElementFactory";

export default class FormBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            formDescription: {},
            formValues: {},
            apiError: false,
            submitted: false,
            submissionAttempted: false,
            isSaving: false,
        };

        this.handleFormAction = this.handleFormAction.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentDidMount() {
        api.get(this.props.schemaUrl).then((response) => {
            // TODO: In real life we should probable add some validation here to ensure the schema is in a good shape.
            this.setState({
                isLoading: false,
                formDescription: response.data,
                formValues: this.getInitialFormValues(response.data.schema.props)
            });
        }).catch(() => {
            this.setState({apiError: true})
        });
    }

    getInitialFormValues(props) {
        let formValues = {};

        Object.keys(props).forEach(function (key) {
            formValues[key] = '';
        });

        return formValues;
    }

    getFormValidationErrors() {
        const FormValidatorInstance = new FormValidator(this.state.formDescription)

        return FormValidatorInstance.getErrors(this.state.formValues);
    }

    handleFormAction(action) {
        switch (action) {
            case 'cancel':
                this.handleCancelAction();

                return;
            case 'submit':
                this.handleSubmit();

                return;
            default:
                throw `Unable to handle action with name "${action}"`
        }
    }

    handleCancelAction() {
        this.setState({
            formValues: this.getInitialFormValues(this.state.formDescription.schema.props),
            submissionAttempted: false,
        });
    }

    handleSubmit() {
        // Dont submit if validation issues
        if (Object.keys(this.getFormValidationErrors()).length > 0) {
            this.setState({submissionAttempted: true});

            return;
        }

        this.setState({isSaving: true});

        api.postData(this.state.formDescription.meta.action, this.state.formValues).then(() => {
            this.setState({
                submitted: true,
                isSaving: false,
            });
        }).catch(() => {
            this.setState({
                apiError: true,
                isSaving: false,
            });
        });
    }

    handleValueChange(propName, value) {
        let formValues = {...this.state.formValues};
        formValues[propName] = value;

        this.setState({formValues})
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        if (this.state.apiError) {
            return <div className="alert alert-danger mt-4" role="alert">Error!</div>
        }

        if (this.state.submitted) {
            return <div className="alert alert-success mt-4" role="alert">Thanks</div>
        }

        const validationErrors = this.getFormValidationErrors();

        return (
            <div>
                <h1>{this.props.title}</h1>

                {
                    this.state.submissionAttempted && Object.keys(validationErrors).length > 0
                        ? <div className="alert alert-danger mt-4" role="alert"> Please address the below errors.</div>
                        : null
                }

                <form>
                    {
                        this.state.formDescription.layout.elements.map((element, key) => {
                            const elementName = element.schema_ref // always in the form `#/type/elementName`
                                .split('/')
                                .slice(-1)[0]; // Get last element of the split string

                            return (
                                <div key={key} className="mb-4 pb-4 border-bottom">
                                    <FormElementFactory
                                        attributes={element}
                                        onFormAction={() => this.handleFormAction(elementName)}
                                        onValueChange={(value) => this.handleValueChange(elementName, value)}
                                        value={this.state.formValues[elementName]}
                                        errors={validationErrors[elementName]}
                                        disabled={this.state.isSaving}
                                    />
                                </div>
                            );
                        })
                    }
                </form>
            </div>
        );
    }
}
