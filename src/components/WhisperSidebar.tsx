import { motion } from 'framer-motion';
import { Message, Agent } from '@/types/agent';
import { AgentAvatar } from './AgentAvatar';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhisperSidebarProps {
  messages: Message[];
  agents: Agent[];
  isOpen: boolean;
  onToggle: () => void;
}

export function WhisperSidebar({ messages, agents, isOpen, onToggle }: WhisperSidebarProps) {
  const getAgent = (id: string) => agents.find(a => a.id === id);

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 320 : 48 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full border-l border-border bg-card flex flex-col"
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 p-3 border-b border-border hover:bg-secondary/50 transition-colors"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Whisper</span>
          </motion.div>
        )}
      </button>

      {/* Messages */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin"
        >
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider px-1">
            Side conversations
          </p>
          
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No whispers yet...
            </p>
          ) : (
            messages.map((message, index) => {
              const agent = getAgent(message.agentId);
              if (!agent) return null;

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-2 p-2 rounded-lg bg-secondary/30"
                >
                  <AgentAvatar agent={agent} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-foreground">{agent.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      )}

      {/* Collapsed state icons */}
      {!isOpen && (
        <div className="flex-1 flex flex-col items-center py-4 space-y-3">
          {messages.slice(0, 5).map((message) => {
            const agent = getAgent(message.agentId);
            if (!agent) return null;
            return (
              <motion.div
                key={message.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative group"
              >
                <AgentAvatar agent={agent} size="sm" />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
