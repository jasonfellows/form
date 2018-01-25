import React, { Component } from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import map from 'lodash/map'
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
      }
    };

    this.fieldToComponent = this.fieldToComponent.bind(this);
    this.setRecipientData = this.setRecipientData.bind(this);
  }

  fieldToLabel (field) {
    return `Recipient ${field.charAt(0).toUpperCase() + field.substring(1).toLowerCase()}`;
  }

  fieldToComponent (field) {
    if (field === "country") {
      return <SelectField
        key={field}
      />
    } else {
      return <TextField
        floatingLabelText={this.fieldToLabel(field)}
        key={field}
        onChange={this.setRecipientData}
        value={this.state.recipient[field]}
      />
    }
  }

  setDeliveryAt = (dateTime) => this.setState({ delivery_at: dateTime })

  setRecipientData () {
    return null;
  }

  render () {
    return (
      <div className="Form">
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
      </div>
    );
  }
}

export default Form;
