const fs = require('fs');
const yargs = require('yargs');
const {
  addAuthorBuilder,
  addUpdateBuilder,
} = require('./modules/yargsBuilders');
const { addAutor, addNote, updateNote } = require('./modules/notes3');

yargs
  .command({
    command: 'addAuthor',
    describe: 'Add a author',
    builder: addAuthorBuilder,
    handler: argv => {
      addAutor(argv);
    },
  })
  .command({
    command: 'addNote',
    describe: 'Add a note',
    builder: addUpdateBuilder,
    handler: argv => {
      addNote(argv);
    },
  })
  .command({
    command: 'updateNote',
    describe: 'Update the note',
    builder: addUpdateBuilder,
    handler: argv => {
      updateNote(argv);
    },
  })
  .parse();

// addAuthor --author="dante"
// addNote --author="dante" --title="first" --body="my first note"
// updateNote --author="dante" --title="first" --body="my first note sdfsjkd"
