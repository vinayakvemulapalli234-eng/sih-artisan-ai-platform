import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-800 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Desktop Mode Toggle Bar */}
      <div className="hidden sm:flex items-center gap-3 mb-3 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-full shadow-lg text-xs font-medium border border-neutral-700">
        <span className="text-neutral-400">View Mode:</span>
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            isPhoneFrame 
              ? 'bg-emerald-600 text-white font-semibold shadow' 
              : 'hover:text-white text-neutral-400'
          }`}
        >
          <Smartphone size={14} /> Mobile Phone Frame
        </button>
        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            !isPhoneFrame 
              ? 'bg-emerald-600 text-white font-semibold shadow' 
              : 'hover:text-white text-neutral-400'
          }`}
        >
          <Monitor size={14} /> Responsive Screen
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full bg-[#FAF7F2] transition-all duration-300 relative overflow-hidden flex flex-col ${
          isPhoneFrame
            ? 'max-w-[430px] h-[100vh] sm:h-[880px] sm:rounded-[44px] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl'
            : 'max-w-md min-h-screen sm:rounded-2xl sm:shadow-2xl'
        }`}
      >
        {/* Dynamic Mobile Status Bar Decorator (Only visible in Phone Frame mode) */}
        {isPhoneFrame && (
          <div className="hidden sm:flex justify-between items-center px-7 pt-3 pb-1 bg-[#FAF7F2] text-xs text-neutral-500 font-semibold select-none z-20 shrink-0">
            <span>9:41</span>
            <div className="w-20 h-4 bg-neutral-900 rounded-full mx-auto -mt-1 opacity-90"></div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-neutral-600 rounded-2xs"></div>
              </div>
            </div>
          </div>
        )}

        {/* Viewport Content */}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
          {children}
        </div>
      </div>
    </div>
  );
};
