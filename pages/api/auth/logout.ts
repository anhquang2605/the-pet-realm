import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectDB } from './../../../libs/mongoose';
import Admin from './../../../models/Admin';
import {SignJWT} from 'jose';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  await connectDB();

  const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Missing fields' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const updatedAdmin = await Admin.findOneAndUpdate(
        { 
            email 
        },
        {
            token: null,
        });
    if (!updatedAdmin) {
        return res.status(500).json({ message: 'Error logging out' });
    }
    return res.status(200).json({ message: 'Logout successful' });
}
