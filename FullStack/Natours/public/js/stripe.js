import { axiosInstance } from './axios';
import { showAlert } from './alert';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_t0Z138PqdQQMgTyOqGbbXYbG';
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axiosInstance.get(
      `/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
