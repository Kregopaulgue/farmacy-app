import React from 'react';
import '../styles/LoginPage.css';

const Welcome = (props) => {
    return(
        <div className='loginForm'>
            <form>
                <label>
                    <div className="labels">Login</div>
                    <input type='text' value={props.loginValue} name='loginCode' onChange={props.handleLoginChange}/>
                </label>
                <label>
                    <div className="labels">Password</div>
                    <input type='password' value={props.passwordValue} name='loginPassword' onChange={props.handlePasswordChange}/>
                </label>
            </form>
        </div>
    );
};

export default Welcome;