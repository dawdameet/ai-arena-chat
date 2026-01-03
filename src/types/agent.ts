export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  isActive: boolean;
}

export interface Message {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  targetAgentId?: string; // For directed messages
  isWhisper?: boolean;
}

export type ConversationMode = 'directed' | 'open-ended';

export interface ArenaState {
  agents: Agent[];
  messages: Message[];
  whisperMessages: Message[];
  mode: ConversationMode;
  selectedTarget?: string;
  isTyping: boolean;
  typingAgentId?: string;
}
