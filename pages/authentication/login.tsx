import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../page-styles/login.module.css'
import ActionButton from '../../components/universals/buttons/action-button/action-button';
import Image from 'next/image';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('Working on it...');
  const [showPopup, setShowPopup] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const router = useRouter();
  const updateCountdown = (seconds: number) => {
    setPopupMessage(`Redirecting in ${seconds} seconds...`);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setLoginStatus('loading');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      const token = data.token;
      // save token to localStorage
      localStorage.setItem('admin_token', token);
      setPopupMessage('Admin login successful!');
      setLoginStatus('success');

      // Redirect after a short delay
      setTimeout(() => {
        setShowPopup(false);
        router.push('/admin');
      }, 3000);
      let countdown = 3;
      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          updateCountdown(countdown);
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    } else {
      setPopupMessage('Login failed, please try again.');
      setLoginStatus('error');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <>
    <div className={"flex items-center justify-center " + styles.login}>
      <form
        onSubmit={handleSubmit}
        className={
          "bg-gray-700/50  backdrop-blur-lg"
        }
      >
        <h2 className="">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ActionButton color={"deepskyblue"} type="main" title="Login" isSubmit={true}  />

        
      </form>

    </div>
          {showPopup && (
          <div className={"bg-gray-600/50 flex p-4 rounded-lg  justify-center items-center backdrop-blur-md" + " " + styles.popup}>
           
            <div className="bg-gray-800 text-slate-100 px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
               {
              loginStatus === 'loading' && <span>
                <Image src="/asset/images/processing.gif" width={100} height={100} alt="loading
                "/>
              </span>
              }
              <p className={styles.popupMessage}>{popupMessage}</p>
              <ActionButton type="main" color="tomato" href="/admin" title="Take me now!" />
            </div>
          </div>
        )}
    </>
  );
}
