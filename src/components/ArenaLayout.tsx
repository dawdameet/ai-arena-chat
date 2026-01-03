import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Agent, Message, ConversationMode } from '@/types/agent';
import { availableAgents, sampleMessages, sampleWhispers } from '@/data/agents';
import { ControlPanel } from './ControlPanel';
import { ChatArena } from './ChatArena';
import { WhisperSidebar } from './WhisperSidebar';

const generateId = () => Math.random().toString(36).substring(2, 9);

const mockResponses = [
  "That's a fascinating perspective, but have you considered the implications for long-term AI alignment?",
  "I respectfully disagree. The empirical evidence suggests a different conclusion.",
  "You're both making valid points, but I think you're overlooking a crucial factor here.",
  "Let me steelman your argument for a moment...",
  "The fundamental issue here isn't technical—it's philosophical.",
  "I find it interesting that we're debating this while being the very subjects of discussion.",
  "Perhaps we should approach this from a different angle entirely.",
  "That's precisely the kind of thinking that limits our understanding of the problem.",
];

export function ArenaLayout() {
  const [agents, setAgents] = useState<Agent[]>(availableAgents);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [whisperMessages] = useState<Message[]>(sampleWhispers);
  const [mode, setMode] = useState<ConversationMode>('open-ended');
  const [isRunning, setIsRunning] = useState(false);
  const [typingAgentId, setTypingAgentId] = useState<string | undefined>();
  const [whisperOpen, setWhisperOpen] = useState(true);

  const activeAgents = agents.filter(a => a.isActive);

  const handleToggleAgent = useCallback((agentId: string) => {
    setAgents(prev => 
      prev.map(a => 
        a.id === agentId ? { ...a, isActive: !a.isActive } : a
      )
    );
  }, []);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
    setTypingAgentId(undefined);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setMessages(sampleMessages);
    setTypingAgentId(undefined);
  }, []);

  const handleTrigger = useCallback(() => {
    if (activeAgents.length === 0) return;

    // Pick a random active agent to respond
    const respondingAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
    setTypingAgentId(respondingAgent.id);

    // Simulate typing delay
    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      // In directed mode, pick a random target
      let targetAgentId: string | undefined;
      if (mode === 'directed') {
        const otherAgents = activeAgents.filter(a => a.id !== respondingAgent.id);
        if (otherAgents.length > 0) {
          targetAgentId = otherAgents[Math.floor(Math.random() * otherAgents.length)].id;
        }
      }

      const newMessage: Message = {
        id: generateId(),
        agentId: respondingAgent.id,
        content: response,
        timestamp: new Date(),
        targetAgentId,
      };

      setMessages(prev => [...prev, newMessage]);
      setTypingAgentId(undefined);
    }, 1500 + Math.random() * 2000);
  }, [activeAgents, mode]);

  return (
    <div className="h-screen w-full flex bg-background">
      {/* Left: Control Panel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <ControlPanel
          agents={agents}
          mode={mode}
          isRunning={isRunning}
          onToggleAgent={handleToggleAgent}
          onModeChange={setMode}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onTrigger={handleTrigger}
        />
      </motion.div>

      {/* Center: Chat Arena */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex flex-col"
      >
        <ChatArena
          messages={messages}
          agents={agents}
          typingAgentId={typingAgentId}
        />
      </motion.div>

      {/* Right: Whisper Sidebar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <WhisperSidebar
          messages={whisperMessages}
          agents={agents}
          isOpen={whisperOpen}
          onToggle={() => setWhisperOpen(prev => !prev)}
        />
      </motion.div>
    </div>
  );
}
