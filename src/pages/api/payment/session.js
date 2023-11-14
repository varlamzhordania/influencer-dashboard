// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// async function CreateStripeSession(req, res) {
//   const { item } = req.body;

//   const redirectURL =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3001"
//       : "https://stripe-checkout-next-js-demo.vercel.app";

//   const transformedItem = {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         // images: [item.image],
//         name: item?.name,
//       },
//       unit_amount: item?.price * 100,
//     },
//     description: item?.desc,
//     quantity: 1,
//   };

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [transformedItem],
//     mode: "payment",
//     success_url: redirectURL + "?status=success",
//     cancel_url: redirectURL + "?status=cancel",
//     customer_email: item?.customerEmail,
//     metadata: {
//       images: item.image,
//     },
//   });

//   res.json({ id: session.id });
// }

// export default CreateStripeSession;

// pages/api/payment/session.js

import paymentApi from "@/lib/payment";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function CreateStripeSession(req, res) {
  const { item, plan, user, isYearlyBilling } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/transaction"
      : "https://infulent.io/transaction";

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: item?.name,
      },
      unit_amount: item?.price * 100,
    },
    description: item?.desc,
    quantity: 1,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [transformedItem],
      mode: "payment",
      success_url:
        redirectURL + "?status=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: redirectURL + "?status=cancel",
      customer_email: item?.customerEmail,
      metadata: {
        images: item?.image,
      },
    });

    await paymentApi.addPayment(
      {
        ...plan,
        sessionId: session?.id,
        duration: isYearlyBilling ? "Yearly" : "Monthly",
      },
      user?.uid
    );

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
}
