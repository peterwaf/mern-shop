/* eslint-disable react/prop-types */
import { useState } from "react";
import { Menu, X, Home, Info, ShoppingBag, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import TopMenu from "./TopMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
       {/* Top Menu */}
      
       <TopMenu />
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">ShopEasy</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<Home size={20} />} label="Home" />
            <NavLink to="/about" icon={<Info size={20} />} label="About" />
            <NavLink to="/products/category/all" icon={<ShoppingBag size={20} />} label="Products" />
            <NavLink to="/contact" icon={<Mail size={20} />} label="Contact Us" />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <NavLink to="/" icon={<Home size={20} />} label="Home" onClick={() => setIsOpen(false)} />
          <NavLink to="/about" icon={<Info size={20} />} label="About" onClick={() => setIsOpen(false)} />
          <NavLink to="/products/category/all" icon={<ShoppingBag size={20} />} label="Products" onClick={() => setIsOpen(false)} />
          <NavLink to="/contact" icon={<Mail size={20} />} label="Contact Us" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label, onClick }) => (
  <Link to={to} onClick={onClick} className="flex items-center pl-4 py-2 text-gray-700 hover:text-blue-500">
    {icon} <span className="ml-2">{label}</span>
  </Link>
);

export default Navbar;
