import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, ArrowLeft, Loader2, Check, AlertCircle } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));

    if (e.target.id === 'password') {
      // Simple password strength calculation
      let strength = 0;
      if (e.target.value.length >= 8) strength += 25;
      if (e.target.value.match(/[A-Z]/)) strength += 25;
      if (e.target.value.match(/[0-9]/)) strength += 25;
      if (e.target.value.match(/[^A-Za-z0-9]/)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 
                           text-transparent bg-clip-text">Create your account</h2>
              <p className="mt-2 text-gray-400">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
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

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
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
                  placeholder="Create a strong password"
                />
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${getStrengthColor()}`}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-400 flex items-center">
                      {passwordStrength === 100 ? (
                        <>
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Strong password
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-yellow-500 mr-1" />
                          Include uppercase, numbers & special characters
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Submit Button */}
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
                    Create Account
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

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/auth/login" 
            className="font-medium text-blue-400 hover:text-blue-300 
                     transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}; 