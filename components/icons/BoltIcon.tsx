
import React from 'react';

const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      {...props}
    >
      <path 
        fillRule="evenodd" 
        d="M10.5 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 01.53 1.28l-9 9a.75.75 0 01-1.28-.53V12H3.75a.75.75 0 01-.53-1.28l9-9a.75.75 0 01.78-.02z" 
        clipRule="evenodd" 
      />
    </svg>
  );
};

export default BoltIcon;
