import React, {useState, useEffect, useMemo} from 'react';
import styles from './payment-details.module.css';
import { useOrderContext } from './../../../useOrderContext';
import { Payments } from '../../../../../../types/payment';
import ActionButton from '../../../../../universals/buttons/action-button/action-button';
import { loadStripe } from '@stripe/stripe-js';
import {Elements as CheckoutElementsProvider, useElements, useStripe} from '@stripe/react-stripe-js';
//import { EmbeddedCheckoutProvider as CheckoutElementsProvider } from '@stripe/react-stripe-js';
import { getFromPOSTAPI } from '../../../../../../libs/api-interactions';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
import {
    PaymentElement,
} from "@stripe/react-stripe-js";


type Errors = Partial<Record<keyof Payments, string>>;

const TESTING_CARD = {
    number: "4242 4242 4242 4242",
    exp: "12/34",
    cvc: "123",
    ZIP: "95112"
}

export default function PaymentForm() {
    const [clientSecret, setClientSecret] = useState("");
    const [isDirty, setIsDirty] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const { paymentMethod, setPaymentMethod, order, currentFormStage, setCurrentFormStage, tax } = useOrderContext(); 
    /* const validateField = (
        name: keyof Payments,
        value: string
    ): string => {
        switch (name) {
            case 'cardNumbefr':
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
 */
    /* const handleChange = (
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
 */
    /* const validateForm = (): boolean => {
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
    }; */
/*     const handleCardPayment = async () => {
        if (!stripe || !elements) return;

        const card = elements.getElement(PaymentElement);


    } */
    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
    
        //if (!validateForm()) return;
        if(isEditing) {
            setIsEditing(false);    
        } 
        setCurrentFormStage(3);
    };
    const handleEdit = () => {
        setCurrentFormStage(2);
        setIsEditing(true);
    }

    const renderInput = (
        label: string,
        name: keyof Payments,
        placeholder?: string,
        type: string = 'text'
    ) => {
        if (currentFormStage !== 1) {
            //return renderResult(label, payment[name] || '');
        } else {
            return renderField(label, name, placeholder, type);
        }
    }
    const renderField = (label: string, name: keyof Payments, placeholder?: string, type: string = 'text') => (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label}
            </label>

            {/* <input
                type={type}
                name={name}
                value={payment[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${styles.input} ${
                    errors[name] ? styles.inputError : ''
                }`}
            />
 */}
            {errors[name] && (
                <p className={styles.errorText}>
                    {errors[name]}
                </p>
            )}
        </div>
    )
    const renderResult = (label: string, value: string) => (
        <div className={styles.formGroup}>
            <span className={styles.label}>
                {label}:
            </span>
            <span className={styles.value}>
                {value || 'N/A'}
            </span>
        </div>
    )
    async function loadClientSecret() {
        if (!order) return;
        const res = await getFromPOSTAPI('/stripe/create-payment-intent', { orderId: order._id, tax }); // Replace with your actual API endpoint and parameters
        setClientSecret(res.clientSecret);
    }
    //payment element styles
    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorBackground: '#1e2939',
            colorText: '#30313d',
            colorBorder: 'lightgray',
            fontFamily: 'Montserrat, sans-serif',
            labelColorText: 'white',
            colorTextPlaceholder: '#777',
            tabIconMoreHoverColor: 'white',
            accordionItemLabelColorText: 'white',
            accordionItemLabelSelectedColorText: 'white',
            colorTextSecondary: 'white',
            buttonColorText: 'white',
            inputSelectOptionTextColor: 'white',
        },
        rules: {
            '.Dropdown':{
                color: 'white',
            }
        },
    }
    useEffect(() => {
        if (!tax) return;
        loadClientSecret();
    }, [tax]);
    if (!clientSecret) {
        return <div>Please enter shipping informaton to proceed with payment</div>;
    }
    return (
        <>
         <CheckoutElementsProvider stripe={stripePromise} options={{clientSecret, appearance}}>
            {isDirty && currentFormStage !== 1 && <ActionButton
                type="edit"
                title="Edit"
                color="goldenrod"
                classNames={styles.editButton}
                onClick={handleEdit}
            />}
            <PaymentWrapper />
            
 {/*            <form
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
            </form> */}
        </CheckoutElementsProvider>
        </>

    );
}

function PaymentWrapper() {
    const stripe = useStripe();
    const elements = useElements();
    const { currentFormStage, setCurrentFormStage } = useOrderContext();
    const handleSubmit = async(e?: React.FormEvent) => {
        e?.preventDefault();
        setCurrentFormStage(2);
        if (!stripe || !elements) return;
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // no return_url
            },
            redirect: "if_required",
        });

        if (result.error) {
            console.error(result.error.message);
        }
    }
    return (
        <div className={styles.paymentWrapper}>
            <PaymentElement />
            {currentFormStage === 1 && <ActionButton 
                title="Confirm Payment"
                type="submit"
                color="green"
                classNames={styles.confirmButton}
                onClick={handleSubmit}
            />}
        </div>
    );

}