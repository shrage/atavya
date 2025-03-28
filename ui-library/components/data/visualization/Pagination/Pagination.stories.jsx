import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: "Data/Visualization/Pagination",
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
};

export const Variants = () => {
  const [currentPage1, setCurrentPage1] = useState(3);
  const [currentPage2, setCurrentPage2] = useState(3);
  const [currentPage3, setCurrentPage3] = useState(3);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">Buttons Variant (Default)</h3>
        <Pagination
          currentPage={currentPage1}
          totalPages={10}
          onPageChange={setCurrentPage1}
          variant="buttons"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">Simple Variant</h3>
        <Pagination
          currentPage={currentPage2}
          totalPages={10}
          onPageChange={setCurrentPage2}
          variant="simple"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">Input Variant</h3>
        <Pagination
          currentPage={currentPage3}
          totalPages={10}
          onPageChange={setCurrentPage3}
          variant="input"
        />
      </div>
    </div>
  );
};

export const WithPageSizeSelector = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 250;
  
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        showPageSizeSelector={true}
        pageSizeOptions={[10, 25, 50, 100]}
        showPageInfo={true}
      />
      
      <div className="mt-6 p-4 bg-background-light rounded border border-border-light">
        <h3 className="font-medium text-text-primary mb-2">Current Settings:</h3>
        <p className="text-text-primary">Page: {currentPage}</p>
        <p className="text-text-primary">Page Size: {pageSize}</p>
        <p className="text-text-primary">Total Items: {totalItems}</p>
        <p className="text-text-primary">Total Pages: {Math.ceil(totalItems / pageSize)}</p>
      </div>
    </div>
  );
};

export const WithPageInfo = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const pageSize = 10;
  const totalItems = 87;
  
  return (
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      showPageInfo={true}
    />
  );
};

export const CustomLabels = () => {
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      labels={{
        first: 'First',
        previous: 'Prev',
        next: 'Next',
        last: 'Last',
        pageInfo: 'Displaying {range} of {total} records',
        pageSizeSelector: 'Records per page:',
      }}
    />
  );
};

export const DifferentSiblingCounts = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">siblingCount = 0</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          siblingCount={0}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">siblingCount = 1 (Default)</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          siblingCount={1}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-3">siblingCount = 2</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          siblingCount={2}
        />
      </div>
    </div>
  );
};

export const ManyPages = () => {
  const [currentPage, setCurrentPage] = useState(50);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={100}
      onPageChange={setCurrentPage}
    />
  );
};

export const FewPages = () => {
  const [currentPage, setCurrentPage] = useState(2);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={3}
      onPageChange={setCurrentPage}
    />
  );
};

export const CustomStyling = () => {
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      className="justify-center"
      activeClassName="bg-primary text-white"
      inactiveClassName="bg-background-light text-text-primary hover:bg-background-skeleton"
    />
  );
};

export const ControlledPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(87);
  
  // Simulate data for the current page
  const generatePageData = (page, size) => {
    const startItem = (page - 1) * size + 1;
    const endItem = Math.min(startItem + size - 1, totalItems);
    
    return Array.from({ length: endItem - startItem + 1 }, (_, i) => ({
      id: startItem + i,
      name: `Item ${startItem + i}`,
      value: Math.floor(Math.random() * 1000),
    }));
  };
  
  const currentData = generatePageData(currentPage, pageSize);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // In a real application, you would fetch data for the new page here
  };
  
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
    // In a real application, you would fetch data with the new page size here
  };
  
  return (
    <div className="space-y-6">
      <div className="border border-border-light rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-border-light">
          <thead className="bg-background-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border-light">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-background-light">
                <td className="px-6 py-4 whitespace-nowrap text-text-primary">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-text-primary">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-text-primary">${item.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-text-secondary text-sm">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export const WithoutFirstLastButtons = () => {
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      showFirstLastButtons={false}
    />
  );
};

export const WithoutPrevNextButtons = () => {
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      showPrevNextButtons={false}
    />
  );
};

export const WithoutPageNumbers = () => {
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      showPageNumbers={false}
    />
  );
};

export const HideOnSinglePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => setTotalPages(1)}
        >
          Set to 1 page
        </button>
        <button 
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => setTotalPages(5)}
        >
          Set to 5 pages
        </button>
      </div>
      
      <div className="p-4 border border-border-light rounded-md bg-background-light">
        <div className="mb-4">
          <p className="text-text-primary">Current settings: {totalPages} page(s)</p>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

// Real-world examples
export const TableExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = 47;
  
  // Generate mock data
  const generateData = (page, size) => {
    const startIndex = (page - 1) * size;
    return Array.from({ length: Math.min(size, totalItems - startIndex) }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Product ${startIndex + i + 1}`,
      category: ['Electronics', 'Clothing', 'Home', 'Books', 'Food'][Math.floor(Math.random() * 5)],
      price: (Math.random() * 100 + 10).toFixed(2),
      stock: Math.floor(Math.random() * 100),
    }));
  };
  
  const data = generateData(currentPage, pageSize);
  
  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-text-primary">Product Inventory</h3>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary text-sm">Search:</span>
          <input 
            type="text" 
            className="border border-border-medium rounded px-2 py-1 text-sm" 
            placeholder="Search products..." 
          />
        </div>
      </div>
      
      <div className="border border-border-light rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-border-light">
          <thead className="bg-background-light">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border-light">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-background-light">
                <td className="px-4 py-3 whitespace-nowrap text-text-primary">{item.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-text-primary">{item.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-text-primary">{item.category}</td>
                <td className="px-4 py-3 whitespace-nowrap text-text-primary">${item.price}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.stock > 50 ? 'bg-status-success/10 text-status-success' : 
                    item.stock > 20 ? 'bg-status-warning/10 text-status-warning' : 
                    'bg-status-danger/10 text-status-danger'
                  }`}>
                    {item.stock} units
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-primary hover:text-primary-dark mr-2">Edit</button>
                  <button className="text-status-danger hover:text-status-danger-dark">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        <div className="text-text-secondary text-sm">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} products
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export const CardGridExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalItems = 24;
  
  // Generate mock data
  const generateCards = (page, size) => {
    const startIndex = (page - 1) * size;
    return Array.from({ length: Math.min(size, totalItems - startIndex) }, (_, i) => ({
      id: startIndex + i + 1,
      title: `Card ${startIndex + i + 1}`,
      description: 'This is a sample card description that shows how pagination works with grid layouts.',
      imageUrl: `https://picsum.photos/seed/${startIndex + i + 1}/300/200`,
    }));
  };
  
  const cards = generateCards(currentPage, pageSize);
  
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-text-primary">Photo Gallery</h3>
        <div className="flex items-center gap-2">
          <select className="border border-border-medium rounded px-2 py-1 text-sm text-text-primary bg-background-light">
            <option>All Categories</option>
            <option>Nature</option>
            <option>Architecture</option>
            <option>People</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border border-border-light rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow">
            <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="font-medium text-text-primary mb-2">{card.title}</h4>
              <p className="text-text-secondary text-sm">{card.description}</p>
              <div className="mt-4 flex justify-end">
                <button className="text-primary hover:text-primary-dark text-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          className="justify-center"
        />
      </div>
    </div>
  );
};
