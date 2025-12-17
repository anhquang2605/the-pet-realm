import React from 'react';
import style from './reveal-box.module.css';

interface RevealBoxProps {
    children: React.ReactNode;
    hasCustomeRevealButton?: boolean;
}

const RevealBox: React.FC<RevealBoxProps> = ({children , hasCustomeRevealButton = false}) => {
    const [isRevealed, setIsRevealed] = React.useState(false);
    return (
        <>

            <div className={style['reveal-box']}>
                {
                    children
                }
            </div>
        </>
    );
};

export default RevealBox;