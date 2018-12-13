import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerSolds } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";

class SoldsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedSolds: null,
            isLoading: false
        }
    }

    getCurrentUserDrugstores = () => {
        this.setState({
            isLoading: true
        });
        getManagerSolds(this.props.username)
            .then((response) => {
                console.log(response);
                this.setState({
                    loadedSolds: response.content,
                    isLoading: false
                });
            }) .catch(
            error => {
                console.log(error);
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    };

    componentDidMount() {
        console.log('Im in solds');
        this.getCurrentUserDrugstores();
    };

    render() {

        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const { loadedDrugstores } = this.state;
        const textColumns = [
            {
                title: 'Title',
                dataIndex: 'networkTitle',
                width: '15%',
                editable: true,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                width: '15%',
                editable: true,
            },
            {
                title: 'Phone',
                dataIndex: 'phoneNumber',
                width: '15%',
                editable: true,
            },
            {
                title: 'Region',
                dataIndex: 'region',
                width: '15%',
                editable: true,
            },
        ];

        const numberColumns = [
            {
                title: 'Code',
                dataIndex: 'drugstoreCode',
                width: '15%',
                editable: true,
            },
        ];

        return(
            <EditableTable numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedDrugstores}/>
        );
    }

}

export default SoldsList;