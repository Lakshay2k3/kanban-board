import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import DisplayButton from '../DisplayButton/DisplayButton';
import './Board.css';
import DisplayIcon from '../icons_FEtask/Display.svg';

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  const getGroupedTickets = () => {
    let grouped = {};

    switch (grouping) {
      case 'status':
        grouped = tickets.reduce((acc, ticket) => {
          acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
          return acc;
        }, {});
        break;

      case 'user':
        grouped = tickets.reduce((acc, ticket) => {
          const user = users.find(u => u.id === ticket.userId);
          const userName = user ? user.name : 'Unassigned';
          acc[userName] = [...(acc[userName] || []), ticket];
          return acc;
        }, {});
        break;

      case 'priority':
        const priorityMap = {
          4: 'Urgent',
          3: 'High',
          2: 'Medium',
          1: 'Low',
          0: 'No priority'
        };
        grouped = tickets.reduce((acc, ticket) => {
          const priorityName = priorityMap[ticket.priority];
          acc[priorityName] = [...(acc[priorityName] || []), ticket];
          return acc;
        }, {});
        break;

      default:
        break;
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

   if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const groupedTickets = getGroupedTickets();

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="header-left">
          <h1>Kanban Board</h1>
        </div>
        <div className="header-right">
          <div className="board-stats">
            <p>Total Tickets: {tickets.length}</p>
            <p>Total Users: {users.length}</p>
          </div>
          <DisplayButton 
            grouping={grouping} 
            sorting={sorting}
            onGroupingChange={handleGroupingChange}
            onSortingChange={handleSortingChange}
            displayIcon={DisplayIcon}
          />
        </div>
      </div>
      <div className="board-columns">
        {Object.entries(groupedTickets).map(([columnName, columnTickets]) => (
          <Column
            key={columnName}
            title={columnName}
            tickets={columnTickets}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;