import React, { Component } from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_at: null
    };
  }

  setDeliveryAt = (dateTime) => this.setState({ delivery_at: dateTime })

  render() {
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
      </div>
    );
  }
}

export default Form;
