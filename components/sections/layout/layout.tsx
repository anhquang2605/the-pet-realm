import React, { useEffect } from 'react';
import style from './layout.module.css';
import Header from '../header/Header';
import { jwtVerify } from 'jose';
import path from 'path';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [pathname, setPathname] = React.useState('');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [sessionExpired, setSessionExpired] = React.useState(false);
    const checkIfAuthenticated = () => {
        // Logic to check if user is authenticated
        const token = localStorage.getItem('admin_token');
        return !!token;
    }
    const checkAndHandleExpired = async () => {
        // Logic to check if token is expired
        const token = localStorage.getItem('admin_token');
       
        try{
            const {payload} = await jwtVerify(
            token || '',
            new TextEncoder().encode(process.env.NEXT_PUBLICJWT_SECRET || 'supersecretkey'),
            )
            if(payload.role === 'admin'){
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
    //get pathname
    useEffect(()=>{
        setPathname(window.location.pathname);  
        checkAndHandleExpired();     
        if(pathname.includes('admin')){
            const authStatus = checkIfAuthenticated();
            if(authStatus){
                setIsAuthenticated(true);
            } else {
                //redirect to login page, print out message that the user is not authenticated and authorized
            }

        }
    }, [])
    useEffect(()=>{
        if (isAuthenticated && sessionExpired && !pathname.includes('authentication')) {
            localStorage.removeItem('admin_token');
        }
    }, [isAuthenticated])
   
    return (
        <>

            {!pathname.includes('authentication') && <Header isAuthenticated={isAuthenticated} />}
             {children}
        </>
           
    );
};

export default Layout;