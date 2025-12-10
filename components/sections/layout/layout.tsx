import React, { useEffect } from 'react';
import style from './layout.module.css';
import Header from '../header/Header';
import { jwtVerify } from 'jose';
import { usePathname } from 'next/navigation'
import path from 'path';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [sessionExpired, setSessionExpired] = React.useState(false);
    const pathnameHook = usePathname();
    const checkIfAuthenticated = () => {
        // Logic to check if user is authenticated
        const token = localStorage.getItem('admin_token');
        return !!token;
    }
    const checkAndHandleExpired = async () => {
        // Logic to check if token is expired
        const token = localStorage.getItem('admin_token');  
        if(!token) 
        {
            setIsAuthenticated(false);
            return;
        }
        
        try{
            const {payload} = await jwtVerify(
            token || '',
            new TextEncoder().encode(process.env.NEXT_PUBLICJWT_SECRET || 'supersecretkey'),
            )
            if(payload.role === 'admin'){
                console.log('Token is valid');
                setIsAuthenticated(true);
            }

        }
        catch(error){
            if (error instanceof Error && error.name === 'JWTExpired') {
                setIsAuthenticated(true);
                setSessionExpired(true);
            }
        }
    }   
    const checkAdminAuthorization = async () => {
        const authStatus = checkIfAuthenticated();
        setIsAuthenticated(authStatus);
    }
    //get pathname
    useEffect(()=>{ 
        checkAndHandleExpired();    
        if(pathnameHook.includes('admin')){
           checkAdminAuthorization();

        }
    }, [pathnameHook])
    useEffect(()=>{
        if (isAuthenticated && sessionExpired && !pathnameHook.includes('authentication')) {
            localStorage.removeItem('admin_token');
            setIsAuthenticated(false);
        }
    }, [isAuthenticated])
   
    return (
        <>

            {!pathnameHook.includes('authentication')  && <Header isAuthenticated={isAuthenticated} />}
             {children}
        </>
           
    );
};

export default Layout;