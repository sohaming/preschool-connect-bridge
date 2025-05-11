
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-theme-300 text-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-purple-300">Poppins</h3>
            <p className="text-muted-foreground">
              Bridging the gap between low-income families and 
              quality affordable education for a brighter future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3 text-purple-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-purple-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-purple-300 transition-colors">About</Link></li>
              <li><Link to="/parent-dashboard" className="text-muted-foreground hover:text-purple-300 transition-colors">Find Schools</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-purple-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3 text-purple-300">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p>Email: info@poppins.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Education Lane, Learning City</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-theme-100 mt-8 pt-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Poppins. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
