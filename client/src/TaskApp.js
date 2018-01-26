import React, { Component } from 'react';
import Form from './components/Form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import './TaskApp.css';

class TaskApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      countries: [],
      saving: false
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
    this.setState({saving: true});

    fetch("http://localhost:5000/tasks", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then((response) => {
      this.setState({saving: false});
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
          <Snackbar
            open={this.state.saving}
            message="Saving task..."
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
