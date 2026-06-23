import React, {useState, useEffect} from 'react';
import styles from './payment-details.module.css';
import { useOrderContext } from './../../../useOrderContext';
import { Payments } from '../../../../../../types/payment';
import ActionButton from '../../../../../universals/buttons/action-button/action-button';


type Errors = Partial<Record<keyof Payments, string>>;

const initialForm: Payments = {
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    billingAddress1: '',
    billingAddress2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
};

export default function PaymentForm() {
    const [isDirty, setIsDirty] = useState(false);
    const [formData, setFormData] = useState<Payments>(initialForm);
    const [errors, setErrors] = useState<Errors>({});
    const { payment, setPayment, currentFormStage, setCurrentFormStage } = useOrderContext();
    const validateField = (
        name: keyof Payments,
        value: string
    ): string => {
        switch (name) {
            case 'cardNumber':
                if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) {
                    return 'Card number must be 16 digits.';
                }
                return '';

            case 'cardHolderName':
                if (value.trim().length < 2) {
                    return 'Card holder name is required.';
                }
                return '';

            case 'expiryDate':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                    return 'Expiry date must be in MM/YY format.';
                }
                return '';

            case 'cvv':
                if (!/^\d{3,4}$/.test(value)) {
                    return 'CVV must be 3 or 4 digits.';
                }
                return '';

            case 'billingAddress1':
                if (value.trim().length < 5) {
                    return 'Billing address is required.';
                }
                return '';

            case 'city':
                if (!value.trim()) {
                    return 'City is required.';
                }
                return '';

            case 'state':
                console.log(value);
                if (!value.trim()) {
                    return 'State is required.';
                }
                return '';

            case 'postalCode':
                if (!/^[A-Za-z0-9 -]{4,10}$/.test(value)) {
                    return 'Enter a valid postal code.';
                }
                return '';

            case 'country':
                if (!value.trim()) {
                    return 'Country is required.';
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
        if(!isDirty) setIsDirty(true);
        setPayment((prev) => ({
            ...prev,
            [name]: value,
        }));

        const error = validateField(
            name as keyof Payments,
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
            Object.keys(formData) as Array<keyof Payments>
        ).forEach((key) => {
            // Skip optional field
            if (key === 'billingAddress2') return;

            const error = validateField(key, payment[key] || '');

            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        setCurrentFormStage(2);       
    };

    const renderInput = (
        label: string,
        name: keyof Payments,
        placeholder?: string,
        type: string = 'text'
    ) => {
        if (currentFormStage !== 1) {
            return renderResult(label, payment[name] || '');
        } else {
            return renderField(label, name, placeholder, type);
        }
    }
    const renderField = (label: string, name: keyof Payments, placeholder?: string, type: string = 'text') => (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={payment[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${styles.input} ${
                    errors[name] ? styles.inputError : ''
                }`}
            />

            {errors[name] && (
                <p className={styles.errorText}>
                    {errors[name]}
                </p>
            )}
        </div>
    )
    const renderResult = (label: string, value: string) => (
        <div className={styles.resultGroup}>
            <span className={styles.label}>
                {label}:
            </span>
            <span className={styles.value}>
                {value || 'N/A'}
            </span>
        </div>
    )

    return (
        <>
            {isDirty && currentFormStage !== 1 && <ActionButton
                type="edit"
                title="Edit"
                color="goldenrod"
                onClick={() => setCurrentFormStage(1)}
            />}
            <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            >
                {renderInput(
                    'Card Number',
                    'cardNumber',
                    '1234123412341234',
                    'number'
                )}

                {renderInput(
                    'Card Holder Name',
                    'cardHolderName',
                    'John Doe'
                )}

                {renderInput(
                    'Expiry Date',
                    'expiryDate',
                    'MM/YY',
                )}

                {renderInput('CVV', 'cvv', '123', 'number')}

                {renderInput(
                    'Billing Address 1',
                    'billingAddress1'
                )}

                {renderInput(
                    'Billing Address 2',
                    'billingAddress2'
                )}

                {renderInput('City', 'city')}

                {renderInput('State', 'state')}

                {renderInput(
                    'Postal Code',
                    'postalCode'
                )}

                {renderInput('Country', 'country')}

                {currentFormStage === 1 && <ActionButton 
                    title="Confirm Payment"
                    type="submit"
                    color="green"
                    isSubmit={true}

                />}
            </form>
        </>

    );
}