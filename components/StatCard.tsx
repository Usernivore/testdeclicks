
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg text-center">
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-5xl font-bold text-white mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
