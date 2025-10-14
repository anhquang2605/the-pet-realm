import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../page-styles/login.module.css'
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

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
      const secret = jwt.sign(token, JWT_SECRET);
      // save token to localStorage
      localStorage.setItem('admin_secret', jwt.sign(token,  secret));
      localStorage.setItem('admin_token', token);
      setPopupMessage('Admin login successful!');
      setShowPopup(true);

      // Redirect after a short delay
      setTimeout(() => {
        setShowPopup(false);
        router.push('/admin');
      }, 1500);
    } else {
      setPopupMessage(data.message || 'Login failed');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className={"flex h-screen items-center justify-center backdrop-blur-lg" + " " + styles.login}>
      <form
        onSubmit={handleSubmit}
        className=" "
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
        <button
          type="submit"
          className=""
        >
          Sign In
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="px-6 py-4 rounded-xl shadow-md">
              <p className="">{popupMessage}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
