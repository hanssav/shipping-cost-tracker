import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { origin, destination, weight = 1000, courier = 'jne' } = req.body;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_RAJAONGKIR_API}/starter/cost`,
        new URLSearchParams({
          origin: origin,
          destination: destination,
          weight: String(weight),
          courier: courier,
        }), {
          headers: {
            key: process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY,
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching shipping cost:', error);
      res.status(500).json({ error: 'Failed to fetch shipping cost' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
