const fs = require('fs');
const path = require('path');

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

// { "data": [] }

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

exports.addAutor = argv => {
  const notes = loadNotes();

  try {
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
  const notes = loadNotes();

  try {
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
  const notes = loadNotes();

  try {
    const newNotes = updateNoteFun(notes, argv);
    fs.writeFileSync(
      `${path.join(__dirname, '../')}/data/notes.json`,
      JSON.stringify(newNotes, null, 2)
    );
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
