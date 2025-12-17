import React from 'react';
import style from './reveal-box.module.css';

interface RevealBoxProps {

}

const RevealBox: React.FC<RevealBoxProps> = ({}) => {
    return (
        <div className={style['reveal-box']}>
            RevealBox
        </div>
    );
};

export default RevealBox;