import React from 'react';
import { FiSearch, FiUser, FiBell, FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <FiMenu size={20} />
        </button>
        <h1 className="logo">Dashboard</h1>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="icon-button" onClick={toggleTheme}>
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button className="icon-button">
          <FiBell size={20} />
        </button>
        <div className="user-profile">
          <FiUser size={20} />
          <span>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;