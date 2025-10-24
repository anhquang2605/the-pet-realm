import React from 'react';
import style from './../page-styles/logout.module.css';

interface LogoutPageProps {

}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
    return (
        <div className={style['logout-page']}>
            LogoutPage
        </div>
    );
};

export default LogoutPage;