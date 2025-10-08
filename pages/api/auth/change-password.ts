import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from './../../../libs/mongodb';
import Admin from './../../../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();

  const { token, currentPassword, newPassword } = req.body;

  if (!token || !currentPassword || !newPassword)
    return res.status(400).json({ message: 'Missing fields' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) return res.status(401).json({ message: 'Current password incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}