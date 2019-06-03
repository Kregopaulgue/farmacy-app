import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification, Row, Col } from 'antd';
import '../../styles/LoginPage.css';
import {addRow} from '../../apiUtils';

const FormItem = Form.Item;

class AddSoldInPeriod extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const AntWrappedLoginForm = Form.create()(AddSoldInPeriodForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm onAdding={this.props.onAdding}/>
                </div>
            </div>
        );
    }
}

class AddSoldInPeriodForm extends Component {
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
                    <Row>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator('soldId', {
                                    rules: [{ required: true, message: 'Please input sold id!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" />}
                                        size="large"
                                        name="soldId"
                                        placeholder="Sold Id" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator('sum', {
                                    rules: [{ required: true, message: 'Please input sum!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="sum"
                                        type="number"
                                        placeholder="Sum"  />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator('amount', {
                                    rules: [{ required: true, message: 'Please input amount!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="amount"
                                        type="number"
                                        placeholder="Amount"  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator('periodStart', {
                                    rules: [{ required: true, message: 'Please input period start!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="periodStart"
                                        type="text"
                                        placeholder="Period Start"  />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem>
                                {getFieldDecorator('periodEnd', {
                                    rules: [{ required: true, message: 'Please input period end!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="periodEnd"
                                        type="text"
                                        placeholder="Period End"  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                {getFieldDecorator('drugstoreCode', {
                                    rules: [{ required: true, message: 'Please input drugstore code!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="drugstoreCode"
                                        type="number"
                                        placeholder="Drugstore Code"  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                {getFieldDecorator('medicineCode', {
                                    rules: [{ required: true, message: 'Please input medicine code!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" />}
                                        size="large"
                                        name="medicineCode"
                                        type="number"
                                        placeholder="Medicine Code"  />
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

export default AddSoldInPeriod;