import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
const loginPage = '/authentication/login';
export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const checkAdminAuthorization = async () => {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      setTimeout(() => {
        router.push(loginPage); 
      } , 2000);
      router.push(loginPage);
      return;
    }
    
   try{
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    if (payload.role === "admin") {
      setIsAuthorized(true);
    } else {
      router.push(loginPage);
    }
   } catch (error) {
    router.push(loginPage);
   }
    /* if (decoded.role === "admin") {
      setIsAuthorized(true);
    } else {
      router.push(loginPage);
    } */
  
    //router.push(loginPage  );
    
  }
  useEffect(() => {
    checkAdminAuthorization();
  }, []);


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Welcome, Admin!</h1>
      <p className="mt-2 text-gray-700">You have successfully signed in.</p>
    </div>
  );
}