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

const addAndUpdate = (notes, argv) => {
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

  // author is not present so add new author
  const newNote = {
    [author]: [
      {
        [title]: {
          title,
          body,
          'ceated date': new Date(),
          'modidifed date': new Date(),
          author,
        },
      },
    ],
  };

  notes.data.push(newNote);
  return notes;
};

exports.addNote = argv => {
  const notes = loadNotes();
  console.log(notes);

  const newNotes = addAndUpdate(notes, argv);
  fs.writeFileSync(
    `${path.join(__dirname, '../')}/data/notes.json`,
    JSON.stringify(newNotes, null, 2)
  );
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
