import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectDB } from './../../../libs/mongodb';
import Admin from './../../../models/Admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const existing = await Admin.findOne({ email: 'admin@shop.com' });
  if (existing) return res.status(200).json({ message: 'Admin already exists' });

  const hashed = await bcrypt.hash('admin123', 10);
  await Admin.create({ email: 'admin@shop.com', password: hashed, name: 'Shop Owner' });

  res.status(201).json({ message: 'Default admin created', email: 'admin@shop.com', password: 'admin123' });
}