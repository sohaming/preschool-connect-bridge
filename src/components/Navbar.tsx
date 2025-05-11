
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, User, Bookmark } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-purple-500 text-white p-2 rounded-lg">
            <Bookmark size={20} />
          </div>
          <span className="font-bold text-xl text-purple-700">Poppins</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/parent-dashboard" className={`nav-link ${isActive('/parent-dashboard') ? 'active' : ''}`}>
            Find Schools
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} />
              <span>Login</span>
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-purple-500 hover:bg-purple-600">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
