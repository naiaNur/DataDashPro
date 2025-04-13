import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <svg className="h-8 w-auto text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M11 9a2 2 0 100 4 2 2 0 000-4zm-4-3a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 12a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm9-6a3 3 0 11-6 0 3 3 0 016 0z" fill="white"></path>
              </svg>
              <span className="ml-2 text-xl font-semibold text-white">DataCanvas</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Transform your data into actionable insights with our powerful analytics platform.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#features" className="text-base text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#solutions" className="text-base text-gray-400 hover:text-white">Solutions</a></li>
              <li><a href="#pricing" className="text-base text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Guides</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">API Reference</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#contact" className="text-base text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} DataCanvas, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
