import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerMedicine } from "../../apiUtils";
import AddMedicine from '../../components/AddForms/AddMedicine';
import ServerError from '../ServerError';
import NonEditableTable from  '../NonEditableTable';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";
import { Button } from "antd";
import '../../styles/DataTable.css'

class MedicineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedMedicine: null,
            isLoading: false,
            toAdd: false,
            isEditable: props.isEditable,
        };
    }

    getCurrentUserMedicine = () => {
        this.setState({
            isLoading: true
        });
        console.log("Im in medicine");
        if(this.props.request) {
            this.props.request().then((response) => {
                console.log(response);
                this.setState({
                    loadedMedicine: response,
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
        }
    };

    componentDidMount() {
        console.log("Get medicine");
        this.getCurrentUserMedicine();
        console.log("Get medicine...");
    };

    onAdd = () => {
        this.setState({toAdd: true})
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

        const { loadedMedicine } = this.state;
        console.log(loadedMedicine);
        const textColumns = [
            {
                title: 'Title',
                dataIndex: 'title',
                width: '15%',
                editable: true,
            },
            {
                title: 'Expiration Term',
                dataIndex: 'expirationTerm',
                width: '15%',
                editable: true,
            }, {
                title: 'Measurement Unit',
                dataIndex: 'measurementUnit',
                width: '15%',
                editable: true,
            },
        ];


        //medicineCode: 1, title: "Aspirin", expirationTerm: "23/10/1999", price: 34, measurementUnit: "3
        const numberColumns = [
            {
                title: 'Medicine Code',
                dataIndex: 'medicineCode',
                width: '15%',
                editable: true,
            }, {
                title: 'Price',
                dataIndex: 'price',
                width: '15%',
                editable: true,
            },
        ];

        const { toAdd, isEditable } = this.state;

        return(
            <div className="containerForTable">
                <div className="dataTable">
                    {
                        isEditable && <EditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedMedicine} isMedicine={true}/>
                    }
                    {
                        !isEditable && <NonEditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedMedicine} isMedicine={true}/>
                    }
                </div>
                <Button className="updateButton" onClick={this.onAdd}>Add</Button>
                { toAdd && <AddMedicine/>}
            </div>
        );
    }

}

export default MedicineList;