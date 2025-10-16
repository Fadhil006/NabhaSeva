import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SmartToy } from '@mui/icons-material';
import { Dialog, DialogTrigger } from "./ui/dialog";
import Chatbot from './SymptomCheckerChat';

type ChatType = "health";

const HealthAssistant = () => {
  const [chatType, setChatType] = useState<ChatType>("health");
  const [isChatOpen, setChatOpen] = useState(false);

  const openChat = () => {
    setChatType("health");
    setChatOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Health Assistant</h1>
      <Dialog open={isChatOpen} onOpenChange={setChatOpen}>
        <div className="grid gap-4 max-w-md mx-auto">
          <DialogTrigger asChild>
            <Card className="cursor-pointer" onClick={openChat}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI Health Assistant</span>
                  <SmartToy />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your comprehensive health assistant for symptoms, medicine questions, health tips, exercise advice, and mental well-being support.</p>
                <Button className="mt-4">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </DialogTrigger>
        </div>

        <Chatbot chatType={chatType} />
      </Dialog>
    </div>
  );
};

export default HealthAssistant;
