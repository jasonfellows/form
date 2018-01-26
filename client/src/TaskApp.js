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
      console.log(response.body)
      if (response.ok) {
        return response.json();
      }
      throw new Error('There was an error');
    }).then((data) => {
      this.setState({countries: data})
    }).catch(function(error) {
      console.log('Fetch error: ', error.message);
    })
  }

  handleSubmit = (data) => (event) => {
    console.log(data)
  }

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
