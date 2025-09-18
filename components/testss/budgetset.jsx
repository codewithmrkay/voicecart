'use client';

import { useState, useEffect } from 'react';
import { IndianRupee, Edit3, Check, X, Volume2 } from 'lucide-react';

const BudgetSet = ({ className = "" }) => {
  const [budget, setBudget] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    // Check if Speech Synthesis is supported
    setSpeechSupported(!!window.speechSynthesis);
  }, []);

  const speakBudget = (amount) => {
    if (!speechSupported) return;

    const utterance = new SpeechSynthesisUtterance(
      `Your budget is ${amount} rupees`
    );
    
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Speak the budget
    window.speechSynthesis.speak(utterance);
  };

  const handleSetBudget = () => {
    const value = parseFloat(inputValue);
    if (value > 0) {
      setBudget(value);
      setIsEditing(false);
      setInputValue('');
      
      // Speak the budget amount
      speakBudget(value);
    }
  };

  const handleEditBudget = () => {
    setInputValue(budget.toString());
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSetBudget();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSpeakAgain = () => {
    if (budget > 0) {
      speakBudget(budget);
    }
  };

  return (
    <div className={`w-full max-w-sm mx-auto px-4 mb-6 ${className}`}>
      <div className="bg-[#161543] border-2 border-[#8c3dee] rounded-xl shadow-sm p-4">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <IndianRupee className="w-6 h-6 text-[#ac68ff] mr-2" />
          <h2 className="text-lg font-semibold ">Set Budget</h2>
        </div>

        {/* Budget Display/Edit */}
        {!isEditing && budget === 0 ? (
          // Initial state - no budget set
          <div className="text-center space-y-3">
            <div className="text-white/70 text-sm">Enter your shopping budget</div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#ac68ff] hover:bg-[#ac68ff]/70 text-white py-3 px-4 
                       rounded-lg font-medium transition-colors duration-200"
            >
              Set Budget
            </button>
          </div>
        ) : !isEditing ? (
          // Budget set - display mode
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8c3dee] mb-1">
                {formatCurrency(budget)}
              </div>
              <div className="text-sm text-gray-500">Your Budget</div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleEditBudget}
                className="flex-1 flex items-center justify-center space-x-1
                         bg-[#ac68ff] text-white py-2 px-3 
                         rounded-lg transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              
              <button
                onClick={handleSpeakAgain}
                disabled={isSpeaking || !speechSupported}
                className="flex-1 flex items-center justify-center space-x-1
                         bg-[#ac68ff] hover:bg-[#ac68ff]/70 disabled:bg-[#ac68ff]/50 text-white py-2 px-3 
                         rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span className="text-sm">{isSpeaking ? 'Speaking...' : 'Speak'}</span>
              </button>
            </div>
          </div>
        ) : (
          // Editing mode
          <div className="space-y-3">
            <div className="text-center text-sm text-white/70 mb-3">
              Enter budget amount
            </div>
            
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                   w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-[#8c3dee] 
                         rounded-lg focus:border-[#8c3dee] focus:outline-none
                         text-center font-medium"
                autoFocus
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center space-x-1
                         bg-red-500 hover:bg-red-700 text-white py-2 px-3 
                         rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Cancel</span>
              </button>
              
              <button
                onClick={handleSetBudget}
                disabled={!inputValue || parseFloat(inputValue) <= 0}
                className="flex-1 flex items-center justify-center space-x-1
                         bg-[#8c3dee] hover:bg-[#8c3dee]/70 disabled:bg-gray-300 
                         text-white py-2 px-3 rounded-lg transition-colors duration-200
                         disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm">Set</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Quick Budget Options */}
        {isEditing && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-white/70 mb-2 text-center">Quick set:</div>
            <div className="grid grid-cols-3 gap-2">
              {[1000, 2000, 5000].map(amount => (
                <button
                  key={amount}
                  onClick={() => setInputValue(amount.toString())}
                  className="py-2 px-3 bg-gray-50 hover:bg-blue-50 text-gray-700 
                           rounded-lg text-sm transition-colors duration-200
                           hover:border-blue-200 border border-gray-200"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Speaking Status */}
        {/* {isSpeaking && (
          <div className="mt-3 text-center text-[#8c3dee] text-sm flex items-center justify-center space-x-1">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>Speaking budget...</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default BudgetSet;