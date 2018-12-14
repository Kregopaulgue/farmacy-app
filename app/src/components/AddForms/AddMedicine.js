import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import {Link} from "react-router-dom";
import '../../styles/LoginPage.css';
import {login} from "../../apiUtils";
import {ACCESS_TOKEN} from "../../constants";
const FormItem = Form.Item;

class AddMedicine extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(AddMedicineForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm />
                </div>
            </div>
        );
    }
}

class AddMedicineForm extends Component {
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
                      {getFieldDecorator('Medicine Code', {
                          rules: [{ required: true, message: 'Please input medicine code!' }],
                      })(
                          <Input
                              prefix={<Icon type="user" />}
                              size="large"
                              name="medicineCode"
                              placeholder="Medicine Code" />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('Title', {
                          rules: [{ required: true, message: 'Please input title!' }],
                      })(
                          <Input
                              prefix={<Icon type="lock" />}
                              size="large"
                              name="title"
                              type="text"
                              placeholder="Title"  />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('Expiration Term', {
                          rules: [{ required: true, message: 'Please input expiration term!' }],
                      })(
                          <Input
                              prefix={<Icon type="lock" />}
                              size="large"
                              name="expirationTerm"
                              type="text"
                              placeholder="Term"  />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('Measurement Unit', {
                          rules: [{ required: true, message: 'Please input measurement unit!' }],
                      })(
                          <Input
                              prefix={<Icon type="lock" />}
                              size="large"
                              name="measurementUnit"
                              type="text"
                              placeholder="Unit"  />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('Manufacturer Code', {
                          rules: [{ required: true, message: 'Please input manufacturer code!' }],
                      })(
                          <Input
                              prefix={<Icon type="lock" />}
                              size="large"
                              name="manufacturerCode"
                              type="number"
                              placeholder="Manufacturer"  />
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

export default AddMedicine;
