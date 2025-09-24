import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotProps {
  chatType: "health" | "symptom" | "medicine" | "tips" | "exercise" | "psychology" | "general";
}

const Chatbot: React.FC<ChatbotProps> = ({ chatType }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const titles = {
    health: "AI Health Assistant",
    symptom: "Symptom Checker",
    medicine: "Medicine Questions",
    tips: "Health Tips",
    exercise: "Exercise Advice",
    psychology: "Mental Well-being Support",
    general: "General Chat"
  };

  useEffect(() => {
    setMessages([]);
  }, [chatType]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentInput, 
          type: chatType,
          // No longer sending history
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      const botMessage: Message = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>{titles[chatType]}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 border-b">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Send
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default Chatbot;
