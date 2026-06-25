import React, {useState, useEffect} from 'react';
import style from './fields-displayer.module.css';

type FieldsDisplayerProps = Record<string, never>;

const FieldsDisplayer: React.FC<FieldsDisplayerProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['fields-displayer']}>
            FieldsDisplayer
        </div>
    );
};

export default FieldsDisplayer;