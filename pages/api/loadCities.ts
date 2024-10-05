import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_RAJAONGKIR_API}/starter/city`, {
      headers: {
        key: process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
}
