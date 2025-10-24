import React from 'react';
import style from './../page-styles/logout.module.css';

interface LogoutPageProps {

}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
    return (
        <section className={style['logout-page']}>
            LogoutPage
        </section>
    );
};

export default LogoutPage;