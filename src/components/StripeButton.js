import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({ price, imageURL, desc }) => {
    const publishableKey = "pk_test_51KKNxEGjs732iTUg6ZtkZXL7AcAmTCde3fk3PiKR7fs61aSPl7CLyYbTBPIjp466hSpQPHKOKsclDfiY0yOOYgPV00aArLhRy0";
    const stripePrice = price * 100;

    const onToken = (token) => {
        console.log(token);
        axios
            .post("http://localhost:8080/payment", {
                amount: stripePrice,
                token,
            })
            .then((response) => {
                console.log(response);
                alert("Payment success! Thank for your donate!");
            })
            .catch((error) => {
                console.log(error);
                alert("Payment failed. Please try again.");
            });
    };

    return (
        <StripeCheckout
            amount={stripePrice}
            label="Help us!"
            name="SHOT IT"
            image={imageURL}
            description={desc}
            panelLabel="Give a tip!"
            token={onToken}
            stripeKey={publishableKey}
            currency="USD"
            //billingAddress
            //shippingAddress
        />
    );
};

export default StripeButton;