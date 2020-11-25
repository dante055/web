const fs = require('fs');
const yargs = require('yargs');
const {
  addAuthorBuilder,
  addUpdateBuilder,
} = require('./modules/yargsBuilders');
const { addAutor, addNote, updateNote } = require('./modules/notes');

const addCommandYargs = (command, describe, builder, fun) => {
  yargs.command({
    command,
    describe,
    builder,
    handler: argv => {
      fun(argv);
    },
  });
};

addCommandYargs('addAuthor', 'Add a author', addAuthorBuilder, addAutor);
addCommandYargs('addNote', 'Add a note', addUpdateBuilder, addNote);
addCommandYargs('updateNote', 'Update the note', addUpdateBuilder, updateNote);

yargs.parse();

// addAuthor --author="dante"
// addNote --author="dante" --title="first" --body="my first note"
// updateNote --author="dante" --title="first" --body="my first note sdfsjkd"

// cant add dublicate author
// cant add note if author is alrealy present
// cant add note with same title
// cant update if author or title is not present
