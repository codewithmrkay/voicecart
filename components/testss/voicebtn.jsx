'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, X, CheckCircle } from 'lucide-react';

const VoiceBtn = ({ 
  placeholder = "Type here...",
  className = ""
}) => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';
        
        recognition.onstart = () => {
          setIsListening(true);
          setError('');
          
          // Auto-stop after 10 seconds of no final results
          silenceTimeoutRef.current = setTimeout(() => {
            if (recognition && isListening) {
              recognition.stop();
            }
          }, 10000);
        };

        recognition.onresult = (event) => {
          // Clear silence timeout when we get results
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          
          if (finalTranscript.trim()) {
            const newItems = finalTranscript
              .split(/[,\s]+/)
              .map(item => item.trim())
              .filter(item => item.length > 0)
              .map(item => ({
                id: Date.now() + Math.random(),
                text: item
              }));
            
            setItems(prev => [...newItems, ...prev]);
            
            // Auto-stop after getting results
            setTimeout(() => {
              recognition.stop();
            }, 1000);
          }
        };

        recognition.onerror = (event) => {
          setError('Voice input failed');
          setIsListening(false);
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  const startRecording = () => {
    if (!isSupported || isListening) return;
    
    setError('');
    
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      setError('Could not start voice input');
    }
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTextSubmit = () => {
    if (inputText.trim()) {
      const newItem = {
        id: Date.now(),
        text: inputText.trim()
      };
      setItems(prev => [newItem, ...prev]);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    }
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  return (
    <div className={`w-full max-w-sm mx-auto px-4 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        
        {/* Microphone Button */}
        <button
          onClick={startRecording}
          disabled={!isSupported || isListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center
                     transition-all duration-300 shadow-lg active:scale-95
                     ${isListening 
                       ? 'bg-red-500 text-white animate-pulse cursor-not-allowed' 
                       : isSupported 
                         ? 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-xl'
                         : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                     }
                     focus:outline-none`}
        >
          <Mic className="w-8 h-8" />
        </button>

        {/* Status */}
        {error && (
          <div className="text-red-600 text-xs text-center px-2 bg-red-50 rounded p-2">
            {error}
          </div>
        )}

        {isListening && (
          <div className="text-red-600 text-sm font-medium text-center">
            🎤 Listening...
          </div>
        )}

        {!isSupported && (
          <div className="text-gray-600 text-xs text-center">
            Voice not supported - use text input
          </div>
        )}

        {/* Text Input with Add Button */}
        <div className="w-full relative">
          <input
            type="text"
            value={inputText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-4 pr-16 py-4 text-base border-2 border-gray-300 rounded-xl 
                     focus:border-blue-500 focus:outline-none bg-white shadow-sm
                     placeholder:text-gray-400"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2
                     bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300
                     text-white px-4 py-2 rounded-lg text-sm font-medium
                     disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Results Container */}
        {items.length > 0 && (
          <div className="w-full bg-white border-2 border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Items ({items.length})
              </h3>
              <button
                onClick={clearAllItems}
                className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 
                         text-white px-3 py-1 rounded-lg text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>

            <div className="p-1 max-h-60 overflow-y-auto">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 
                           rounded-lg border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-800 font-medium text-base flex-1 pr-2">
                    {item.text}
                  </span>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50
                             rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="w-full bg-white border-2 border-dashed border-gray-300 
                         rounded-xl p-8 text-center">
            <div className="text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm">No items yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Click mic or type to add items
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceBtn;