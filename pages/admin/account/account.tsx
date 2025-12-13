//generate an account page for next.js with getStaticProps
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { AdminAccount } from '../../../types/admin';

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
const AccountPage: React.FC<AccountPageProps> = ({ account }) => {
    const [accountData, setAccountData] = useState<AdminAccount | null>(null);
    useEffect(() => {
        setAccountData(account);
    }, [account]);  // Update accountData when account prop changes
    return (
        <div>
        </div>
    );
};