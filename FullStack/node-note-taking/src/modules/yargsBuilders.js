exports.addAuthorBuilder = {
  author: {
    alias: 'a',
    decribe: 'Author',
    demandOption: true,
    type: 'string',
  },
};

exports.addUpdateBuilder = {
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
};
