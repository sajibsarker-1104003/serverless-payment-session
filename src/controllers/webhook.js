const stripe = require("stripe")(
  "sk_test_51Nek5zI970CNiWcbmlIDuKKRASolSJ241yI15YdFNe29GPs8jayidZxdM52bdW7cjdPBkIydGIVD7evlpvvGZLJy00jl8UEAuu"
);

module.exports.webhook = async (event) => {
  const { body, headers } = event;
  const sig = headers["stripe-signature"];

  let eventObject;
  const endpointSecret =
    "whsec_88c45070409fedbfd1c1c28965cdaced766a456fdaae96d72890ed3a28334baf";

  try {
    eventObject = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  let data;

  // Handle the event based on its type
  switch (eventObject.type) {
    case "checkout.session.completed":
      // Handle the checkout.session.completed event here
      console.log("Checkout Session Completed:", eventObject.data.object);
      data = eventObject.data.object;
      break;

    default:
      console.log(`Unhandled event type: ${eventObject.type}`);
  }

  // Return a success response
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, data: data }),
  };
};
