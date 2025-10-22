import React, { useEffect } from 'react';
import style from './layout.module.css';
import Header from '../header/Header';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [pathname, setPathname] = React.useState('');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const checkIfAuthenticated = () => {
        // Logic to check if user is authenticated
        const token = localStorage.getItem('admin_token');
        return !!token;
    }
    //get pathname
    useEffect(()=>{
        setPathname(window.location.pathname);
        setIsAuthenticated(checkIfAuthenticated());
    }, [])
   
    return (
        <>

            {!pathname.includes('authentication') && <Header isAuthenticated={isAuthenticated} />}
             {children}
        </>
           
    );
};

export default Layout;