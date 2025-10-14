import { useState } from 'react';
import { useRouter } from 'next/router';
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
      // save token to localStorage
      localStorage.setItem('admin_token', jwt.sign(token,  JWT_SECRET));

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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Sign In
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white px-6 py-4 rounded-xl shadow-md">
              <p className="text-gray-700">{popupMessage}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
