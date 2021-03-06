const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const rawNotes = fs.readFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`
    );
    const notes = JSON.parse(rawNotes);
    return notes;
  } catch (e) {
    return { data: [] };
  }
};

const addAuthorFun = (notes, argv) => {
  const { author } = argv;

  const authorDetails = notes.data.find(
    authorDetails => author in authorDetails
  );

  if (authorDetails) throw 'Author already exist!!';

  notes.data.push({ [author]: [] });
  return notes;
};

const addNoteFun = (notes, argv) => {
  const { title, body, author } = argv;

  const authorIndex = notes.data.findIndex(
    authorDetails => author in authorDetails
  );

  if (authorIndex === -1) throw 'Author not found!!';

  const note = notes.data[authorIndex][author].find(note => title in note);

  if (note) throw 'Note with this title is already present!!';

  const newNote = {
    [title]: {
      title,
      body,
      'ceated date': new Date(),
      'modidifed date': new Date(),
      author,
    },
  };
  notes.data[authorIndex][author].push(newNote);
  return notes;
};

const updateNoteFun = (notes, argv) => {
  const { title, body, author } = argv;
  const authorIndex = notes.data.findIndex(
    authorDetails => author in authorDetails
  );

  if (authorIndex === -1) throw 'Author not found!!';

  const noteIndex = notes.data[authorIndex][author].findIndex(
    note => title in note
  );

  if (noteIndex === -1) throw 'Title not Found!!';

  notes.data[authorIndex][author][noteIndex][title].body = body;
  notes.data[authorIndex][author][noteIndex][title][
    'modidifed date'
  ] = new Date();
  return notes;
};

const removeNoteFun = (notes, argv) => {
  const { title, author } = argv;

  const authorIndex = notes.data.findIndex(
    authorDetails => author in authorDetails
  );

  if (authorIndex === -1) throw 'Author not found!!';

  const noteIndex = notes.data[authorIndex][author].findIndex(
    note => title in note
  );

  if (noteIndex === -1) throw 'Title not Found!!';

  const newAuthorNotes = [
    ...notes.data[authorIndex][author].slice(0, noteIndex),
    ...notes.data[authorIndex][author].slice(noteIndex + 1),
  ];

  notes.data[authorIndex][author] = newAuthorNotes;
  return notes;
};

const listAuthorsFun = notes => {
  if (!notes.data.length) throw 'No authors present!!';
  return notes.data.map(author => Object.keys(author)[0]);
};

const listAuthorNotesFun = (notes, argv) => {
  const { author } = argv;

  const authorNotes = notes.data.find(authorDetails => author in authorDetails);

  if (authorNotes) {
    const authorNotesList = authorNotes[author].map(
      note => Object.keys(note)[0]
    );

    if (authorNotesList.length) return authorNotesList;

    throw 'No notes present for this author!!';
  }

  throw 'Author not found!!';
};

const readNoteFun = (notes, argv) => {
  const { author, title } = argv;

  const authorNotes = notes.data.find(authorDetails => author in authorDetails);

  if (authorNotes) {
    const noteDetail = authorNotes[author].find(note => title in note);
    if (noteDetail) return noteDetail[title];
    throw 'Title not Found!!';
  }

  throw 'Author not found!!';
};

exports.addAutor = argv => {
  try {
    const notes = loadNotes();
    const newNotes = addAuthorFun(notes, argv);
    fs.writeFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`,
      JSON.stringify(newNotes, null, 2)
    );
    console.log(chalk.inverse.green.bold('Sucessfully added the author!!'));
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.addNote = argv => {
  try {
    const notes = loadNotes();
    const newNotes = addNoteFun(notes, argv);
    fs.writeFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`,
      JSON.stringify(newNotes, null, 2)
    );
    console.log(chalk.inverse.green.bold('Sucessfully added the note!!'));
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.updateNote = argv => {
  try {
    const notes = loadNotes();
    const newNotes = updateNoteFun(notes, argv);
    fs.writeFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`,
      JSON.stringify(newNotes, null, 2)
    );
    console.log(chalk.inverse.green.bold('Sucessfully updated the note!!'));
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.removeNote = argv => {
  try {
    const notes = loadNotes();
    const newNotes = removeNoteFun(notes, argv);
    fs.writeFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`,
      JSON.stringify(newNotes, null, 2)
    );
    console.log(chalk.inverse.green.bold('Sucessfully removed the note!!'));
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.listAuthors = argv => {
  try {
    const notes = loadNotes();
    const authors = listAuthorsFun(notes);
    console.log(chalk.inverse.bold('List of all authors!!'));
    console.log(authors);
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.listAuthorNotes = argv => {
  try {
    const notes = loadNotes();
    const authorsNotes = listAuthorNotesFun(notes, argv);
    console.log(chalk.inverse.bold('List of all your note titles!!'));
    console.log(authorsNotes);
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};

exports.readNote = argv => {
  try {
    const notes = loadNotes();
    const noteDetail = readNoteFun(notes, argv);
    console.log(chalk.inverse.bold('Note details!!'));
    console.log(noteDetail);
  } catch (err) {
    console.log(chalk.inverse.red.bold(err));
  }
};
// file format
/* 
{
    notes: [
        {
            author: [
                {
                    title: {

                    }
                }
            ]
        }
    ]
} 
*/
