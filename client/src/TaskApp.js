import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './components/Form'
import './TaskApp.css';

class TaskApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      countries: []
    };
  }

  componentDidMount () {
    fetch("http://localhost:5000/countries")
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      console.log('Error fetching countries');
    }).then((data) => this.setState({countries: data})
    ).catch(function(error) {
      console.log('Fetch error: ', error.message);
    })
  }

  handleError () { return null; }

  handleSubmit = (data) => (event) => {
    fetch("http://localhost:5000/tasks", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        this.handleSuccess();
      }
      this.handleError();
    }).catch(function(error) {
      this.handleError();
    })
  }

  handleSuccess () { return null; }

  render() {
    return (
      <MuiThemeProvider>
        <div className="TaskApp">
          <Form
            countries={this.state.countries}
            onSubmit={this.handleSubmit}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
