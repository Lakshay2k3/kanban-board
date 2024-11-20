import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'status'
  );
  const [sortOption, setSortOption] = useState(
    localStorage.getItem('sortOption') || 'priority'
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDisplayOptions = (grouping, sorting) => {
    setGroupingOption(grouping);
    setSortOption(sorting);
    localStorage.setItem('groupingOption', grouping);
    localStorage.setItem('sortOption', sorting);
  };

  return (
    <div className="app">
      <Board 
        tickets={tickets}
        users={users}
        grouping={groupingOption}
        sorting={sortOption}
        onDisplayOptionChange={handleDisplayOptions}
        currentGrouping={groupingOption}
        currentSorting={sortOption}
      />
    </div>
  );
}

export default App;