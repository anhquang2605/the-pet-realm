import React, {useState, useEffect} from 'react';
import style from './fields-displayer.module.css';

//generic component to display fields and their values in a structured manner
type FieldsDisplayerProps<T> = {
    items: T[];
};

const FieldsDisplayer= <T,>({ items }: FieldsDisplayerProps<T>) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['fields-displayer']}>
            FieldsDisplayer
        </div>
    );
};

export default FieldsDisplayer;