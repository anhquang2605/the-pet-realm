import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
const loginPage = '/authentication/login';
export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setTimeout(() => {
        router.push(loginPage); 
      } , 2000);
      router.push(loginPage);
      return;
    }
    console.log('Token found:', token);
/*     try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (decoded.role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.push(loginPage);
      }
    } catch (err) {
      router.push(loginPage  );
    } */
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Welcome, Admin!</h1>
      <p className="mt-2 text-gray-700">You have successfully signed in.</p>
    </div>
  );
}