'use client';

import BudgetSet from "./budgetset";
import VoiceBtn from "./voicebtn";

export default function ShoppingApp() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        
        <BudgetSet/>
        <VoiceBtn 
          placeholder="Type item here ..."
        />

      </div>
    </div>
  );
}