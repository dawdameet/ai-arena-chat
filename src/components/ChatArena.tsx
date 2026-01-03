import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, Agent } from '@/types/agent';
import { MessageBubble } from './MessageBubble';
import { Swords } from 'lucide-react';

interface ChatArenaProps {
  messages: Message[];
  agents: Agent[];
  typingAgentId?: string;
}

export function ChatArena({ messages, agents, typingAgentId }: ChatArenaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAgent = (id: string) => agents.find(a => a.id === id);
  const typingAgent = typingAgentId ? getAgent(typingAgentId) : null;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Swords className="w-5 h-5 text-foreground" />
          <h1 className="text-lg font-semibold text-foreground">Battle Arena</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => {
            const agent = getAgent(message.agentId);
            const targetAgent = message.targetAgentId ? getAgent(message.targetAgentId) : undefined;
            
            if (!agent) return null;
            
            return (
              <MessageBubble
                key={message.id}
                message={message}
                agent={agent}
                targetAgent={targetAgent}
                isNew={index === messages.length - 1}
              />
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        {typingAgent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 text-muted-foreground"
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">{typingAgent.name} is formulating a response...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
