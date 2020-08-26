import {
  Container,
  Fab,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { createToDo, db } from '../utils/firebase';
import PopulateList from './PopulateList';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 100,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: 50,
    maxWidth: 500,
  },

  buttonStyle: {
    marginTop: 5,
    marginLeft: 5,
  },
}));

function CreateTodoItem() {
  const classes = useStyles();
  const [toDoItem, bindToDoItem, resetToDoItem] = useInput('');
  const [toDoList, setToDoList] = useState([]);

  const firebaseRef = db.collection('toDos');

  useEffect(() => {
    console.log('fetch');
    subscribe();
    return () => subscribe();
  }, []);

  const subscribe = () => {
    firebaseRef.orderBy('created', 'desc').onSnapshot(snapshot =>
      setToDoList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    createToDo(toDoItem);
    resetToDoItem();
  };

  return (
    <div>
      <Container maxWidth='sm' className={classes.container}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField
                id='toDo'
                {...bindToDoItem}
                label='ToDo Item'
                variant='outlined'
                multiline
              />
              <FormHelperText>Enter the toDo Item.</FormHelperText>
            </FormControl>
            <FormControl>
              <Tooltip title={!toDoItem ? 'Enter the toDo item first!' : 'Add'}>
                <span className={classes.buttonStyle}>
                  <Fab
                    type='submit'
                    color='secondary'
                    size='small'
                    disabled={!toDoItem}
                  >
                    <AddIcon />
                  </Fab>
                </span>
              </Tooltip>
            </FormControl>
          </form>
        </Paper>
        <Paper className={classes.paper}>
          <PopulateList toDoList={toDoList} />
        </Paper>
      </Container>
    </div>
  );
}

export default CreateTodoItem;
