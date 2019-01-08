import { Table } from 'antd';
import React, { Component } from 'react';

class NonEditableTable extends Component {

    containsObject = (list, obj) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].value === obj.value) {
                return true;
            }
        }

        return false;
    };

    constructor(props) {
        super(props);
        this.columns = props.numberColumns;
        this.columns = this.columns.concat(props.textColumns);

        this.columns[0].filters = [];

        console.log(props);

        if(props.loadedDrugstores) {

            for(let row of props.loadedDrugstores) {
                console.log(row);
                this.columns[0].filters.push({
                    text: 'Code ' + row[Object.keys(row)[0]],
                    value: row[Object.keys(row)[0]],
                });
            }

            this.columns[0].onFilter = (value, record) => {
                return record[Object.keys(record)[0]] == value;
            };
            this.columns[0].sorter = (a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]];
            this.columns[0].sortDirections = ['descend'];

            if(props.isDrugstore) {
                this.columns[4].filters = [];

                for(let row of props.loadedDrugstores) {

                    console.log(row);
                    const filterToAdd = {
                        text: 'Region ' + row[Object.keys(row)[4]],
                        value: row[Object.keys(row)[4]],
                    };
                    if(!this.containsObject(this.columns[4].filters, filterToAdd)) {
                        this.columns[4].filters.push(filterToAdd);
                    }
                }

                this.columns[4].onFilter = (value, record) => {
                    return record[Object.keys(record)[4]] == value;
                };
                this.columns[4].sorter = (a, b) => a[Object.keys(a)[4]] - b[Object.keys(b)[4]];
                this.columns[4].sortDirections = ['descend'];
            }

            if(props.isSold) {
                this.columns[3].filters = [];
                this.columns[4].filters = [];

                for(let row of props.loadedDrugstores) {

                    console.log(row);
                    let filterToAdd = {
                        text: 'Date ' + row[Object.keys(row)[1]],
                        value: row[Object.keys(row)[1]],
                    };
                    if(!this.containsObject(this.columns[3].filters, filterToAdd)) {
                        this.columns[3].filters.push(filterToAdd);
                    }

                    filterToAdd = {
                        text: 'Date ' + row[Object.keys(row)[2]],
                        value: row[Object.keys(row)[2]],
                    };
                    if(!this.containsObject(this.columns[4].filters, filterToAdd)) {
                        this.columns[4].filters.push(filterToAdd);
                    }
                }

                this.columns[3].onFilter = (value, record) => {
                    return record[Object.keys(record)[1]] == value;
                };
                this.columns[3].sorter = (a, b) => a[Object.keys(a)[1]] - b[Object.keys(b)[1]];
                this.columns[3].sortDirections = ['descend'];

                this.columns[4].onFilter = (value, record) => {
                    return record[Object.keys(record)[2]] == value;
                };
                this.columns[4].sorter = (a, b) => a[Object.keys(a)[2]] - b[Object.keys(b)[2]];
                this.columns[4].sortDirections = ['descend'];
            }

            if(props.isMedicine) {
                this.columns[2].filters = [];
                this.columns[3].filters = [];

                for(let row of props.loadedDrugstores) {

                    console.log(row);
                    let filterToAdd = {
                        text: 'Title ' + row[Object.keys(row)[1]],
                        value: row[Object.keys(row)[1]],
                    };
                    if(!this.containsObject(this.columns[2].filters, filterToAdd)) {
                        this.columns[2].filters.push(filterToAdd);
                    }

                    filterToAdd = {
                        text: 'Date ' + row[Object.keys(row)[2]],
                        value: row[Object.keys(row)[2]],
                    };
                    if(!this.containsObject(this.columns[3].filters, filterToAdd)) {
                        this.columns[3].filters.push(filterToAdd);
                    }
                }

                this.columns[2].onFilter = (value, record) => {
                    return record[Object.keys(record)[1]] == value;
                };
                this.columns[2].sorter = (a, b) => a[Object.keys(a)[1]] - b[Object.keys(b)[1]];
                this.columns[2].sortDirections = ['descend'];

                this.columns[3].onFilter = (value, record) => {
                    return record[Object.keys(record)[2]] == value;
                };
                this.columns[3].sorter = (a, b) => a[Object.keys(a)[2]] - b[Object.keys(b)[2]];
                this.columns[3].sortDirections = ['descend'];
            }
        }


    }

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    };

    render() {
        return (
            <Table columns={this.columns} dataSource={this.props.loadedDrugstores} onChange={this.onChange} />
        );
    }
}

export default NonEditableTable;