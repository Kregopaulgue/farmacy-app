import React, { Component } from 'react';
import EditableTable from '../EditableTable';
import { getManagerMedicine } from "../../apiUtils";
import ServerError from '../ServerError';
import NotFound from '../NotFound';
import LoadingIndicator from "../LoadingIndicator";
import { Button } from "antd";
import '../../styles/DataTable.css'

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

        const { loadedMedicine } = this.state;
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

        return(
            <div className="containerForTable">
                <div className="dataTable">
                    <EditableTable className="table" numberColumns={numberColumns} textColumns={textColumns} loadedDrugstores={loadedMedicine}/>
                </div>
                <Button className="updateButton">Update</Button>
            </div>
        );
    }

}

export default MedicineList;