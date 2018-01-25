import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './TaskApp.css';

class TaskApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="TaskApp">
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
