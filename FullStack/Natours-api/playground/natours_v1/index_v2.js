const express = require('express');
const {
  getALlTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('./modules/tours');
const {
  getALlUsers,
  getUser,
  createUser,
  updataUser,
  deleteUser,
} = require('./modules/users');

const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getALlTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getALlUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updataUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log('Listning to the server!!');
});
