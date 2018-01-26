import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Form from './components/Form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import './TaskApp.css';

class TaskApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      countries: [],
      error: null,
      saving: false,
      successSnackbarOpen: false,
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

  closeErrorDialog = () => this.setState({error: null})

  closeSuccessSnackbar = () => this.setState({successSnackbarOpen: false})

  handleSubmit = (data) => (event) => {
    this.setState({saving: true});

    fetch("http://localhost:5000/tasks", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then((response) => {
      this.setState({saving: false});
      if (response.ok) {
        this.setState({successSnackbarOpen: true})
      }
      return response.text()
    }).then((errorMessage) => {
      this.setState({error: JSON.parse(errorMessage)["error"]});
    }).catch((error) => {
      this.setState({error: error});
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="TaskApp">
          <Form
            countries={this.state.countries}
            onSubmit={this.handleSubmit}
          />
          <Snackbar
            message="Saving task..."
            open={this.state.saving}
          />
          <Snackbar
            autoHideDuration={4000}
            message="Task saved successfully."
            open={this.state.successSnackbarOpen}
            onRequestClose={this.closeSuccessSnackbar}
          />
          <Dialog
            modal={false}
            open={this.state.error != null}
            style={{textAlign: "center"}}
          >
            <div>
              Error saving: {this.state.error}
            </div>
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.closeErrorDialog}
              style={{marginTop: "20px"}}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TaskApp;
