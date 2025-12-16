//generate an account page for next.js with getStaticProps
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { AdminAccount } from '../../../types/admin';
import  styles  from  '../../page-styles/admin-account.module.css'
import ActionButton from '../../../components/universals/buttons/action-button/action-button';
interface AccountPageProps {
    account: AdminAccount;
}

const getStaticProps: GetStaticProps<AccountPageProps> = async () => {
    // Simulate an API call to fetch the account data
    const response = await fetch('https://api.example.com/account');
    const account: AdminAccount = await response.json();

    return {
        props: {
            account,
        },
    };
};
const getAccount = async (email: string) => {
    const params = new URLSearchParams({ email });
    const response = await fetch(`/api/admin/info?${params.toString()}`);
    const account: AdminAccount = await response.json();
    return account;
}
const checkAdminAuthorization = async (email: string) => {
    
}
const AccountPage: React.FC<AccountPageProps> = ({ account }) => {
    const [accountData, setAccountData] = useState<AdminAccount | null>(null);
    useEffect(() => {
        setAccountData(account);
    }, [account]);  // Update accountData when account prop changes
    return (
       <section className={styles.account}>
        <h1>Admin Account</h1>
        {/* with account data, allow user to view it and edit the details */}
        {accountData ? (
            <div>
                <p><strong>Name:</strong> {accountData.name}</p>
                <p><strong>Email:</strong> {accountData.email}</p>
                {/* Add more fields as necessary */}
                <ActionButton type={
                    'link'
                } title="Reset Password" onClick={() => {/* Handle edit action */}} />
            </div>
        ) : (
            <p>Loading account data...</p>
        )}
       </section>
    );
};