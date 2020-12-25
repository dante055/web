const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the cururent booked tour
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    return next(new AppError('No tours found with is id!', 404));
  }

  /* 
    we create the query strin so that we can confime and cret our booking
    not secute ass nyone can crete a new bookin ig they know the url structue
    (when posted we will get access to session object to get the payent details)
    success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      req.params.tourId
    }&user=${req.user._id}&price=${tour.price}`,

    // for development testing (as strip takes hosted images only)
    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
  */

  // 2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    payment_method_types: ['card'],
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
        ],
        amount: tour.price * 100, // amout expected to be in cents
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3) Create seesion as responce
  res.status(200).json({
    status: 'success',
    session,
  });
});

/* 
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  // when a payment is made, '/' route will be hit so place this middleware function there

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  // remove the querystring and then redirect
  res.redirect(req.originalUrl.split('?')[0]);
});
 */

const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

// ---------------- will run when a payment is successfull ---------
// not implepemted yet
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // it is strip who will recieve this as it is stripe who has called this route
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  // send back some response to stripe
  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
