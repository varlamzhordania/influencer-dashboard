import React, { useState } from "react";
import CreditCardModal from "@/components/CreditCardModal";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useAuth } from "../../context/AuthContext";
import paymentApi from "@/lib/payment";
function BillCard({ plan, isYearlyBilling }) {
  const { user } = useAuth();
  const [creditCardModalVisible, setCreditCardModalVisible] = useState(false);

  const showCreditCardModal = () => {
    setCreditCardModalVisible(true);
  };

  const hideCreditCardModal = () => {
    setCreditCardModalVisible(false);
  };

  const [loading, setLoading] = useState(false);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/payment/session", {
      item: {
        name: plan?.name,
        description: plan?.desc,
        // image:
        //   'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        price: isYearlyBilling
          ? plan?.price * 12 - plan?.price * 12 * 0.15
          : plan?.price,
        customerEmail: user?.email,
      },
      plan,
      user,
      isYearlyBilling
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data?.id,
    });
    if (result.error) {
      alert(result.error.message);
    } 
    // else {
    //   await paymentApi.addPayment(plan, user?.uid);
    // }
    setLoading(false);
  };

  return (
    <div className="cursor-pointer featured-collection-card fontMonst flex flex-col justify-between items-center rounded-lg border border-[#00000038] sm:mx-3 mx-1 px-4 py-5 w-full md:min-w-[280px]">
      <div className="flex flex-col justify-between h-full">
        <h1 className={` text-[24px] text-center font-bold`}>{plan?.name}</h1>
        <div className="flex flex-col items-center font-[500] text-[18px]">
          <p className="font-[700]">${plan?.price}/month</p>
          <ul className="my-3 flex flex-col space-y-2 text-base">
            <li>✓ Search 300k+ influencers</li>
            <li>✓ Youtube, Instagram, Tiktok</li>
            <li>✓ Select 30 influencers</li>
            <li>✓ Analyze 30 influencers profiles</li>
            <li>✓ Monitor 3 creator/influencer posts</li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={createCheckOutSession}
            className={`rounded-md py-1 px-3 my-3 w-fit`}
            style={{
              background:
                "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
              color: "white",
              fontWeight: 400,
            }}
            size="large"
            loading={loading}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
      {/* <CreditCardModal
        visible={creditCardModalVisible}
        onCancel={hideCreditCardModal}
      /> */}
    </div>
  );
}

export default BillCard;
