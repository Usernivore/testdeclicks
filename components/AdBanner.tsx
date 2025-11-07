import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  className?: string;
  adSlot: string;
  adClient: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', adSlot, adClient }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense script error:", err);
    }
  }, []);

  // The outer div acts as a container and provides a fallback style 
  // in case the ad doesn't load. The 'ins' tag is what AdSense uses to inject the ad.
  return (
    <div className={`bg-slate-800/50 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 rounded-lg ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;