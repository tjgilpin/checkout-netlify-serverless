/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
const inventory = require('./data/products.json');

exports.handler = async (event) => {

  let sessionId = event.queryStringParameters.session_id;  

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const customer = await stripe.customers.retrieve(session.customer);
  
  const items = session.metadata.items;
  let itemObj = JSON.parse(items);
  itemObj = itemObj[0]

  console.log(customer);
  console.log(session);
  console.log(itemObj.userId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Sucessful transaction, please write down the following code ${itemObj.userId}`
    }),
  };
}
