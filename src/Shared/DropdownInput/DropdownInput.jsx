/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

function DropdownInput({ register, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    register(name, { value: option }); // Register the selected option
  };

  return (
    <div className="relative inline-block">
      <input
        type="text"
        value={selectedOption}
        onChange={() => { }}
        onClick={toggleDropdown}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Select an option"
        readOnly
      />
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => selectOption(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownInput;
