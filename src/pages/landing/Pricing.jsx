import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    icon: Zap,
    features: [
      'Up to 100 notes',
      'Basic formatting',
      'Mobile app access',
      '2 GB storage',
      'Email support'
    ],
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    name: 'Pro',
    price: '12',
    description: 'Best for professionals',
    icon: Star,
    popular: true,
    features: [
      'Unlimited notes',
      'Advanced formatting',
      'Collaboration features',
      '20 GB storage',
      'Priority support',
      'Version history',
      'Custom templates'
    ],
    gradient: 'from-violet-500 to-purple-500',
    delay: 0.3
  },
  {
    name: 'Enterprise',
    price: '49',
    description: 'For large teams',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Admin controls',
      'API access',
      'Custom branding',
      'Dedicated support',
      'Advanced security',
      'Analytics dashboard'
    ],
    gradient: 'from-amber-500 to-orange-500',
    delay: 0.4
  }
];

const PricingCard = ({ plan }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: plan.delay }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} 
                    opacity-5 group-hover:opacity-10 blur-xl transition-all duration-300`} />
    <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 
                    shadow-xl hover:shadow-2xl transition-all duration-300">
      {plan.popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 px-3 py-2 
                       rounded-full bg-gradient-to-r from-violet-500 to-purple-500 
                       text-white text-sm font-medium text-center shadow-lg 
                       shadow-purple-500/30">
          Most Popular
        </div>
      )}

      <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-r ${plan.gradient}
                      flex items-center justify-center`}>
        <plan.icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
        <span className="ml-2 text-gray-500">/month</span>
      </div>
      <p className="mt-2 text-gray-500">{plan.description}</p>

      <Link
        to="/auth/register"
        className={`mt-8 block w-full px-6 py-3 rounded-xl text-center text-white 
                   bg-gradient-to-r ${plan.gradient} font-medium 
                   hover:shadow-lg hover:shadow-${plan.gradient.split('-')[2]}-500/30 
                   transition-all duration-300`}
      >
        Get Started
      </Link>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-600">
            <Check className="w-5 h-5 mr-3 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const Pricing = () => (
  <div className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full 
                   border border-gray-800 bg-gray-900/50 backdrop-blur-xl
                   text-sm font-medium text-gray-400 mb-8"
        >
          <Shield className="w-4 h-4 mr-2 text-blue-500" />
          Simple Pricing
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Choose your perfect plan
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Start with our free plan and upgrade as you grow. No hidden fees.
          Cancel anytime.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  </div>
); 