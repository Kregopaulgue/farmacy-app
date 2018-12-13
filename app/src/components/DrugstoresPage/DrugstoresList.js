import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerDrugstores } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";

class DrugstoresList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedDrugstores: null,
            isLoading: false
        }
    }

    getCurrentUserDrugstores = () => {
        this.setState({
            isLoading: true
        });
        getManagerDrugstores(this.props.username)
            .then((response) => {
                console.log(response);
                this.setState({
                    loadedDrugstores: response.content,
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

export default DrugstoresList;