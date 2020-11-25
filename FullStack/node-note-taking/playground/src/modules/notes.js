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
    return {};
  }
};

exports.addNote = argv => {
  const { title, body, author } = argv;
  const notes = loadNotes();
  //   console.log(author in notes);
  const createdDate =
    author in notes
      ? title in notes[author]
        ? notes[author][title]['ceated date']
        : new Date()
      : new Date();

  author in notes
    ? (notes[author][title] = {
        body,
        'ceated date': createdDate,
        'modidifed date': new Date(),
        author: 'name',
      })
    : (notes[author] = {
        [title]: {
          body,
          'ceated date': createdDate,
          'modidifed date': new Date(),
          author: 'name',
        },
      });

  fs.writeFileSync(
    `${path.join(__dirname, '../')}/data/notes.json`,
    JSON.stringify(notes, null, 2)
  );
};

// file format
/* 
{
    author: {
        title1 : {

        }
        title2 : {

        }
    }
} 
*/
