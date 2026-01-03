import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { AgentAvatar } from './AgentAvatar';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface AgentSelectorProps {
  agents: Agent[];
  onToggle: (agentId: string) => void;
}

export function AgentSelector({ agents, onToggle }: AgentSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2">
        Combatants
      </h3>
      
      <div className="space-y-1">
        {agents.map((agent, index) => (
          <motion.button
            key={agent.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onToggle(agent.id)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-lg transition-all',
              'hover:bg-secondary/80',
              agent.isActive ? 'bg-secondary' : 'opacity-50'
            )}
          >
            <AgentAvatar agent={agent} size="sm" showPulse />
            
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-foreground">{agent.name}</div>
              <div className="text-xs text-muted-foreground truncate">{agent.description}</div>
            </div>
            
            {agent.isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-background" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
