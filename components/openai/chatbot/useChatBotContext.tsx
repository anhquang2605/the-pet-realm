import React, { createContext, useContext, useState } from "react";
import { Message } from "../../../types/chat";
interface ChatBotContextType {
  isSendingMessage: boolean;
  setIsSendingMessage: (isSending: boolean) => void;
  sentMessages: Message[];
  setSentMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  responses: Message[];
  setResponses: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendingMessage: Message;
  setSendingMessage: React.Dispatch<React.SetStateAction<Message>>
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const useChatBotContext = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBotContext must be used within a ChatBotProvider");
  }
  return context;
};
const INITIAL_MESSAGE: Message = {
  sender: 'bot',
  content: 'Hello! How can I assist you today?'
};
export const ChatBotProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [responses, setResponses] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [sendingMessage, setSendingMessage] = useState<Message>({
    sender: 'user',
    content: ''
  });

  return (
    <ChatBotContext.Provider value={{ isSendingMessage, setIsSendingMessage, sentMessages, setSentMessages, responses, setResponses, messages, setMessages, sendingMessage, setSendingMessage }}>
      {children}
    </ChatBotContext.Provider>
  );
};