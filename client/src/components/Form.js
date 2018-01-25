import React, { Component } from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem';
import merge from 'lodash/merge'
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      delivery_at: null,
      recipient: {
        name: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phone: ""
      },
      countries: [
        {
          id: "germany",
          name: "Germany"
        },
        {
          "id": "netherlands",
          "name": "Netherlands"
        }
      ]
    };

    this.fieldToComponent = this.fieldToComponent.bind(this);
    this.setRecipientData = this.setRecipientData.bind(this);
  }

  countryItems (countries) {
    return countries.map((country) =>
      <MenuItem
        key={country.id}
        primaryText={country.name}
        value={country.id}
      />
    );
  }

  fieldToLabel (field) {
    return `Recipient ${field.charAt(0).toUpperCase() + field.substring(1).toLowerCase()}`;
  }

  fieldToComponent (field) {
    if (field === "country") {
      return (
        <SelectField
          floatingLabelText={this.fieldToLabel(field)}
          key={field}
          onChange={this.setCountry(field)}
          value={this.state.recipient[field]}
        >
          {this.countryItems(this.state.countries)}
        </SelectField>
      );
    } else {
      return <TextField
        floatingLabelText={this.fieldToLabel(field)}
        key={field}
        onChange={this.setRecipientData(field)}
        value={this.state.recipient[field]}
      />
    }
  }

  mergeRecipientValue(field, value) {
    this.setState(
      merge({recipient: this.state.recipient}, {recipient: {[field]: value}})
    );
  }

  setCountry = (field) => (event, index, value) => this.mergeRecipientValue(field, value)

  setDeliveryAt = (dateTime) => this.setState({ delivery_at: dateTime })

  setRecipientData = (field) => (event) => this.mergeRecipientValue(field, event.target.value)

  render () {
    return (
      <Paper className="Form">
        <h3>Task Form</h3>
        <DateTimePicker
          autoOkTimePicker={true}
          clearIcon={null}
          DatePicker={DatePickerDialog}
          floatingLabelText="Delivery at"
          format='YYYY-MM-DD HH:mm'
          minDate={Date.now()}
          name='picker'
          onChange={this.setDeliveryAt}
          timeFormat= '24hr'
          TimePicker={TimePickerDialog}
          value={this.state.delivery_at}
        />
        {map(Object.keys(this.state.recipient), this.fieldToComponent)}
      </Paper>
    );
  }
}

export default Form;
