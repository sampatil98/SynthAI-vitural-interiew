import React, { useState, useRef } from "react";
import Interview from "./Interview";
import Home from "./Home";
import logo from "./logo-png.png"

const Sidebar = () => {
  // ... (previous code remains the same)
  


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-700 text-white w-1/5 p-12">
        <img src={logo} alt=""/>
        <br />
        <ul className="space-y-5">
          <li className='text-blue'>Progress Tracking</li>
          <li className='text-blue'>Interview Practice</li>
          <li className='text-blue'>Elevating Your Skills</li>
        </ul>
      </div>

      {/* Interview Container */}
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center w-4/5 p-8">
        {/* ... (Rest of the component) */}
        {/* ... (Speech Text Container, Input Box, Buttons, etc.) */}
        {/* <Interview /> */}
        <Home/>
      </div>
    </div>
  );
};

export default Sidebar;
