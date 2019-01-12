import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerDrugstores } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";
import NonEditableTable from  '../NonEditableTable';
import { Button } from "antd";
import '../../styles/DataTable.css'

import AddDrugstore from '../../components/AddForms/AddDrugstore';

class DrugstoresList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedDrugstores: null,
            isLoading: false,
            toAdd: false,
            isEditable: props.isEditable,
        };
        console.log(props.isEditable);
    }

    onAdd = () => {
        this.setState({toAdd: true})
    };

    getCurrentUserDrugstores = () => {
        this.setState({
            isLoading: true
        });
        if(this.props.request) {
            this.props.request().then((response) => {
                console.log(response);
                this.setState({
                    loadedDrugstores: response,
                    isLoading: false
                });
            }).catch(
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
        } else {
            getManagerDrugstores(this.props.username)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        loadedDrugstores: response.content,
                        isLoading: false
                    });
                }).catch(
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
        }
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
        console.log(loadedDrugstores);
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

        const { toAdd, isEditable } = this.state;

        let table = null;
        if(isEditable) {
            table = <EditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedDrugstores} isDrugstore={true}/>;
        } else {
            table = <NonEditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedDrugstores} isDrugstore={true}/>;
        }

        return(
            <div className="containerForTable">
                <div className="dataTable">
                    { table }
                </div>
                <Button className="updateButton" onClick={this.onAdd}>Add</Button>
                { toAdd && <AddDrugstore/>}
            </div>
        );
    }

}

export default DrugstoresList;