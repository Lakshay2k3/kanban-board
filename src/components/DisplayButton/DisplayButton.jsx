import React, { useState } from 'react';
import './DisplayButton.css';
import DisplayIcon from '../icons_FEtask/Display.svg';

const DisplayButton = ({ grouping, sorting, onGroupingChange, onSortingChange, displayIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-button-container">
      <button 
        className="display-button"
        onClick={() => setIsOpen(!isOpen)}
      >
      <img src={displayIcon} alt="Display" className="w-6 h-6 mr-2" />
        Display {isOpen ? '▼' : '▲'}
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label>Grouping:</label>
            <select 
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div className="dropdown-item">
            <label>Sorting:</label>
            <select 
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayButton;