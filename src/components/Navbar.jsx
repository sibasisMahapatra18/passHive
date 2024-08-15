import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-cyan-700 text-white">
      <div className="flex justify-between items-center px-4 py-3 sm:py-5 h-14 max-w-7xl mx-auto">
        <div className="flex items-center text-xl sm:text-2xl font-bold">
          <img className="w-7 sm:w-9 mr-2" src="/icons/icons8-security-64.png" alt="" />
          <span className="text-black">&lt;</span>
          Pass
          <span className="text-black">Hive/&gt;</span>
        </div>
        <div>
          <a 
            href="https://github.com/your-repo-link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white flex bg-cyan-600 px-2 py-1 rounded-full justify-center items-center ring-1 ring-white text-sm sm:text-base"
          >
            <img className="invert w-5 sm:w-7 mr-1" src="/icons/github.png" alt="GitHub logo" />
            <span className="font-bold">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;