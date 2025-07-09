import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { serviceType, youtubeUrl, quantity } = req.body;

  const serviceMap = {
    subscribers: "14626",
    likes: "15201",
    views: "15270"
  };

  const serviceId = serviceMap[serviceType];
  if (!serviceId) {
    return res.status(400).json({ message: "Invalid service type" });
  }

  try {
    console.log('Making request to SMM API with key:', process.env.API_KEY ? 'Key exists' : 'Key is missing');
    console.log('Request params:', { serviceId, youtubeUrl, quantity });
    
    const response = await axios.post("https://smmfollows.com/api/v2", null, {
      params: {
        key: process.env.API_KEY,
        action: "add",
        service: serviceId,
        link: youtubeUrl,
        quantity
      }
    });

    return res.status(200).json({ order: response.data });
  } catch (err) {
    console.error('Full error object:', JSON.stringify(err, null, 2));
    console.error('Error response data:', err?.response?.data);
    console.error('Error stack:', err.stack);
    
    return res.status(500).json({ 
      message: 'Order failed',
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? {
        stack: err.stack,
        response: err?.response?.data
      } : undefined
    });
  }
}