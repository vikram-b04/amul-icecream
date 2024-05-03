const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51NzuH0SGp41m30vUyUGsnRbqECRBQNafiv6juEhUsYHSpm5CHnQVg8y0jEBSlmr0X9gcyzwwMCJgJsBcxW7hjhgV00Tmfduf8T")
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
        const { products } = req.body;

        const LineItem = products.map((products)=>({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: products.productname,
                },
                unit_amount: products.price*100,
            },
            quantity: products.count,

        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: LineItem,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });

})

app.listen(10000,()=>{
    console.log("working on port 10000");
})