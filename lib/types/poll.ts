// Poll types for the polling application
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  allowMultipleVotes: boolean;
}

export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId?: string; // Optional for anonymous voting
  createdAt: Date;
}

export interface VoteSubmission {
  pollId: string;
  optionId: string;
  userId?: string;
}

export interface PollResults {
  poll: Poll;
  userVote?: Vote;
  hasVoted: boolean;
}