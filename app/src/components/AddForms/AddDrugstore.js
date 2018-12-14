import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import {Link} from "react-router-dom";
import '../../styles/LoginPage.css';
import {login} from "../../apiUtils";
import {ACCESS_TOKEN} from "../../constants";
const FormItem = Form.Item;

class AddDrugstore extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(AddDrugstoreForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm />
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
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('Drugstore Code', {
                            rules: [{ required: true, message: 'Please input drugstore code!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="drugstoreCode"
                                placeholder="Medicine Code" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Network Title', {
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
                        {getFieldDecorator('Phone Number', {
                            rules: [{ required: true, message: 'Please input expiration term!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Region', {
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
                        {getFieldDecorator('Manager Code', {
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