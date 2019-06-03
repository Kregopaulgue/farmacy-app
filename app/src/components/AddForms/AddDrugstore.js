import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import '../../styles/LoginPage.css';
import {addRow} from '../../apiUtils';

const FormItem = Form.Item;

class AddDrugstore extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const AntWrappedLoginForm = Form.create()(AddDrugstoreForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm onAdding={this.props.onAdding}/>
                </div>
            </div>
        );
    }
}

class AddDrugstoreForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newMedicine = Object.assign({}, values);
                console.log(newMedicine);
                addRow(newMedicine).then((res) => {
                    this.props.onAdding();
                });
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('drugstoreCode', {
                            rules: [{ required: true, message: 'Please input drugstore code!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="drugstoreCode"
                                placeholder="Drugstore Code" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input title!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="address"
                                type="text"
                                placeholder="Address"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('networkTitle', {
                            rules: [{ required: true, message: 'Please input title!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="networkTitle"
                                type="text"
                                placeholder="Title"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: 'Please input expiration term!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="phoneNumber"
                                type="number"
                                placeholder="Phone"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('region', {
                            rules: [{ required: true, message: 'Please input measurement unit!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="region"
                                type="text"
                                placeholder="Region"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('managerCode', {
                            rules: [{ required: true, message: 'Please input manager code!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="managerCode"
                                type="number"
                                placeholder="Manager Code"  />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Add</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default AddDrugstore;