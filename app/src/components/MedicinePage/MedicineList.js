import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerMedicine } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";

class MedicineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedMedicine: null,
            isLoading: false
        }
    }

    getCurrentUserMedicine = () => {
        this.setState({
            isLoading: true
        });
        console.log("Im in medicine")
        getManagerMedicine(this.props.username)
            .then((response) => {
                console.log(response);
                this.setState({
                    loadedMedicine: response.content,
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
        this.getCurrentUserMedicine();
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

export default MedicineList;