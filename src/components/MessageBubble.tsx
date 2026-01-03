import { motion } from 'framer-motion';
import { Message, Agent } from '@/types/agent';
import { AgentAvatar } from './AgentAvatar';
import { TypingText } from './TypingText';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  agent: Agent;
  targetAgent?: Agent;
  isNew?: boolean;
}

export function MessageBubble({ message, agent, targetAgent, isNew }: MessageBubbleProps) {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(message.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'group flex gap-3 p-4 rounded-lg transition-colors',
        'hover:bg-secondary/50',
        message.isWhisper && 'bg-whisper/50'
      )}
    >
      <AgentAvatar agent={agent} size="md" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground">{agent.name}</span>
          
          {targetAgent && (
            <>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">@{targetAgent.name}</span>
            </>
          )}
          
          <span className="text-xs text-muted-foreground font-mono">{formattedTime}</span>
        </div>
        
        <div className="text-foreground/90 leading-relaxed">
          {isNew ? (
            <TypingText text={message.content} speed={20} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </motion.div>
  );
}
