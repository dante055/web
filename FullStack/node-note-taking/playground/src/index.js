const fs = require('fs');
const yargs = require('yargs');
const { addNote } = require('./modules/notes2');

yargs
  .command({
    command: ['add', 'update'],
    describe: 'Add a note',
    builder: {
      title: {
        alias: 't',
        decribe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body: {
        alias: 'b',
        decribe: 'Note body',
        demandOption: true,
        type: 'string',
      },
      author: {
        alias: 'a',
        decribe: 'Note author',
        demandOption: true,
        type: 'string',
      },
    },
    handler: argv => {
      addNote(argv);
    },
  })
  .parse();
//   .demandOption(['title', 'body']);

// node src/index.js add --title "my title" --body "this is body"
// node src/index.js add --title="my title" --body="this is body"
