import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../page-styles/login.module.css'
import jwt from 'jsonwebtoken';
import ActionButton from '../../components/universals/buttons/action-button/action-button';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('Redirecting...');
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();
  const updateCountdown = (seconds: number) => {
    setPopupMessage(`Redirecting in ${seconds} seconds...`);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      setShowPopup(true);

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
      setPopupMessage(data.message || 'Login failed');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className={"flex items-center justify-center " + " " + styles.login}>
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

        {showPopup && (
          <div className={"bg-gray-600/50 flex w-screen h-screen  p-4 rounded-lg  justify-center items-center " + " " + styles.popup}>
            <div className="px-6 py-4 rounded-xl shadow-md">
              <p className="">{popupMessage}</p>
              <ActionButton type="main" href="/admin" title="Take me now!" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
