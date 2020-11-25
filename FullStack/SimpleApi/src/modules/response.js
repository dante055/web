exports.success = (res, contentType, data) => {
  res.writeHead(200, {
    'Content-type': contentType,
  });
  return res.end(data);
};

exports.error = res => {
  res.writeHead(404, {
    'Content-type': 'text/html',
  });
  return res.end('<h1>Page not found!</h1>');
};
