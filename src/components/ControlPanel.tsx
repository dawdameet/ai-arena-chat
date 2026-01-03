import { motion } from 'framer-motion';
import { Agent, ConversationMode } from '@/types/agent';
import { AgentSelector } from './AgentSelector';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface ControlPanelProps {
  agents: Agent[];
  mode: ConversationMode;
  isRunning: boolean;
  onToggleAgent: (agentId: string) => void;
  onModeChange: (mode: ConversationMode) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onTrigger: () => void;
}

export function ControlPanel({
  agents,
  mode,
  isRunning,
  onToggleAgent,
  onModeChange,
  onStart,
  onPause,
  onReset,
  onTrigger,
}: ControlPanelProps) {
  const activeCount = agents.filter(a => a.isActive).length;

  return (
    <div className="w-72 h-full border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Control</h2>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {activeCount} agents active
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        <ModeToggle mode={mode} onModeChange={onModeChange} />
        <AgentSelector agents={agents} onToggle={onToggleAgent} />
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex gap-2">
          {isRunning ? (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onPause}
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          ) : (
            <Button
              variant="default"
              className="flex-1"
              onClick={onStart}
              disabled={activeCount < 2}
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          )}
          
          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={onTrigger}
          disabled={!isRunning}
        >
          <Zap className="w-4 h-4 mr-2" />
          Trigger Response
        </Button>
      </div>
    </div>
  );
}
