import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, MicOff, Bot, User, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export const SustainabilityAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your sustainability assistant. I can help you reduce your carbon footprint, find eco-friendly alternatives, and answer any questions about sustainable living. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "How can I reduce my energy bill?",
        "What are eco-friendly cleaning products?",
        "Tips for sustainable transportation",
        "How to start composting at home"
      ]
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('energy') || input.includes('electricity')) {
      return {
        text: "Great question about energy! Here are some effective ways to reduce your energy consumption:\n\n• Switch to LED bulbs (use 75% less energy)\n• Unplug devices when not in use\n• Use a programmable thermostat\n• Seal air leaks around windows and doors\n• Consider solar panels if feasible\n\nThese changes can reduce your energy bill by 20-30% annually!",
        suggestions: ["Tell me about solar panels", "How much do LED bulbs save?", "Best programmable thermostats"]
      };
    }
    
    if (input.includes('transport') || input.includes('car') || input.includes('commute')) {
      return {
        text: "Transportation is a major source of emissions. Here are sustainable alternatives:\n\n• Use public transportation, bike, or walk when possible\n• Carpool or use ride-sharing services\n• Work from home when feasible\n• Consider an electric or hybrid vehicle\n• Combine errands into one trip\n\nEven replacing 2 car trips per week can reduce your carbon footprint by 1,600 lbs of CO2 annually!",
        suggestions: ["Electric vehicle benefits", "Best bike routes near me", "Public transit options"]
      };
    }
    
    if (input.includes('compost') || input.includes('waste')) {
      return {
        text: "Composting is fantastic for reducing waste! Here's how to get started:\n\n• Collect fruit/vegetable scraps, coffee grounds, eggshells\n• Avoid meat, dairy, and oily foods\n• Mix 'greens' (food scraps) with 'browns' (dry leaves, paper)\n• Turn the pile weekly and keep it moist\n• Ready compost in 2-6 months\n\nComposting can reduce household waste by 30% and creates nutrient-rich soil!",
        suggestions: ["What can I compost?", "Indoor composting options", "Using finished compost"]
      };
    }
    
    if (input.includes('clean') || input.includes('product')) {
      return {
        text: "Eco-friendly cleaning products are safer and more sustainable:\n\n• Look for plant-based ingredients\n• Avoid phosphates, chlorine, and synthetic fragrances\n• Try DIY cleaners: vinegar, baking soda, lemon\n• Choose concentrated formulas to reduce packaging\n• Buy in bulk or refillable containers\n\nBrands like Seventh Generation, Method, and Mrs. Meyer's are great options!",
        suggestions: ["DIY cleaning recipes", "Best eco-friendly brands", "Non-toxic alternatives"]
      };
    }
    
    return {
      text: "I'd be happy to help with that! Could you be more specific about what aspect of sustainability you're interested in? I can provide advice on energy efficiency, sustainable transportation, waste reduction, eco-friendly products, and much more.",
      suggestions: [
        "Energy saving tips",
        "Sustainable transportation",
        "Waste reduction strategies",
        "Eco-friendly products"
      ]
    };
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white rounded-t-2xl">
        <div className="flex items-center mb-2">
          <Bot className="h-6 w-6 mr-3" />
          <h2 className="text-xl font-bold">Sustainability Assistant</h2>
        </div>
        <p className="text-green-100 text-sm">
          Ask me anything about sustainable living, energy efficiency, and eco-friendly practices!
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-96 max-h-96">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-900 shadow-sm border border-gray-200'
            }`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <Bot className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <User className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                )}
              </div>
              
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="block w-full text-left px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 shadow-sm border border-gray-200 px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-emerald-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about sustainability..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={handleVoiceInput}
              disabled={isListening}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                isListening 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};