import React, { Component } from 'react';
import './styles/App.css';
import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage/>
      </div>
    );
  }
}

export default App;
