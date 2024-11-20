export const getPriorityDetails = (priority) => {
  const PRIORITY_MAP = {
    4: { label: 'Urgent', icon: 'error', colorClass: 'text-red-500' },
    3: { label: 'High', icon: 'priority_high', colorClass: 'text-orange-500' },
    2: { label: 'Medium', icon: 'remove_moderator', colorClass: 'text-yellow-500' },
    1: { label: 'Low', icon: 'low_priority', colorClass: 'text-blue-500' },
    0: { label: 'No priority', icon: 'more_horiz', colorClass: 'text-gray-500' }
  };
  return PRIORITY_MAP[priority];
};

export const groupTickets = (tickets, users, grouping, sorting) => {
  let grouped = {};

  if (grouping === 'status') {
    grouped = tickets.reduce((acc, ticket) => {
      const status = ticket.status || 'No Status';
      if (!acc[status]) acc[status] = [];
      acc[status].push(ticket);
      return acc;
    }, {});
  } else if (grouping === 'user') {
    grouped = tickets.reduce((acc, ticket) => {
      const user = users.find(u => u.id === ticket.userId)?.name || 'Unassigned';
      if (!acc[user]) acc[user] = [];
      acc[user].push(ticket);
      return acc;
    }, {});
  } else if (grouping === 'priority') {
    grouped = tickets.reduce((acc, ticket) => {
      const priority = getPriorityDetails(ticket.priority).label;
      if (!acc[priority]) acc[priority] = [];
      acc[priority].push(ticket);
      return acc;
    }, {});
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