import React, { useEffect } from 'react';
import style from './layout.module.css';
import Header from '../header/Header';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [pathname, setPathname] = React.useState('');
    //get pathname
    useEffect(()=>{
        setPathname(window.location.pathname);
    }, [])
   
    return (
        <>

            {!pathname.includes('authentication') && <Header />}
             {children}
        </>
           
    );
};

export default Layout;