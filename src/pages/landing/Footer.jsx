import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, Twitter, Linkedin, Mail, 
  MapPin, Phone, ArrowUpRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Updates', href: '/updates', badge: 'New' },
      { name: 'Beta', href: '/beta', badge: 'Coming Soon' }
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers', badge: 'We\'re hiring!' },
      { name: 'Press', href: '/press' }
    ],
    Resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Contact', href: '/contact' }
    ],
 
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@notetree.com' },
    { icon: MapPin, text: 'San Francisco, CA' },
    { icon: Phone, text: '+1 (555) 123-4567' }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo and Contact */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 
                           text-transparent bg-clip-text">NoteTree</h3>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Organize your thoughts beautifully with our modern note-taking solution.
            </p>
            <div className="mt-6 space-y-3">
              {contactInfo.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center text-sm text-gray-400 hover:text-white 
                                       transition-colors duration-200">
                  <Icon className="w-4 h-4 mr-2" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-gray-400 hover:text-white 
                               transition-colors duration-200"
                    >
                      <span className="text-sm">{link.name}</span>
                      {link.badge && (
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full 
                                     bg-blue-500/10 text-blue-400">
                          {link.badge}
                        </span>
                      )}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 
                                           group-hover:opacity-100 group-hover:translate-y-0 
                                           transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} NoteTree. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                           transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-400 hover:text-white 
                                transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 