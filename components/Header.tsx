
import React from 'react';
import BoltIcon from './icons/BoltIcon';
import ToggleSwitch from './ToggleSwitch';

interface HeaderProps {
  showAds: boolean;
  onToggleAds: () => void;
}

const Header: React.FC<HeaderProps> = ({ showAds, onToggleAds }) => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <BoltIcon className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">CPS Test</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 hidden sm:block">Mostrar/Ocultar Anuncios</span>
            <ToggleSwitch checked={showAds} onChange={onToggleAds} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
