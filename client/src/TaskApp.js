import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './components/Form'
import './TaskApp.css';

class TaskApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="TaskApp">
          <Form />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
