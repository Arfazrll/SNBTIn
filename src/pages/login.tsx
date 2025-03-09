import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';

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
      // Simulate API login call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example user data - in a real app, this would come from your API response
      const userData = {
        name: email.split('@')[0], // Simple example - extract name from email
        email: email,
        // You can add more user properties here
      };
      
      // Store user data in localStorage for persistence across page refreshes
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Trigger a custom event to notify other components (like Navbar) about login
      const loginEvent = new Event('userLogin');
      window.dispatchEvent(loginEvent);
      
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      setError('Username/Email atau Password tidak valid');
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
      <div className="w-full md:w-5/12 bg-[#102548] flex flex-col justify-between p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">

            <h1 className="text-4xl font-bold">
              <span className="text-[#4a9fff]">SNBT</span>
              <span className="text-[#ffffff]">In</span>
            </h1>

            <h1 className="text-4xl font-bold text-[#4a9fff]">SNBTIn</h1>

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
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md bg-white hover:bg-gray-100 text-[#102548] font-medium transition-colors duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-white">
            <p className="text-sm">
              Don&apos;t Have Account?{' '}
              <Link href="/register" className="text-[#4a9fff] hover:underline">
                Create one
              </Link>
            </p>
            
            <div className="mt-4 flex items-center justify-center">
              <div className="flex-grow h-px bg-gray-400/30"></div>
              <p className="mx-4 text-sm text-gray-400">Or</p>
              <div className="flex-grow h-px bg-gray-400/30"></div>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200">
                <Image src="/googlelogo.png" alt="Google" width={24} height={24} className="rounded-full" />
              </button>
              <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200">
                <Image src="/Facebook-logo.png" alt="Facebook" width={24} height={24} className="rounded-full" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-white/70">
          2025 SNBTIn Hak Cipta Dilindungi
        </div>
      </div>

      {/* Welcome Section (Right) */}
      <div className="hidden md:flex md:w-7/12 bg-cover bg-center relative" style={{ backgroundImage: "url('/login-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12">

          <h2 className="text-4xl font-bold">
              <span className="text-[#4a9fff]">SNBT</span>
              <span className="text-[#ffffff]">In</span>
            </h2>
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome To <span className="text-[#4a9fff]">SNBTIn</span>
          </h2>
          <p className="text-2xl text-white mb-2">
            Platform <span className="text-[#4a9fff]">E-Learning</span> terdepan yang 
            membantu siswa Indonesia mencapai impian mereka untuk 
            berkuliah di perguruan tinggi negeri terbaik.
          </p>
        </div>
        
        <div className="absolute bottom-4 right-4 flex space-x-6 text-white/80 text-sm">
          <Link href="/terms" className="hover:text-white">
            Syarat dan Ketentuan
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;