import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeButton from "../components/StripeButton";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51AROWSJX9HHJ5bycpEUP9dK39tXufyuWogSUdeweyZEXy3LC7M8yc5d9NlQ96fRCVL0BlAu7Nqt4V7N5xZjJnrkp005fDiTMIr");


const formatPrice = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


const productsTab = [
    {
        id: 1,
        title: 'Coca-cola',
        priceCents: 4.00,
        currency: 'USD',
        image: "https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Small tip on our development"
    },
    {
        id: 2,
        title: 'Margarita',
        priceCents: 12.00,
        currency: 'USD',
        image: "https://images.pexels.com/photos/1590154/pexels-photo-1590154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Help us spread our wings"
    },
    {
        id: 3,
        title: 'Long Island',
        priceCents: 20.00,
        currency: 'USD',
        image: "https://images.pexels.com/photos/7282903/pexels-photo-7282903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Become our best customer"
    },
]

function SupportUs() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div className="content">
                <p className="description">
                    Do you like our design? Order us a drink!
                </p>

                <div className="grid">
                    {productsTab.map(product => {
                        return (
                            <div key={product.id} onClick={() => ("")} className="card" style={{margin:"15px", padding:"15px", cursor:'pointer'}}>
                                <h3>{product.title}</h3>
                                <p>{formatPrice.format(product.priceCents)}</p>
                                <div>
                                    <StripeButton price={product.priceCents} imageURL={product.image} desc={product.description}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            <div className="App">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default SupportUs;

