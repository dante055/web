import React, { useState, useEffect } from 'react';
import { TextField, IconButton, FormControl } from '@material-ui/core';
import { createMessage } from '../utils/firebase';
import SendIcon from '@material-ui/icons/Send';
import useInput from '../hooks/useInput';

function CreateMessage({ userName }) {
  const [msg, bindMsg, resetMsg] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    createMessage(msg, userName);
    resetMsg();
  };
  
  return (
    <div className='message_input_div'>
      <form onSubmit={handleSubmit}>
        <FormControl className='message_formControl'>
          <TextField
            className='message_input'
            label='Enter the message'
            {...bindMsg}
          />
          <IconButton type='submit'>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default CreateMessage;
