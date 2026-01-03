import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { cn } from '@/lib/utils';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
  isTyping?: boolean;
  showPulse?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-lg',
};

export function AgentAvatar({ agent, size = 'md', isTyping, showPulse }: AgentAvatarProps) {
  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center rounded-full border border-border bg-secondary font-mono',
        sizeClasses[size],
        isTyping && 'animate-pulse-subtle'
      )}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className="text-foreground">{agent.avatar}</span>
      {showPulse && agent.isActive && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-foreground rounded-full" />
      )}
    </motion.div>
  );
}
