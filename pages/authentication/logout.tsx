import React from 'react';
import style from './../page-styles/logout.module.css';
import Image from 'next/image';

interface LogoutPageProps {

}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
    const [message, setMessage] = React.useState('Logging out...');
    return (
        <section className={style['logout-page']}>
            <Image src="/asset/images/racoon.webp" alt="Racoon pet image from grow a garden game" width={250} height={250} />
            <h2>
                {message}
            </h2>
        </section>
    );
};

export default LogoutPage;