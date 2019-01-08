import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerSolds } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";
import NonEditableTable from  '../NonEditableTable';
import { Button } from "antd";
import '../../styles/DataTable.css'
import AddSoldInPeriods from '../../components/AddForms/AddSoldInPeriods';

class SoldsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedSolds: null,
            isLoading: false,
            toAdd: false,
            isEditable: props.isEditable,
        }
    }

    onAdd = () => {
        this.setState({toAdd: true})
    };

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

        const { loadedSolds } = this.state;
        const textColumns = [
            {
                title: 'Period Start',
                dataIndex: 'periodStart',
                width: '15%',
                editable: true,
            },
            {
                title: 'Period End',
                dataIndex: 'periodEnd',
                width: '15%',
                editable: true,
            },
        ];

        const numberColumns = [
            {
                title: 'Sold Id',
                dataIndex: 'soldId',
                width: '15%',
                editable: true,
            }, {
                title: 'Sum',
                dataIndex: 'sum',
                width: '15%',
                editable: true,
            }, {
                title: 'Amount',
                dataIndex: 'amount',
                width: '15%',
                editable: true,
            },
        ];

        const { toAdd, isEditable } = this.state;

        return(
            <div className="containerForTable">
                <div className="dataTable">
                    {
                        isEditable && <EditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedSolds} isSold={true}/>
                    }
                    {
                        !isEditable && <NonEditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedSolds} isSold={true}/>
                    }
                </div>
                <Button className="updateButton" onClick={this.onAdd}>Add</Button>
                { toAdd && <AddSoldInPeriods/>}
            </div>
        );
    }

}

export default SoldsList;