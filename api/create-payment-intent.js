import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Specify API version
  timeout: 20000, // 20 seconds timeout
  maxNetworkRetries: 2, // Retry failed requests twice
});

// Validate currency code
const isValidCurrency = (currency) => {
  const allowedCurrencies = ['usd', 'eur', 'gbp', 'cad', 'aud'];
  return typeof currency === 'string' && allowedCurrencies.includes(currency.toLowerCase());};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).json({
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    const { amount, currency = 'usd' } = req.body;

    // Validate amount
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents < 50 || amountInCents > 99999999) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
        min: 0.50,
        max: 999999.99,
        currency: 'USD'
      });
    }

    // Validate currency
    if (!isValidCurrency(currency)) {
      return res.status(400).json({
        success: false,
        message: 'Unsupported currency',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment',
        service: 'gaingrowth-panel'
      }
    });

    // Log successful payment intent creation (without sensitive data)
    console.log('Payment intent created:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (error) {
    // Log detailed error information
    console.error('Payment intent creation failed:', {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    // Determine appropriate status code
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Payment processing failed';

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      type: error.type,
      code: error.code,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        raw: error.raw
      } : undefined
    });
  }
}
