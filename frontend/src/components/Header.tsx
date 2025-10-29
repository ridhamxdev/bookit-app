import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/highway-delite-logo.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img 
              src={logo} 
              alt="Highway Delite" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences"
              className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4D03F] transition-all duration-200 hover:bg-gray-50"
            />
            <button
              type="submit"
              className="btn-primary"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

