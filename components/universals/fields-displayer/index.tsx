import React, {useState, useEffect} from 'react';
import style from './fields-displayer.module.css';

//generic component to display fields and their values in a structured manner
type FieldsDisplayerProps<T> = {
    items: Partial<T>[];
};

const FieldsDisplayer= <T,>({ items }: FieldsDisplayerProps<T>) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['fields-displayer']}>
            {items.map((item, index) => (
                <div key={index} className={style['field-item']}>
                    {Object.entries(item).map(([key, value]) => (
                        <div key={key} className={style['field']}>    
                            <span className={style['field-label']}>{key}:</span>
                            <span className={style['field-value']}>{value as string}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FieldsDisplayer;