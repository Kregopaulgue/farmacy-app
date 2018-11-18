import React from 'react';
import Select from 'react-select';

class StartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedManager: null,
            loadedManagers: null
        };
    }

    componentWillMount() {

        fetch('/api/manager/all', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

    }

    handleChange = (selectedManager) => {
        this.setState({selectedManager});
        console.log('Manager selected: ', selectedManager);
    };

    render() {

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];

        const { selectedManager } = this.state;

        return (
            <Select
                value={selectedManager}
                onChange={this.handleChange}
                options={options}
            />
        );

    }
}

export default StartComponent;