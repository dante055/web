module.exports = fn => {
  return (req, res, next) => {
    // fn(req, res, next).catch(err => {
    //   console.log('-----------------');
    //   console.log(err);
    //   console.log('-----------------');
    //   next(err);
    // });
    // fn(req, res, next).catch(err => next(err));
    fn(req, res, next).catch(next);
  };
};
