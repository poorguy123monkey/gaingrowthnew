import axios from 'axios';

// Service mapping for SMMFollows API
const SERVICE_MAP = {
  subscribers: "14626", // YouTube Subscribers
  likes: "15201",       // YouTube Likes
  views: "15270"        // YouTube Views
};

// Validate YouTube URL format
const isValidYouTubeUrl = (url) => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
};

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
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    const { serviceType, youtubeUrl, quantity, paymentId } = req.body;

    // Validate required fields
    if (!serviceType || !youtubeUrl || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['serviceType', 'youtubeUrl', 'quantity']
      });
    }

    // Validate service type
    const serviceId = SERVICE_MAP[serviceType];
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type',
        validServices: Object.keys(SERVICE_MAP)
      });
    }

    // Validate YouTube URL
    if (!isValidYouTubeUrl(youtubeUrl)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid YouTube URL format',
        example: 'https://www.youtube.com/watch?v=...'
      });
    }

    // Validate quantity
    const quantityNum = parseInt(quantity, 10);
    if (isNaN(quantityNum) || quantityNum < 100 || quantityNum > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 100 and 10,000',
        min: 100,
        max: 10000
      });
    }

    console.log(`Processing order: ${serviceType} x${quantity} for ${youtubeUrl}`);
    
    // Make request to SMMFollows API
    const response = await axios.post("https://smmfollows.com/api/v2", null, {
      params: {
        key: process.env.API_KEY,
        action: "add",
        service: serviceId,
        link: youtubeUrl,
        quantity: quantityNum
      },
      timeout: 30000 // 30 seconds timeout
    });

    // Log successful order
    console.log('Order successful:', response.data);

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      data: response.data,
      orderDetails: {
        serviceType,
        youtubeUrl,
        quantity: quantityNum,
        paymentId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    // Log detailed error information
    console.error('Order processing error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    // Determine appropriate status code
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || 'Failed to process order';

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      details: process.env.NODE_ENV === 'development' ? {
        code: error.code,
        response: error.response?.data
      } : undefined
    });
  }
}