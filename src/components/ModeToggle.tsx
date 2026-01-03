import { motion } from 'framer-motion';
import { ConversationMode } from '@/types/agent';
import { cn } from '@/lib/utils';
import { Target, Shuffle } from 'lucide-react';

interface ModeToggleProps {
  mode: ConversationMode;
  onModeChange: (mode: ConversationMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2">
        Battle Mode
      </h3>
      
      <div className="flex gap-2 p-1 bg-secondary rounded-lg">
        <motion.button
          onClick={() => onModeChange('directed')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors',
            mode === 'directed' 
              ? 'bg-foreground text-background' 
              : 'text-muted-foreground hover:text-foreground'
          )}
          whileTap={{ scale: 0.98 }}
        >
          <Target className="w-4 h-4" />
          Directed
        </motion.button>
        
        <motion.button
          onClick={() => onModeChange('open-ended')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors',
            mode === 'open-ended' 
              ? 'bg-foreground text-background' 
              : 'text-muted-foreground hover:text-foreground'
          )}
          whileTap={{ scale: 0.98 }}
        >
          <Shuffle className="w-4 h-4" />
          Open
        </motion.button>
      </div>
    </div>
  );
}
