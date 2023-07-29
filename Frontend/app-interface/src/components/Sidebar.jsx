import React, { useState, useRef } from "react";
import Interview from "./Interview";

const Sidebar = () => {
  // ... (previous code remains the same)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Sidebar</h1>
        <ul className="space-y-2">
          <li>Interviews</li>
          <li>Help</li>
          <li>Feedback</li>
        </ul>
      </div>

      {/* Interview Container */}
      <div className="flex flex-col items-center justify-center w-3/4 p-8">
        {/* ... (Rest of the component) */}
        {/* ... (Speech Text Container, Input Box, Buttons, etc.) */}
        <Interview />
      </div>
    </div>
  );
};

export default Sidebar;
