import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification, Row, Col } from 'antd';
import '../../styles/LoginPage.css';
import {addRow} from '../../apiUtils';

const FormItem = Form.Item;
class AddManufacturer extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const AntWrappedLoginForm = Form.create()(AddManufacturerForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm onAdding={this.props.onAdding}/>
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
                addRow(newMedicine).then((res) => {
                    this.props.onAdding();
                }).catch(error => {
                    notification.error({
                        message: 'Pharmacy App',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: 'Please input medicine code!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" />}
                                        size="large"
                                        name="code"
                                        placeholder="Manufacturer Code" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('firmTitle', {
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
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('phoneNumber', {
                                    rules: [{ required: true, message: 'Please input measurement unit!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="phoneNumber"
                                        type="number"
                                        placeholder="Phone"  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem>
                                {getFieldDecorator('address', {
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
                        </Col>
                    </Row>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Add</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default AddManufacturer;