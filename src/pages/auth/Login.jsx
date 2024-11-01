import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, Twitter, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await login(data.user);
        localStorage.setItem('session', JSON.stringify(data.session));
        const from = location.state?.from?.pathname || '/app';
        navigate(from, { replace: true });
        toast.success('Welcome back!');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      <div className="relative max-w-md w-full mx-4">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 
                   transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/10">
            {/* Logo or Brand */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 
                           text-transparent bg-clip-text">Welcome back</h2>
              <p className="mt-2 text-gray-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-white/5 border-white/10 rounded 
                             text-blue-500 focus:ring-blue-500/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-300">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/auth/forgot-password"
                  className="font-medium text-blue-400 hover:text-blue-300 
                           transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full flex items-center justify-center px-8 py-3 
                         rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 
                         text-white font-medium text-sm hover:from-blue-600 
                         hover:to-violet-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 disabled:opacity-50 
                         transition-all duration-200 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r 
                                  from-blue-500 to-violet-500 opacity-0 
                                  group-hover:opacity-20 transition-opacity duration-200" />
                  </>
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/50 text-gray-400 backdrop-blur-xl">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 
                                 rounded-xl bg-white/5 hover:bg-white/10 border 
                                 border-white/10 text-gray-300 transition-all duration-200">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </button>
                <button className="flex items-center justify-center px-4 py-3 
                                 rounded-xl bg-white/5 hover:bg-white/10 border 
                                 border-white/10 text-gray-300 transition-all duration-200">
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link 
            to="/auth/register" 
            className="font-medium text-blue-400 hover:text-blue-300 
                     transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}; 