import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtVerify } from 'jose';
import styles from './page-styles/admin.module.css';
import ActionCard from '../components/sections/admin-components/action-card/action-card';
import ActionButton from '../components/universals/buttons/action-button/action-button';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
const loginPage = '/authentication/login';
const ADMIN_ACTIONS = [
  { title: 'Browse Orders', description: 'View and manage all orders in the system.', link: '/browse/admin', color: 'chocolate' },
  {title: 'Create new Order', description: 'Create a new order on behalf of a user.', link: '/orders/create', color: 'green' },
  { title: 'View Mailbox', description: 'View and manage all emails in the system.', link: '/mailbox', color : 'deepskyblue' },

]
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
  
    /* if (payload.role === "admin") {
      setIsAuthorized(true);
    } else {
      router.push(loginPage);
    } */
   } catch (error) {
    console.log(error);
    //router.push(loginPage);
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
        {
          ADMIN_ACTIONS.map((action, index) => (
            <ActionCard key={index} title={action.title} description={action.description}>
              <ActionButton color={action.color} type="main" title={action.title} onClick={() => router.push(action.link)} />     
            </ActionCard>
          ))
        }
      </div>
    </div>
  );
}