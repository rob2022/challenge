import React from 'react';
import api from '../api';

export default class MemberSignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            formSchema: {},
            loadError: false,
        };
    }

    componentDidMount() {
        api.getFormSchema().then((response) => {
            this.setState({
                isLoading: false,
                formSchema: response.data,
            });
        }).catch(() => {
            this.setState({loadError: true})
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        if (this.state.loadError) {
            return <div>Error: Unable to load form schema.</div>
        }

        return (
            <div>Loaded Form</div>
        );
    }
}
