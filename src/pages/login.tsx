import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Username/Email dan Password harus diisi');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      const loginEvent = new Event('userLogin');
      window.dispatchEvent(loginEvent);
      
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Username/Email atau Password tidak valid');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      {/* Login Form Section (Left) */}
      <div className="w-full md:w-5/12 bg-[#1E41A5] dark:bg-[#101B34] flex flex-col justify-between p-20">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-[#4a9fff]">SNBT</span>
              <span className="text-[#ffffff]">In</span>
            </h1>
            <h6 className="text-white mb-2">
              #1 Platform Persiapan SNBT di Indonesia
            </h6>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember Me
                </label>
              </div>
              <div>
                <Link href="/forgot-password" className="text-sm text-[#4a9fff] hover:underline">
                  Forgot Password
                </Link>
              </div>
            </div>
            <p className="text-center text-white mt-4">
              Dont have an account?
              <Link href="/signup" className="text-[#4a9fff] hover:underline">
                Register here
              </Link>
            </p>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md bg-[#101B34] dark:bg-[#1E41A5] text-[#ffffff] dark:text-[#ffffff] font-medium transition-colors duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
