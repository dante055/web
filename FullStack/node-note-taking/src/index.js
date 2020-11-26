const fs = require('fs');
const yargs = require('yargs');
const {
  authorBuilder,
  addUpdateBuilder,
  removeReadBuilder,
} = require('./modules/yargsBuilders');
const {
  addAutor,
  addNote,
  updateNote,
  removeNote,
  listAuthors,
  listAuthorNotes,
  readNote,
} = require('./modules/notes');

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

addCommandYargs('addAuthor', 'Add a author', authorBuilder, addAutor);
addCommandYargs('addNote', 'Add a note', addUpdateBuilder, addNote);
addCommandYargs('updateNote', 'Update the note', addUpdateBuilder, updateNote);
addCommandYargs('removeNote', 'Remove the note', removeReadBuilder, removeNote);
addCommandYargs('listAuthors', 'List all the authors', {}, listAuthors);
addCommandYargs(
  'listAuthorNotes',
  'list all author notes',
  authorBuilder,
  listAuthorNotes
);
addCommandYargs('readNote', 'Read the note', removeReadBuilder, readNote);
yargs.parse();

// addAuthor --author="dante"
// addNote --author="dante" --title="first" --body="my first note"
// updateNote --author="dante" --title="first" --body="my first note sdfsjkd"
// listAuthors
// listAuthorNotes --author="dante"
// readNote --author="dante" --title="first"

// cant add dublicate author
// cant add note if author is alrealy present
// cant add note with same title
// cant update if author or title is not present
