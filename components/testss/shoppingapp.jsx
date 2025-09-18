'use client';

import VoiceBtn from "./voicebtn";

export default function ShoppingApp() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        
        <VoiceBtn 
          placeholder="Type item and press Enter..."
        />

      </div>
    </div>
  );
}