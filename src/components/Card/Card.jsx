import React from 'react';
import './Card.css';
import UrgentIcon from '../icons_FEtask/SVG - Urgent Priority colour.svg';
import HighPriorityIcon from '../icons_FEtask/Img - High Priority.svg';
import MediumPriorityIcon from '../icons_FEtask/Img - Medium Priority.svg';
import LowPriorityIcon from '../icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from '../icons_FEtask/No-priority.svg';

const Card = ({ ticket, user }) => {
  const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return <img src={UrgentIcon} alt="Urgent Priority" className="w-6 h-6" />;
    case 3:
      return <img src={HighPriorityIcon} alt="High Priority" className="w-6 h-6" />;
    case 2:
      return <img src={MediumPriorityIcon} alt="Medium Priority" className="w-6 h-6" />;
    case 1:
      return <img src={LowPriorityIcon} alt="Low Priority" className="w-6 h-6" />;
    default:
      return <img src={NoPriorityIcon} alt="No Priority" className="w-6 h-6" />;
  }
};

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="priority-icon">{getPriorityIcon(ticket.priority)}</span>
      </div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-footer">
        <div className="tag">{ticket.tag}</div>
        {user && (
          <div className="user-info">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-availability">
              {user.available ? '🟢' : '⚪'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;