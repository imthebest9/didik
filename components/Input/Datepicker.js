import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Datepicker = ({ value, control }) => {
  return (
    <Controller
      name="sectionDate"
      control={control}
      defaultValue={value ? value : new Date()}
      render={({ field }) => (
        <DatePicker
          selected={field.value}
          onChange={(e) => field.onChange(e)}
          placeholderText="Select Date"
        />
      )}
    />
  );
};

export default Datepicker;
