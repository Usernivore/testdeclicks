
import React from 'react';

type GameState = 'idle' | 'running' | 'finished';

interface ClickAreaProps {
  gameState: GameState;
  cps: number;
  onClick: () => void;
  onRetry: () => void;
}

const ClickArea: React.FC<ClickAreaProps> = ({ gameState, cps, onClick, onRetry }) => {
  const getBackgroundColor = () => {
    switch (gameState) {
      case 'idle':
        return 'bg-slate-800 hover:bg-slate-700/50';
      case 'running':
        return 'bg-blue-900/30';
      case 'finished':
        return 'bg-slate-800';
    }
  };
  
  const getBorderColor = () => {
     switch (gameState) {
      case 'running':
        return 'border-blue-400';
       case 'finished':
        return 'border-green-500';
      default:
        return 'border-blue-500';
    }
  }

  return (
    <div
      className={`w-full h-64 md:h-80 flex flex-col items-center justify-center p-4 text-center rounded-xl border-2 transition-colors duration-200 ${getBackgroundColor()} ${getBorderColor()}`}
      onClick={gameState !== 'finished' ? onClick : undefined}
      style={{ cursor: gameState !== 'finished' ? 'pointer' : 'default' }}
    >
      {gameState === 'idle' && (
        <>
          <h2 className="text-3xl font-bold text-white">Haz clic aquí para empezar</h2>
          <p className="text-gray-400 mt-2">Una vez que comiences, haz clic tan rápido como puedas.</p>
        </>
      )}
      {gameState === 'running' && (
        <p className="text-2xl font-semibold text-blue-300 animate-pulse">¡Sigue haciendo clic!</p>
      )}
      {gameState === 'finished' && (
        <div className="flex flex-col items-center">
            <p className="text-xl text-gray-300">Prueba Finalizada</p>
            <p className="text-6xl font-bold text-white my-2">{cps.toFixed(2)} <span className="text-4xl text-gray-400">CPS</span></p>
            <button
                onClick={onRetry}
                className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
                Reintentar
            </button>
        </div>
      )}
    </div>
  );
};

export default ClickArea;
