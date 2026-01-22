import React, { createContext, useContext, useState } from "react";

interface ChatBotContextType {
  isSendingMessage: boolean;
  setIsSendingMessage: (isSending: boolean) => void;
  sentMessages: string[];
  setSentMessages: React.Dispatch<React.SetStateAction<string[]>>;
  responses: string[];
  setResponses: React.Dispatch<React.SetStateAction<string[]>>;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  sendingMessage: string;
  setSendingMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const useChatBotContext = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBotContext must be used within a ChatBotProvider");
  }
  return context;
};

export const ChatBotProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [sendingMessage, setSendingMessage] = useState<string>("");

  return (
    <ChatBotContext.Provider value={{ isSendingMessage, setIsSendingMessage, sentMessages, setSentMessages, responses, setResponses, messages, setMessages, sendingMessage, setSendingMessage }}>
      {children}
    </ChatBotContext.Provider>
  );
};