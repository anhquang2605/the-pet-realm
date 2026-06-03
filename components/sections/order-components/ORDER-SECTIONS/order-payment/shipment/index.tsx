import React, {useState, useEffect} from 'react';
import styles from './shipment.module.css';
import { Shipping } from '../../../../../../types/payment';
import { useOrderContext } from '../../../useOrderContext';



type Errors = Partial<Record<keyof Shipping, string>>;

const initialForm: Shipping = {
    recipientName: '',
    email: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
};

export default function ShippingForm() {
    const { shipping, setShipping, currentFormStage, setCurrentFormStage } = useOrderContext();
    const [formData, setFormData] =
        useState<Shipping>(initialForm);

    const [errors, setErrors] =
        useState<Errors>({});

    const validateField = (
        name: keyof Shipping,
        value: string
    ): string => {
        switch (name) {
            case 'recipientName':
                if (value.trim().length < 2) {
                    return 'Recipient name is required.';
                }
                return '';

            case 'email':
                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ) {
                    return 'Enter a valid email address.';
                }
                return '';

            case 'city':
                if (!value.trim()) {
                    return 'City is required.';
                }
                return '';

            case 'state':
                if (!value.trim()) {
                    return 'State is required.';
                }
                return '';

            case 'postalCode':
                if (
                    !/^[A-Za-z0-9 -]{4,10}$/.test(value)
                ) {
                    return 'Enter a valid postal code.';
                }
                return '';

            case 'country':
                if (!value.trim()) {
                    return 'Country is required.';
                }
                return '';

            case 'phoneNumber':
                if (
                    !/^\+?[0-9\s()-]{7,20}$/.test(value)
                ) {
                    return 'Enter a valid phone number.';
                }
                return '';

            default:
                return '';
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const error = validateField(
            name as keyof Shipping,
            value
        );

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};

        (
            Object.keys(formData) as Array<keyof Shipping>
        ).forEach((key) => {
            const error = validateField(
                key,
                formData[key]
            );

            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!validateForm()) return;

        console.log('Shipping Info:', formData);

        setShipping(formData);
        setCurrentFormStage(currentFormStage + 1);
    };

    const renderInput = (
        label: string,
        name: keyof Shipping,
        placeholder?: string,
        type: string = 'text'
    ) => (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${styles.input} ${
                    errors[name]
                        ? styles.inputError
                        : ''
                }`}
            />

            {errors[name] && (
                <p className={styles.errorText}>
                    {errors[name]}
                </p>
            )}
        </div>
    );
    const renderResult = (label: string, value: string) => (
        <div className={styles.resultGroup}>
            <span className={styles.resultLabel}>
                {label}:
            </span>
            <span className={styles.resultValue}>
                {value}
            </span>
        </div>
    )
    const resultViewToggler = (label: string, name: keyof Shipping, placeholder?: string, type: string = 'text') => {
        if (currentFormStage === 1) {
            return renderResult(label, shipping[name]);
        } else {
            return renderInput(label, name, placeholder, type);
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            {resultViewToggler(
                'Recipient Name',
                'recipientName',
                'John Doe'
            )}

            {resultViewToggler(
                'Email',
                'email',
                'john@example.com',
                'email'
            )}

            {resultViewToggler(
                'Phone Number',
                'phoneNumber',
                '(555) 555-5555'
            )}

            {resultViewToggler(
                'City',
                'city'
            )}

            {resultViewToggler(
                'State',
                'state'
            )}

            {resultViewToggler(
                'Postal Code',
                'postalCode'
            )}

            {resultViewToggler(
                'Country',
                'country'
            )}

            <button
                type="submit"
                className={styles.submitButton}
            >
                Submit Shipping Info
            </button>
        </form>
    );
}