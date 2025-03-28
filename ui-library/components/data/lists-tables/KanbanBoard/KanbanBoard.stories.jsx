import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';

export default {
  title: "Data/Lists & Tables/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Sample data for basic board
const sampleColumns = [
  {
    id: 'todo',
    title: "To Do",
    cards: [
      {
        id: '1',
        title: "Market Research",
        description: 'Analyze top 5 competitors in the HVAC market',
        tags: ['research', 'marketing'],
        dueDate: '2025-04-10',
      },
      {
        id: '2',
        title: "Design Updates",
        description: 'Update color palette and typography',
        tags: ['design', 'UI'],
        dueDate: '2025-04-15',
      },
    ],
  },
  {
    id: 'in-progress',
    title: "In Progress",
    cards: [
      {
        id: '3',
        title: "Survey Analysis",
        description: 'Review surveys from Q1 and compile insights',
        assignee: 'Sarah Johnson',
        tags: ['feedback', 'analytics'],
        dueDate: '2025-04-05',
      },
    ],
  },
  {
    id: 'review',
    title: "Review",
    cards: [
      {
        id: '4',
        title: "Homepage Layout",
        description: 'Finalize new homepage layout',
        assignee: 'Michael Chen',
        tags: ['design', 'homepage'],
        dueDate: '2025-04-03',
      },
    ],
  },
  {
    id: 'done',
    title: "Done",
    cards: [
      {
        id: '5',
        title: "API Documentation",
        description: 'Write documentation for the new API endpoints',
        assignee: 'John Smith',
        tags: ['documentation', 'API'],
        dueDate: '2025-03-28',
      },
      {
        id: '6',
        title: "Budget Approval",
        description: 'Get Q2 budget approved by finance',
        assignee: 'Alex Taylor',
        tags: ['finance', 'admin'],
        dueDate: '2025-03-25',
      },
    ],
  },
];

export const Default = {
  args: {
    columns: sampleColumns,
  },
};

export const Interactive = () => {
  const [columns, setColumns] = useState(sampleColumns);
  
  // Handle card movement between columns
  const handleCardMove = (cardId, sourceColumnId, targetColumnId) => {
    const newColumns = [...columns];
    
    // Find the source and target columns
    const sourceColumnIndex = newColumns.findIndex(col => col.id === sourceColumnId);
    const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
    
    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;
    
    // Find the card to move
    const cardIndex = newColumns[sourceColumnIndex].cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;
    
    // Get the card and remove it from the source column
    const [card] = newColumns[sourceColumnIndex].cards.splice(cardIndex, 1);
    
    // Add the card to the target column
    newColumns[targetColumnIndex].cards.push(card);
    
    setColumns(newColumns);
    console.log(`Moved card ${cardId} from ${sourceColumnId} to ${targetColumnId}`);
  };
  
  // Handle adding a new card to a column
  const handleAddCard = (columnId) => {
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex(col => col.id === columnId);
    
    if (columnIndex === -1) return;
    
    // Generate a new ID
    const newId = `new-${Math.floor(Math.random() * 10000)}`;
    
    // Add a new card
    newColumns[columnIndex].cards.push({
      id: newId,
      title: `New Task ${newId}`,
      description: 'Click to edit task details',
      dueDate: new Date().toISOString().split('T')[0],
    });
    
    setColumns(newColumns);
    console.log(`Added new card to ${columnId}`);
  };
  
  // Handle deleting a card
  const handleDeleteCard = (cardId, columnId) => {
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex(col => col.id === columnId);
    
    if (columnIndex === -1) return;
    
    // Remove the card
    newColumns[columnIndex].cards = newColumns[columnIndex].cards.filter(card => card.id !== cardId);
    
    setColumns(newColumns);
    console.log(`Deleted card ${cardId} from ${columnId}`);
  };
  
  // Handle adding a new column
  const handleAddColumn = () => {
    const newColumns = [...columns];
    const newId = `column-${Math.floor(Math.random() * 10000)}`;
    
    newColumns.push({
      id: newId,
      title: "New Column",
      cards: [],
    });
    
    setColumns(newColumns);
    console.log('Added new column');
  };
  
  // Handle deleting a column
  const handleDeleteColumn = (columnId) => {
    const newColumns = columns.filter(col => col.id !== columnId);
    setColumns(newColumns);
    console.log(`Deleted column ${columnId}`);
  };
  
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-text-secondary">
          This is a fully interactive demo. You can:
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary mt-1">
          <li>Drag and drop cards between columns</li>
          <li>Add new cards to columns</li>
          <li>Delete cards</li>
          <li>Add new columns</li>
          <li>Delete columns</li>
        </ul>
      </div>
      
      <KanbanBoard
        columns={columns}
        onCardMove={handleCardMove}
        onCardAdd={handleAddCard}
        onCardDelete={handleDeleteCard}
        onColumnAdd={handleAddColumn}
        onColumnDelete={handleDeleteColumn}
        onCardClick={(card) => console.log('Card clicked:', card)}
        allowAddColumns={true}
        allowDeleteColumns={true}
      />
    </div>
  );
};

