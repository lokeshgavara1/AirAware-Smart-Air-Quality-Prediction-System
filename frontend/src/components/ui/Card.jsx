import React from 'react';

const Card = ({ children, className = '', title, actions }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className={title ? "p-6" : "p-6"}>
        {children}
      </div>
    </div>
  );
};

export default Card;