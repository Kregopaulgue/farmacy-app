import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getAllManufacturers } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import '../../styles/DataTable.css'
import NonEditableTable from  '../NonEditableTable';
import LoadingIndicator from "../LoadingIndicator";
import { Button } from "antd";
import AddManufacturer from '../../components/AddForms/AddManufacturer';

class ManufacturersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedManufacturers: null,
            isLoading: false,
            toAdd: false,
            isEditable: props.isEditable,
        }
    }

    onAdd = () => {
        this.setState({toAdd: true})
    };

    getCurrentUserMedicine = () => {
        this.setState({
            isLoading: true
        });
        console.log("Im in medicine")
        getAllManufacturers(this.props.username)
            .then((response) => {
                console.log(response);
                this.setState({
                    loadedManufacturers: response,
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

        const { loadedManufacturers } = this.state;

        const textColumns = [
            {
                title: 'Firm Title',
                dataIndex: 'firmTitle',
                width: '15%',
                editable: true,
            },
            {
                title: 'Phone',
                dataIndex: 'phoneNumber',
                width: '15%',
                editable: true,
            }, {
                title: 'Address',
                dataIndex: 'address',
                width: '15%',
                editable: true,
            },
        ];


        //medicineCode: 1, title: "Aspirin", expirationTerm: "23/10/1999", price: 34, measurementUnit: "3
        const numberColumns = [
            {
                title: 'Manufacturer Code',
                dataIndex: 'code',
                width: '15%',
                editable: true,
            },
        ];

        const { toAdd, isEditable } = this.state;

        return(
            <div className="containerForTable">
                <div className="dataTable">
                    {
                        isEditable && <EditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedManufacturers} isManufacturer={true}/>
                    }
                    {
                        !isEditable && <NonEditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedManufacturers} isManufacturer={true}/>
                    }
                </div>
                <Button className="updateButton" onClick={this.onAdd}>Add</Button>
                { toAdd && <AddManufacturer/>}
            </div>
        );
    }

}

export default ManufacturersList;