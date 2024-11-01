import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const companies = [
  { 
    name: 'Google', 
    logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg'
  },
  { 
    name: 'Microsoft', 
    logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg'
  },
  { 
    name: 'Apple', 
    logo: 'https://www.vectorlogo.zone/logos/apple/apple-ar21.svg'
  },
  { 
    name: 'Meta', 
    logo: 'https://www.vectorlogo.zone/logos/meta/meta-ar21.svg'
  },
  { 
    name: 'Amazon', 
    logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg'
  },
  { 
    name: 'Netflix', 
    logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg'
  }
];

export const TrustedBy = () => (
  <div className="relative py-16 bg-black overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
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
          Trusted by industry leaders
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6"
      >
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 flex justify-center items-center grayscale opacity-50 
                     hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <img
              className="h-8"
              src={company.logo}
              alt={company.name}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
); 