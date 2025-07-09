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
    console.error('Order error:', err?.response?.data || err.message);
    return res.status(500).json({ 
      message: 'Order failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      details: process.env.NODE_ENV === 'development' ? err?.response?.data : undefined
    });
  }
}