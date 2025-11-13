import React from 'react';
import style from './drop-files-box.module.css';

interface DropFilesBoxProps {

}

const DropFilesBox: React.FC<DropFilesBoxProps> = ({}) => {
    return (
        <div className={style['drop-files-box']}>
            DropFilesBox
        </div>
    );
};

export default DropFilesBox;