export const HVACProjectBoard = () => {
  const hvacColumns = [
    {
      id: 'backlog',
      title: "Backlog",
      cards: [
        {
          id: 'hvac1',
          title: "Site Evaluation",
          description: 'Evaluate existing HVAC systems and building layout',
          tags: ['preparation', 'site-visit'],
          dueDate: '2025-04-12',
        },
        {
          id: 'hvac2',
          title: "Material Planning",
          description: 'Calculate required materials and equipment',
          tags: ['planning', 'materials'],
          dueDate: '2025-04-15',
        },
      ],
    },
    {
      id: 'scheduled',
      title: "Scheduled",
      cards: [
        {
          id: 'hvac3',
          title: "Heat Pump Installation",
          description: 'Install new heat pump system',
          assignee: 'Miguel Rodriguez',
          tags: ['installation', 'residential'],
          dueDate: '2025-04-10',
        },
        {
          id: 'hvac4',
          title: "Quarterly Maintenance",
          description: 'Quarterly maintenance check',
          assignee: 'Sarah Johnson',
          tags: ['maintenance', 'commercial'],
          dueDate: '2025-04-07',
        },
      ],
    },
    {
      id: 'in-progress',
      title: "In Progress",
      cards: [
        {
          id: 'hvac5',
          title: "Server Room Emergency",
          description: 'Cooling system failure in server room',
          assignee: 'John Smith',
          tags: ['repair', 'urgent', 'commercial'],
          dueDate: '2025-04-03',
        },
      ],
    },
    {
      id: 'completed',
      title: "Completed",
      cards: [
        {
          id: 'hvac6',
          title: "Filter Replacement",
          description: 'Replace air filters throughout the building',
          assignee: 'Alex Taylor',
          tags: ['maintenance', 'residential'],
          dueDate: '2025-04-01',
        },
      ],
    },
  ];
  
  // Custom card renderer specific to HVAC
  const renderHVACCard = (card, columnId) => {
    // Determine status color
    const statusColors = {
      backlog: 'bg-background-light',
      scheduled: 'bg-primary/10',
      'in-progress': 'bg-status-warning/10',
      completed: 'bg-status-success/10',
    };
    
    // Determine tag styling
    const getTagStyle = (tag) => {
      switch (tag) {
        case 'urgent':
          return 'bg-status-error/10 text-status-error';
        case 'repair':
          return 'bg-status-warning/10 text-status-warning';
        case 'maintenance':
          return 'bg-status-success/10 text-status-success';
        case 'installation':
          return 'bg-primary/10 text-primary';
        case 'commercial':
          return 'bg-status-info/10 text-status-info';
        case 'residential':
          return 'bg-secondary/10 text-secondary';
        default:
          return 'bg-background-light text-text-secondary';
      }
    };
    
    return (
      <div
        key={card.id}
        className={`${statusColors[columnId]} p-3 rounded shadow-sm mb-2 cursor-pointer border border-light`}
      >
        <h3 className="font-medium text-text-primary">{card.title}</h3>
        
        {card.description && (
          <p className="text-sm text-text-secondary mt-1">{card.description}</p>
        )}
        
        <div className="flex flex-wrap gap-1 mt-2">
          {card.tags && card.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-3 text-xs">
          {card.dueDate && (
            <div className="flex items-center text-text-secondary">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(card.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {card.assignee && (
            <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
              <svg className="w-3 h-3 mr-1 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-text-primary">{card.assignee}</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-4">HVAC Service Board</h2>
      <KanbanBoard
        columns={hvacColumns}
        renderCard={renderHVACCard}
        columnMinWidth={300}
      />
    </div>
  );
};

export const CustomStyling = {
  args: {
    columns: sampleColumns,
    className: "py-4 px-2 gap-6 bg-background-light rounded-lg",
    columnClassName: "bg-white shadow-md rounded-lg border border-light",
    cardClassName: "bg-white hover:bg-primary/5 transition-colors duration-150 border border-light",
    columnMinWidth: 320,
  },
};
