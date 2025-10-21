import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtVerify } from 'jose';
import styles from './page-styles/admin.module.css';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
const loginPage = '/authentication/login';
export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizationMessage, setAuthorizatiorMessage] = useState('Checking Authorization...');
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
  const authorizationTimeout = () => {
    setTimeout(() => {
      if (!isAuthorized) {
        setAuthorizatiorMessage('Authorization timed out. Redirecting to login page...');
        router.push(loginPage); 
      }
    }, 3000);
  }
  useEffect(() => {
    checkAdminAuthorization();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-yellow-100">
        <h1 className="text-2xl font-bold text-yellow-700">{authorizationMessage}</h1>
      </div>
    );
  }
  return (
    <div className={"h-screen flex flex-col items-center justify-center bg-green-100" + styles['admin']}>
      <h1 className="text-3xl font-bold text-green-700">Welcome, Admin!</h1>
      <div className={styles['admin__dashboard']}>

      </div>
    </div>
  );
}