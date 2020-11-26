const fs = require('fs');
const path = require('path');
const { argv } = require('process');

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
  for (let notesIndex in notes.data) {
    let note = notes.data[notesIndex];
    if (author in note) {
      throw 'Author already exist';
    }
  }
  notes.data.push({ [author]: [] });
  return notes;
};

const addNoteFun = (notes, argv) => {
  const { title, body, author } = argv;

  for (let notesIndex in notes.data) {
    let note = notes.data[notesIndex];
    if (author in note) {
      for (let noteDetailIndex in note[author]) {
        let noteDetail = notes.data[notesIndex][author][noteDetailIndex];
        if (title in noteDetail) {
          throw 'Note with this title is already present!!';
        }
      }
      // add the note for this author
      const newNote = {
        [title]: {
          title,
          body,
          'ceated date': new Date(),
          'modidifed date': new Date(),
          author,
        },
      };
      notes.data[notesIndex][author].push(newNote);
      return notes;
    }
  }
  throw 'Author not found!!';
};

const updateNoteFun = (notes, argv) => {
  const { title, body, author } = argv;
  for (let notesIndex in notes.data) {
    let note = notes.data[notesIndex];
    if (author in note) {
      for (let noteDetailIndex in note[author]) {
        let noteDetail = notes.data[notesIndex][author][noteDetailIndex];
        if (title in noteDetail) {
          // modify the note
          notes.data[notesIndex][author][noteDetailIndex][title].body = body;
          notes.data[notesIndex][author][noteDetailIndex][title][
            'modidifed date'
          ] = new Date();
          return notes;
        }
      }
      throw 'Title not Found!!';
    }
  }
  throw 'Author not found!!';
};

const removeNoteFun = (notes, argv) => {
  const { title, author } = argv;
  for (let notesIndex in notes.data) {
    let note = notes.data[notesIndex];
    if (author in note) {
      for (let noteDetailIndex in note[author]) {
        let noteDetail = notes.data[notesIndex][author][noteDetailIndex];
        if (title in noteDetail) {
          // remove the note
          const authorNotes = notes.data[notesIndex][author];
          const newAuthorNotes = [
            ...authorNotes.slice(0, noteDetailIndex),
            ...authorNotes.slice(noteDetailIndex + 1),
          ];
          notes.data[notesIndex][author] = newAuthorNotes;
          return notes;
        }
      }
      throw 'Title not Found!!';
    }
  }
  throw 'Author not found!!';
};

const listAuthorsFun = notes => {
  if (!notes.data.length) throw 'No authors present!!';
  return notes.data.map(author => Object.keys(author)[0]);
};

const listAuthorNotesFun = (notes, argv) => {
  const { author } = argv;
  for (let notesIndex in notes.data) {
    if (author in notes.data[notesIndex]) {
      const authorNotes = notes.data[notesIndex][author];
      if (!authorNotes.length) throw 'No notes present this author!!';
      return authorNotes.map(note => Object.keys(note)[0]);
    }
  }
  throw 'Author not found!!';
};

const readNoteFun = (notes, argv) => {
  const { author, title } = argv;
  for (let notesIndex in notes.data) {
    let note = notes.data[notesIndex];
    if (author in note) {
      for (let noteDetailIndex in note[author]) {
        let noteDetail = notes.data[notesIndex][author][noteDetailIndex];
        if (title in noteDetail) {
          // read the note
          return noteDetail;
        }
      }
      throw 'Title not Found!!';
    }
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

exports.listAuthors = argv => {
  try {
    const notes = loadNotes();
    const authors = listAuthorsFun(notes);
    console.log(authors);
  } catch (err) {
    console.log(err);
  }
};

exports.listAuthorNotes = argv => {
  try {
    const notes = loadNotes();
    const authorsNotes = listAuthorNotesFun(notes, argv);
    console.log(authorsNotes);
  } catch (err) {
    console.log(err);
  }
};

exports.readNote = argv => {
  try {
    const notes = loadNotes();
    const noteDetail = readNoteFun(notes, argv);
    console.log(noteDetail);
  } catch (err) {
    console.log(err);
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
