import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import {Link} from "react-router-dom";
import '../../styles/LoginPage.css';
import {login} from "../../apiUtils";
import {ACCESS_TOKEN} from "../../constants";
const FormItem = Form.Item;

class AddManufacturer extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(AddManufacturerForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm />
                </div>
            </div>
        );
    }
}

class AddManufacturerForm extends Component {
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
                        {getFieldDecorator('Manufacturer Code', {
                            rules: [{ required: true, message: 'Please input medicine code!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="code"
                                placeholder="Manufacturer Code" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Firm Title', {
                            rules: [{ required: true, message: 'Please input title!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="firmTitle"
                                type="text"
                                placeholder="Title"  />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Address', {
                            rules: [{ required: true, message: 'Please input expiration term!' }],
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
                        {getFieldDecorator('Phone Number', {
                            rules: [{ required: true, message: 'Please input measurement unit!' }],
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
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Add</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default AddManufacturer;