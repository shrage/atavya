import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * KanbanBoard component
 * A drag-and-drop kanban board with columns and cards
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <KanbanBoard
 *   columns={[
 *     { id: 'todo', title: 'To Do', cards: [{ id: 1, title: 'Task 1' }] },
 *     { id: 'in-progress', title: 'In Progress', cards: [] },
 *     { id: 'done', title: 'Done', cards: [] },
 *   ]}
 *   onCardMove={(cardId, sourceColumn, targetColumn) => {
 *     console.log('Card moved:', cardId, sourceColumn, targetColumn);
 *   }}
 * />
 * ```
 */
const KanbanBoard = ({
  // Data
  columns = [],
  
  // Callbacks
  onCardMove,
  onColumnAdd,
  onColumnDelete,
  onCardAdd,
  onCardDelete,
  onCardClick,
  
  // Display
  className,
  cardClassName,
  columnClassName,
  
  // Customization
  renderCard,
  renderColumnHeader,
  renderAddCard,
  allowAddColumns = false,
  allowDeleteColumns = false,
  columnMinWidth = 280,
}) => {
  // State for drag and drop
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  
  // Refs for smooth scrolling
  const boardRef = useRef(null);
  const scrollInterval = useRef(null);
  
  // Start dragging a card
  const handleDragStart = (e, card, columnId) => {
    setDraggedCard({ card, columnId });
    
    // Set data for HTML5 drag and drop
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ cardId: card.id, columnId }));
    
    // Use a ghost image
    const ghostElement = document.createElement('div');
    ghostElement.classList.add('bg-white', 'shadow-md', 'rounded', 'p-3', 'opacity-80');
    ghostElement.innerText = card.title;
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    
    // Clean up ghost after drag
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };
  
  // Handle dragging over a column
  const handleDragOverColumn = (e, columnId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
    
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle dragging over a card
  const handleDragOverCard = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedOver !== cardId) {
      setDraggedOver(cardId);
    }
    
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle dropping a card
  const handleDrop = (e, targetColumnId, targetIndex = -1) => {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    const { card, columnId: sourceColumnId } = draggedCard;
    
    // Call onCardMove callback if card is moved to a different column or position
    if (sourceColumnId !== targetColumnId || targetIndex !== -1) {
      if (onCardMove) {
        onCardMove(card.id, sourceColumnId, targetColumnId, targetIndex);
      }
    }
    
    // Reset drag state
    setDraggedCard(null);
    setDragOverColumn(null);
    setDraggedOver(null);
    
    // Clear any auto-scroll
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };
  
  // Handle drag end (drop outside dropzone or cancel)
  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverColumn(null);
    setDraggedOver(null);
    
    // Clear any auto-scroll
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };
  
  // Add a new column
  const handleAddColumn = () => {
    if (onColumnAdd) {
      onColumnAdd();
    }
  };
  
  // Delete a column
  const handleDeleteColumn = (columnId) => {
    if (onColumnDelete) {
      onColumnDelete(columnId);
    }
  };
  
  // Add a new card to a column
  const handleAddCard = (columnId) => {
    if (onCardAdd) {
      onCardAdd(columnId);
    }
  };
  
  // Delete a card
  const handleDeleteCard = (cardId, columnId) => {
    if (onCardDelete) {
      onCardDelete(cardId, columnId);
    }
  };
  
  // Handle card click
  const handleCardClick = (card, columnId) => {
    if (onCardClick) {
      onCardClick(card, columnId);
    }
  };
  
  // Default card renderer
  const defaultRenderCard = (card, columnId) => (
    <div 
      className={twMerge(
        "p-3 bg-white rounded-md shadow-sm border border-border-light",
        draggedCard?.card.id === card.id ? "opacity-50" : "",
        draggedOver === card.id ? "border-primary border-2" : "",
        cardClassName
      )}
      draggable
      onDragStart={(e) => handleDragStart(e, card, columnId)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => handleDragOverCard(e, card.id)}
      onDrop={(e) => handleDrop(e, columnId)}
      onClick={() => onCardClick && onCardClick(card, columnId)}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-text-primary">{card.title}</h3>
        
        {onCardDelete && (
          <button
            type="button"
            className="text-text-secondary hover:text-status-live"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCard(card.id, columnId);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {card.description && (
        <p className="text-sm text-text-secondary mt-1">{card.description}</p>
      )}
      
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-light text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {card.dueDate && (
        <div className="mt-2 text-xs text-text-secondary flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(card.dueDate).toLocaleDateString()}
        </div>
      )}
      
      {card.assignee && (
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className="inline-block h-6 w-6 rounded-full bg-background-hover text-xs flex items-center justify-center text-text-primary">
              {card.assignee.slice(0, 2).toUpperCase()}
            </span>
            <span className="ml-1 text-xs text-text-secondary">{card.assignee}</span>
          </div>
        </div>
      )}
    </div>
  );
  
  // Default column header renderer
  const defaultRenderColumnHeader = (column) => (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center">
        <h2 className="font-medium text-text-primary">{column.title}</h2>
        {column.cards && (
          <span className="ml-2 bg-background-hover text-text-primary text-xs font-medium rounded-full py-0.5 px-2">
            {column.cards.length}
          </span>
        )}
      </div>
      
      {allowDeleteColumns && (
        <button
          type="button"
          className="text-text-secondary hover:text-status-live"
          onClick={() => handleDeleteColumn(column.id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
  
  // Default add card button renderer
  const defaultRenderAddCard = (columnId) => (
    <button
      type="button"
      className="w-full py-2 px-3 text-sm text-text-secondary hover:bg-background-hover rounded text-left flex items-center"
      onClick={() => handleAddCard(columnId)}
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add a card
    </button>
  );
  
  return (
    <div 
      ref={boardRef}
      className={twMerge(
        "flex gap-4 overflow-x-auto pb-4",
        className
      )}
    >
      {/* Columns */}
      {columns.map((column) => (
        <div
          key={column.id}
          className={twMerge(
            "flex-shrink-0 bg-gray-100 rounded p-3",
            dragOverColumn === column.id ? "bg-blue-50 border-2 border-blue-300 border-dashed" : "",
            columnClassName
          )}
          style={{ width: columnMinWidth, minWidth: columnMinWidth }}
          onDragOver={(e) => handleDragOverColumn(e, column.id)}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column header */}
          {renderColumnHeader ? renderColumnHeader(column) : defaultRenderColumnHeader(column)}
          
          {/* Cards */}
          <div className="min-h-[50px]">
            {column.cards && column.cards.map((card) => (
              renderCard ? renderCard(card, column.id) : defaultRenderCard(card, column.id)
            ))}
          </div>
          
          {/* Add card button */}
          {onCardAdd && (
            <div className="mt-2">
              {renderAddCard ? renderAddCard(column.id) : defaultRenderAddCard(column.id)}
            </div>
          )}
        </div>
      ))}
      
      {/* Add column button */}
      {allowAddColumns && onColumnAdd && (
        <div 
          className="flex-shrink-0 bg-gray-50 rounded p-3 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100"
          style={{ width: columnMinWidth, minWidth: columnMinWidth }}
          onClick={handleAddColumn}
        >
          <div className="text-gray-500 flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="mt-1">Add Column</span>
          </div>
        </div>
      )}
    </div>
  );
};

KanbanBoard.propTypes = {
  /** Columns data */
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string,
      assignee: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })),
  })).isRequired,
  
  /** Called when a card is moved to a different column or position */
  onCardMove: PropTypes.func,
  
  /** Called when a new column is added */
  onColumnAdd: PropTypes.func,
  
  /** Called when a column is deleted */
  onColumnDelete: PropTypes.func,
  
  /** Called when a new card is added to a column */
  onCardAdd: PropTypes.func,
  
  /** Called when a card is deleted */
  onCardDelete: PropTypes.func,
  
  /** Called when a card is clicked */
  onCardClick: PropTypes.func,
  
  /** Additional CSS classes for the board container */
  className: PropTypes.string,
  
  /** CSS classes for cards */
  cardClassName: PropTypes.string,
  
  /** CSS classes for columns */
  columnClassName: PropTypes.string,
  
  /** Custom card renderer */
  renderCard: PropTypes.func,
  
  /** Custom column header renderer */
  renderColumnHeader: PropTypes.func,
  
  /** Custom add card button renderer */
  renderAddCard: PropTypes.func,
  
  /** Whether to show the add column button */
  allowAddColumns: PropTypes.bool,
  
  /** Whether to show the delete column button */
  allowDeleteColumns: PropTypes.bool,
  
  /** Minimum width for columns */
  columnMinWidth: PropTypes.number,
};

export default KanbanBoard;
