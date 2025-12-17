import React from 'react';
import style from './reveal-box.module.css';

interface RevealBoxProps {
    children: React.ReactNode;
}

const RevealBox: React.FC<RevealBoxProps> = ({}) => {
    const [isRevealed, setIsRevealed] = React.useState(false);
    return (
        <div className={style['reveal-box']}>
            RevealBox
        </div>
    );
};

export default RevealBox;