const author = {
  alias: 'a',
  decribe: 'Note author',
  demandOption: true,
  type: 'string',
};

const title = {
  alias: 't',
  decribe: 'Note title',
  demandOption: true,
  type: 'string',
};

const body = {
  alias: 'b',
  decribe: 'Note body',
  demandOption: true,
  type: 'string',
};

exports.authorBuilder = {
  author,
};

exports.addUpdateBuilder = {
  title,
  body,
  author,
};

exports.removeReadBuilder = {
  title,
  author,
};
