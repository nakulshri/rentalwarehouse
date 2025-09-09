import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/');
    } catch (error: any) {
      setError('Failed to create an account: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white py-8 px-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <div className="text-center text-gray-500 mb-6 text-sm">
            Join us and start your journey
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-2 text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-indigo-[63585E] hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50 border-none"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          <div className="text-center mt-5">
            <Link
              to="/login"
              className="text-[63585E] hover:text-[63585E] text-sm font-medium transition"
            >
              Already have an account? <span className="underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
