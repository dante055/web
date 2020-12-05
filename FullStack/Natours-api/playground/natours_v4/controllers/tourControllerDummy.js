const fs = require('fs');
const Tour = require('../models/tourModel');
const ApiFeatures = require('../utils/ApiFeatures');

exports.getALlTours = async (req, res) => {
  try {
    console.log(req.query);

    // 1. fitering
    let queryObj = { ...req.query };
    const excludedFilds = ['sort', 'fields', 'page', 'limit'];
    excludedFilds.forEach(field => delete queryObj[field]);

    // 1b. advance filtering, get operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lt|lte|gt|gte)\b/g,
      match => `$${match}`
    );
    queryObj = JSON.parse(queryString);
    /*  
    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`)
    ); 
    */
    let query = Tour.find(queryObj);

    // 2. sorting

    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      // default : by most newly created tours
      query.sort('-createdAt');
    }

    // 3. limiting fields
    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    } else {
      query.select('-__v');
    }

    // 4 pagination
    if (req.query.page) {
      let page = Number(req.query.page) || 1;
      let limitDoc = Number(req.query.limit) || 100;
      let skipDoc = (page - 1) * limitDoc;

      const numTours = await Tour.countDocuments();
      if (skipDoc >= numTours) throw new Error('Page does not exist!');

      query.skip(skipDoc).limit(limitDoc);
    }

    const tours = await query;

    res.status(200).json({
      status: 'sucess',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    // const tours = await Tour.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'sucess',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
