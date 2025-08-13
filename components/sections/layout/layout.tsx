import React from 'react';
import style from './layout.module.css';
import Header from '../header/Header';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header />
             {children}
        </>
           
    );
};

export default Layout;