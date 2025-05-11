
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">PreSchool Connect</h3>
            <p className="text-blue-100">
              Bridging the communication gap between parents and preschools for
              a better early education experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white">About</Link></li>
              <li><Link to="/features" className="text-blue-100 hover:text-white">Features</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3">Contact</h4>
            <address className="not-italic text-blue-100">
              <p>Email: info@preschoolconnect.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Education Lane, Learning City</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-blue-500 mt-8 pt-4 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} PreSchool Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
