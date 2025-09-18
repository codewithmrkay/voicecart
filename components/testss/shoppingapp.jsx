'use client';

import BudgetSet from "./budgetset";
import VoiceBtn from "./voicebtn";

export default function ShoppingApp() {
  return (
    <div className="p-4">
      <div className="w-full mx-auto py-8 flex flex-col md:flex-row items-center justify-center">
        <BudgetSet />
        <VoiceBtn
          placeholder="Type item here ..."
        />

      </div>
    </div>
  );
}