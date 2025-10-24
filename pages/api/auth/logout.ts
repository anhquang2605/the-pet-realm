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
    //

}
