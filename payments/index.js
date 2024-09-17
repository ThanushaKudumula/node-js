const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.get('/', (req, res) => {
    res.send('We are about to build the illest Stripe Payment API...');
});

app.post('/api/checkout', async (req, res) => {
    const { product, card } = req.body;
    try {
        const stripeToken = await stripe.tokens.create({
          card,
        });
        const stripeCustomer = await stripe.customers.create({
          email: 'thanusha@synergytechs.net',
          source: stripeToken.id, //
          address: {
            line1: 'KK 137 ST',
            postal_code: '10001',
            city: 'Kigali',
          },
          shipping: {
            name: 'Nishimwe',
            address: {
              line1: 'KK 137 ST',
              postal_code: '10001',
              city: 'Kigali',
            },
          },
          name: 'NISHIMWE',
        });
    
    
        const stripeCharge = await stripe.charges.create({
          amount: product.price * 100, 
          currency: 'usd',
          customer: stripeCustomer.id,
          description: `Purchased the ${product.name} for ${product.price}`,
        });
        res.status(200).json({
          message: 'Payment was successful',
          charge: stripeCharge,
        });
    }
    catch (error) {
        return res.status(500).json({
          error: error.message,
        });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});