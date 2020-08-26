import React, { useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from './CountryPicker.module.css';

function CountryPicker({ countries, handleCountryChange }) {
  const [value, setValue] = useState(countries[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <FormControl className={styles.countryPicker}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue !== null) handleCountryChange(newValue.countryCode);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={countries}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} />}
      />
    </FormControl>
  );
}

export default CountryPicker;
