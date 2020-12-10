const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // add a filter that guide have to had the role of tourGuide
    const modelName = Model.collection.collectionName;
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: newDoc,
      },
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.collection.collectionName;

    let query = Model.findById(req.params.id);
    if (modelName === 'tours') {
      query = query.populate({
        path: 'reviews',
        select: '-__v',
      });
    } else if (modelName === 'users' && req.user.role.includes('admin')) {
      query = query.select(
        '+password +lastLoggedOutAt +lastPasswordChangedAt +passwordResetToken +passwordResetExpires +active'
      );
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${modelName} found with this ID`, 404));
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    const modelName = Model.collection.collectionName;

    let query;
    if (modelName === 'reviews') {
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };
      query = Model.find(filter);
    } else {
      query = Model.find();
    }

    if (modelName === 'tours') {
      const features = new ApiFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();
      query = features.query;
    } else if (modelName === 'users') {
      query = query.select(
        '+password +lastLoggedOutAt +lastPasswordChangedAt +passwordResetToken +passwordResetExpires +active'
      );
    }

    // const doc = await query.explain(); // to get query sttics
    const doc = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        [modelName]: doc,
      },
    });
  });

const filterObj = (obj, ...notAllowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    // either do this or throw a error here
    if (!notAllowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // add a filter that guide have to had the role of tourGuide
    const modelName = Model.collection.collectionName;
    const isAdmin = req.user.role.includes('admin');

    const filteredBody = filterObj(req.body, 'createdBy', 'createdAt');
    let doc;

    if (isAdmin) {
      doc = await Model.findOneAndUpdate({ _id: req.params.id }, filteredBody, {
        new: true,
        runValidators: true,
      });
    } else if (modelName === 'reviews' && !isAdmin) {
      doc = await Model.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (modelName === 'tours' && !isAdmin) {
      doc = await Model.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user._id,
        },
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    console.log(doc);

    if (!doc) {
      return next(
        new AppError(
          `Either their is no ${modelName} with this ID, or u dont have to presion to update or delete it!`,
          401
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const isAdmin = req.user.role.includes('admin');
    const modelName = Model.collection.collectionName;

    let doc;

    if (modelName === 'reviews' && !isAdmin) {
      doc = await Model.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
    } else if (modelName === 'tours' && !isAdmin) {
      doc = await Model.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id,
      });
    }

    if (!doc) {
      return next(
        new AppError(
          `Either their is no ${modelName} with this ID, or u dont have to presion to update or delete it!`,
          401
        )
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
