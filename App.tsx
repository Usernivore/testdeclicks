import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import AdBanner from './components/AdBanner';
import ClickArea from './components/ClickArea';
import StatCard from './components/StatCard';
import Footer from './components/Footer';

const TEST_DURATION = 5;

// TODO: Replace with your own Google AdSense Publisher ID and Ad Slot IDs
const AD_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
const HORIZONTAL_AD_SLOT = "YYYYYYYYYY";
const VERTICAL_AD_SLOT = "ZZZZZZZZZZ";

type GameState = 'idle' | 'running' | 'finished';

const App: React.FC = () => {
  const [showAds, setShowAds] = useState(true);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(0);

  useEffect(() => {
    // Manages the timer countdown and game state transition from 'running' to 'finished'.
    let timerId: number;

    if (gameState === 'running' && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'running') {
      setGameState('finished');
    }

    return () => {
      window.clearInterval(timerId);
    };
  }, [gameState, timeLeft]); // Dependency on `clicks` is removed to prevent timer reset.

  useEffect(() => {
    // Calculates the final CPS score when the game is finished.
    if (gameState === 'finished') {
      // Ensure TEST_DURATION is not 0 to avoid division by zero.
      if (TEST_DURATION > 0) {
        setCps(clicks / TEST_DURATION);
      }
    }
  }, [gameState, clicks]); // This effect runs only when the game state changes to 'finished'.


  const handleAreaClick = useCallback(() => {
    if (gameState === 'idle') {
      setGameState('running');
      setClicks(1);
    } else if (gameState === 'running') {
      setClicks((prevClicks) => prevClicks + 1);
    }
  }, [gameState]);

  const handleRetry = useCallback(() => {
    setGameState('idle');
    setClicks(0);
    setCps(0);
    setTimeLeft(TEST_DURATION);
  }, []);

  const toggleAds = () => {
    setShowAds((prev) => !prev);
  };

  const getTimerDisplay = () => {
    if (gameState === 'idle') return TEST_DURATION.toString().padStart(2, '0');
    return timeLeft.toString().padStart(2, '0');
  };
  
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-900 text-gray-200">
      <Header showAds={showAds} onToggleAds={toggleAds} />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          Prueba de Velocidad de Clics
        </h1>
        
        {showAds && <AdBanner 
          adClient={AD_CLIENT}
          adSlot={HORIZONTAL_AD_SLOT}
          className="mb-6 w-full h-[90px]"
        />}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="inline-block bg-slate-800 rounded-lg px-8 py-4">
                <p className="text-7xl font-bold text-white">{getTimerDisplay()}</p>
              </div>
              <p className="text-gray-400 mt-2">Segundos</p>
            </div>

            <ClickArea gameState={gameState} cps={cps} onClick={handleAreaClick} onRetry={handleRetry} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full">
              <StatCard label="TOTAL CLICS" value={clicks.toString()} />
              <StatCard label="CPS" value={cps.toFixed(2)} />
            </div>
          </div>
          
          {showAds && (
            <div className="lg:w-[160px] flex-shrink-0">
              <AdBanner 
                adClient={AD_CLIENT}
                adSlot={VERTICAL_AD_SLOT}
                className="w-full h-full min-h-[400px] lg:min-h-[600px]"
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;