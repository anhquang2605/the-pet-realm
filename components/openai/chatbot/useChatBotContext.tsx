import { createContext, useContext, useState } from "react";

interface ChatBotContextType {
  isSendingMessage: boolean;
  setIsSendingMessage: (isSending: boolean) => void;
  sentMessages: string[];
  setSentMessages: (messages: string[]) => void;
responses: string[];
  setResponses: (responses: string[]) => void;
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
  
  return (
    <ChatBotContext.Provider value={{ isSendingMessage, setIsSendingMessage, sentMessages, setSentMessages, responses, setResponses }}>
      {children}
    </ChatBotContext.Provider>
  );
};