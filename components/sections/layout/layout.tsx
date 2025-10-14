import React from 'react';
import style from './layout.module.css';
import Header from '../header/Header';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    //get pathname
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    return (
        <>

            {!pathname.includes('admin') && <Header />}
             {children}
        </>
           
    );
};

export default Layout;