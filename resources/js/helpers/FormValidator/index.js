import validationStrategyMap from './validationStrategyMap'

export default class Index {
    constructor(formSchema) {
        this.formSchema = formSchema;
    }

    getErrors(formValues) {
        let errors = {};

        const props = this.formSchema.schema.props;

        Object.keys(props).forEach((key) => {
            let propErrors = [];

            const value = formValues[key];
            const prop = props[key]

            // Is empty and required
            if (value.trim() === '' && this.formSchema.schema.required.indexOf(key) >= 0) {
                propErrors.push('Is Required');
            }

            if (prop.validation) {
                prop.validation.forEach((validationRule) => {
                    const strategy = validationStrategyMap[validationRule.type];
                    const validationResult = strategy(validationRule, value);

                    if (!validationResult.valid) {
                        propErrors.push(validationResult.message);
                    }
                })
            }

            // We wont add empty error list
            if (propErrors.length) {
                errors[key] = propErrors;
            }
        });

        return errors;
    }
}
