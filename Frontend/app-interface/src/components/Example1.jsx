import React, { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
//

export default function Example1() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    // You can perform any other actions based on the selectedOption here
  };
  console.log(selectedOption);
  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-3xl font-bold  text-gray-900">
        Select Your Role from Here
      </h1>
      <select
        className="form-select px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        <option value="MERN">Option 1</option>
        <option value="JAVA">Option 2</option>
        <option value="NODE">Option 3</option>
      </select>
      <h4 className="text-xl font-bold text-gray-600">
        Selected Track:{" "}
        <span className="text-xl font-bold text-yelow-600">
          {selectedOption}
        </span>
      </h4>
      <span style={{ color: "blue" }}></span>
    </div>
  );
}
