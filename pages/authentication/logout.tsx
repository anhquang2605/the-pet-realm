import React, { useEffect } from 'react';
import style from './../page-styles/logout.module.css';
import Image from 'next/image';
import ActionButton from '../../components/universals/buttons/action-button/action-button';
import { jwtVerify } from 'jose';

interface LogoutPageProps {
    
}
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
const LogoutPage: React.FC<LogoutPageProps> =  ({}) => {
    const [message, setMessage] = React.useState('Logging out...');
    const performLogout = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            setMessage('No active session found.');
            return;
        }
        const {payload} = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        if (!payload) {
            setMessage('Invalid session token.');
            return;
        }

        const res = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: payload.email }), 
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.removeItem('admin_token');
            setMessage('Logout successful. Redirecting to home page...');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } else {
            setMessage(data.message || 'Logout failed. Please try again.');
        }
    };
    const handleBack = () => {
        window.location.href = '/';
    };
    useEffect(() => {
        performLogout();
    },[])
    return (
        <section className={style['logout-page']}>
            <div className={style['logout-page__content']}>
                 <Image src="/asset/images/racoon.webp" alt="Racoon pet image from grow a garden game" width={150} height={150} />
                <h2 className="text-white text-2xl mt-1  text-center">
                    {message}
                    <ActionButton type="main" color="green" title="Take me home" onClick={
                        handleBack
                    } />
                </h2>
            </div>
        </section>
    );
};

export default LogoutPage;