const stripe = require("stripe")('sk_test_51Nek5zI970CNiWcbmlIDuKKRASolSJ241yI15YdFNe29GPs8jayidZxdM52bdW7cjdPBkIydGIVD7evlpvvGZLJy00jl8UEAuu');

module.exports.handler = async (event) => {
  try {
    const { priceId } = event.pathParameters;
    console.log(priceId);

    // Create a Checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription", // Change the mode to subscription
      success_url: "https://www.google.com/", // Replace with s3 link
      cancel_url: "https://www.facebook.com/", // Replace with sysonex.com

    });
    
    //redirect subscripytion link

    const subscription_link= session.url;
    const  sessionId= session.id ;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data fetches successfully",
        data: priceId,
        subscription_link:subscription_link,
        sessionId:sessionId
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        message: "An error occurred",
      }),
    };
  }
};
