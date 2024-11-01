import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search notes..." }) => {
  return (
    <div className="relative">
      <Search 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  bg-white/90 backdrop-blur-sm"
      />
    </div>
  );
};

export default SearchBar; 