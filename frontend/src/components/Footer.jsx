import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Footer({ darkMode }) {
  const strings = {
    copyright: "© 2024 KaamMitra. All rights reserved.",
    services_title: "Services",
    quick_links_title: "Quick Links",
    contact_us_title: "Contact Us",
    about: "About Us",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    more_services: "More Services",
  };

  return (
    <footer className="bg-blue-100 text-gray-700 dark:bg-gray-900 dark:text-gray-400 py-12 transition-colors duration-300">
      <div className="container mx-auto px-6">

        {/*  MOBILE VIEW  */}
        <div className="md:hidden space-y-10">

          {/* Logo + Social Icons */}
          <div className="flex flex-row justify-between items-center text-center">
            <Link to="/" className="mb-4">
              <img
                src="/logo.png"
                alt="KaamMitra"
                className="h-10 w-auto object-contain transition duration-300 dark:brightness-0 dark:invert"
              />


            </Link>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-blue-600" />
              <Instagram className="cursor-pointer hover:text-pink-500" />
              <Twitter className="cursor-pointer hover:text-blue-400" />
              <Linkedin className="cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          {/* Services + Quick Links */}
          <div className="grid grid-cols-2 text-center">

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-3">
                {strings.services_title}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/service/Plumbing">Plumbing</Link></li>
                <li><Link to="/service/Electrical">Electrical</Link></li>
                <li><Link to="/service/Cleaning">Cleaning</Link></li>
                <li><Link to="/moreservices">{strings.more_services}</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-3">
                {strings.quick_links_title}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about">{strings.about}</Link></li>
                <li><Link to="/contact">{strings.contact}</Link></li>
                <li><Link to="/privacy">{strings.privacy}</Link></li>
                <li><Link to="/terms">{strings.terms}</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-4">
              {strings.contact_us_title}
            </h3>

            <div className="space-y-2 text-sm flex flex-col items-center">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Patna, Bihar, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@kaammitra.in</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm">
            {strings.copyright}
          </p>
        </div>

        {/* DESKTOP VIEW  */}
        <div className="hidden md:grid grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">

              <img
                src="/logo.png"
                alt="KaamMitra"
                className="h-10 w-auto object-contain transition duration-300 dark:brightness-0 dark:invert"
              />

            </Link>
            {/* Social Icons */}
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-blue-600" />
              <Instagram className="cursor-pointer hover:text-pink-500" />
              <Twitter className="cursor-pointer hover:text-blue-400" />
              <Linkedin className="cursor-pointer hover:text-blue-700" />
            </div>
            <p className="text-sm">{strings.copyright}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-4">
              {strings.services_title}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/service/Plumbing">Plumbing</Link></li>
              <li><Link to="/service/Electrical">Electrical</Link></li>
              <li><Link to="/service/Cleaning">Cleaning</Link></li>
              <li><Link to="/moreservices">{strings.more_services}</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-4">
              {strings.quick_links_title}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about">{strings.about}</Link></li>
              <li><Link to="/contact">{strings.contact}</Link></li>
              <li><Link to="/privacy">{strings.privacy}</Link></li>
              <li><Link to="/terms">{strings.terms}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-4">
              {strings.contact_us_title}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Patna, Bihar, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@kaammitra.in</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
