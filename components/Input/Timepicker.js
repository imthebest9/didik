import React, { useState } from 'react';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Controller } from 'react-hook-form';
const Timepicker = ({ control, name, value }) => {
 
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <TimePicker
          selected={value ? value : field.value}
          onChange={(e) => field.onChange(e)}
          placeholderText="Select Time"
        />
      )}
    />
  );
};

export default Timepicker;
