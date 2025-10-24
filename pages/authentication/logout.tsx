import React, { useEffect } from 'react';
import style from './../page-styles/logout.module.css';
import Image from 'next/image';
import ActionButton from '../../components/universals/buttons/action-button/action-button';

interface LogoutPageProps {
    
}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
    const [message, setMessage] = React.useState('Logging out...');
    const performLogout = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            setMessage('No active session found.');
            return;
        }
        const res = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
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
    
    useEffect(() => {
        
    },[])
    return (
        <section className={style['logout-page']}>
            <div className={style['logout-page__content']}>
                 <Image src="/asset/images/racoon.webp" alt="Racoon pet image from grow a garden game" width={150} height={150} />
                <h2 className="text-white text-2xl mt-1">
                    {message}
                    <ActionButton type="main" title="Back" onClick={} />
                </h2>
            </div>
        </section>
    );
};

export default LogoutPage;