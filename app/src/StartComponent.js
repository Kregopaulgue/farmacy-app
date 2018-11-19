import React from 'react';
import Select from 'react-select';

class StartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedManager: null,
            loadedManagers: null,
            isLoading: true,
        };
    }

    async componentDidMount() {

        const res = await fetch('/api/manager/all', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        this.setState({loadedManagers: result});
        this.setState({isLoading: false});
    }

    handleChange = (selectedManager) => {
        this.setState({selectedManager});
        console.log('Manager selected: ', selectedManager);
    };

    render() {

        const {isLoading, loadedManagers} = this.state;

        if(isLoading) {
            return(<div>
                <p>Loading...</p>
            </div>);
        }

        const options = this.state.loadedManagers.map(manager => {
           return {
             value: manager.managerCode,
             label: manager.name + ' ' + manager.surname,
           };
        });

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