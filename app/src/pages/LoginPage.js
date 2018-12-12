import React from 'react';
import LoginComponent from '../components/LoginComponent';
import '../styles/LoginPage.css';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return(
          <div className='login'>
              <LoginComponent
                loginValue={this.state.login}
                passwordValue={this.state.password}
                handleLoginChange={this.handleLoginChange}
                handlePasswordChange={this.handlePasswordChange}
              />
          </div>
        );
    }

}

export default LoginPage;
