import {
    Avatar,
    Fab,
    Fade,
    FormControl,
    FormHelperText,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Modal,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import React, { useMemo, useState } from 'react';
import { deleteItem, updateItem } from '../utils/firebase';
import { timeConverter } from '../utils/timestamp';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonStyle: {
    marginTop: 5,
    marginLeft: 5,
  },
}));

function PopulateList({ toDoList }) {
  const [open, setOpen] = useState(false);
  const [toDoItem, setToDoItem] = useState({ id: '', toDo: '' });
  const classes = useStyles();

  const items = useMemo(() => {
    console.log('in');
    return toDoList.map(item => {
      return (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <EventNoteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.toDo}
            secondary={
              item.created ? timeConverter(item.created.seconds) : null
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge='end'
              onClick={() => handleOpen(item.id, item.toDo)}
            >
              <EditIcon />
            </IconButton>
            <IconButton edge='end' onClick={() => deleteItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }, [toDoList]);

  const handleOpen = (id, toDo) => {
    setToDoItem({ id, toDo });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = () => {
    updateItem(toDoItem.id, toDoItem.toDo);
    handleClose();
  };

  return (
    <React.Fragment>
      <List>{toDoList.length ? items : 'No toDos currently present'}</List>

      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Fade in={open}>
          <div className={classes.paper}>
            <FormControl>
              <TextField
                value={toDoItem.toDo}
                onChange={e =>
                  setToDoItem({ ...toDoItem, toDo: e.target.value })
                }
                label='ToDo Item'
                variant='outlined'
                multiline
              />
              <FormHelperText>Edit the toDo Item.</FormHelperText>
            </FormControl>
            <FormControl>
              <Fab
                className={classes.buttonStyle}
                color='secondary'
                size='small'
                onClick={update}
                disabled={!toDoItem.toDo}
              >
                <AddIcon />
              </Fab>
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default React.memo(PopulateList);
