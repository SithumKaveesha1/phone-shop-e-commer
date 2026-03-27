import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isBot }) => {
    return (
        <div className={`flex items-start gap-4 mb-6 ${isBot ? 'flex-row' : 'flex-row-reverse animate-in slide-in-from-right-4'}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isBot ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
            }`}>
                {isBot ? <Bot size={20} /> : <User size={20} />}
            </div>
            
            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm border ${
                isBot 
                    ? 'bg-white border-pink-50 text-gray-800 rounded-tl-none' 
                    : 'bg-[#d81b60] border-[#d81b60] text-white rounded-tr-none'
            }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message}
                </p>
                <div className={`text-[10px] mt-2 block opacity-50 ${isBot ? 'text-gray-400' : 'text-pink-100'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
