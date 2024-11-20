import React from 'react';
import Card from '../Card/Card';
import './Column.css';

const Column = ({ title, tickets, users }) => {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="ticket-count">{tickets.length}</span>
      </div>
      <div className="column-tickets">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id} 
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;