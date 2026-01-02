'use client';

import React from 'react';

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="inline-block">
          <img 
            src="/sm.png" 
            alt="SmartLab" 
            className="w-16 h-16 rounded-xl shadow-lg mb-4 animate-pulse" 
          />
        </div>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
