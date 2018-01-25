import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './components/Form'
import './TaskApp.css';

class TaskApp extends Component {

  handleSubmit = (data) => (event) => {
    console.log(data)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="TaskApp">
          <Form
            onSubmit={this.handleSubmit}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
