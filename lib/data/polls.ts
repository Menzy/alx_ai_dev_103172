// Mock poll data and service functions
import { Poll, PollOption, Vote, VoteSubmission, PollResults } from "@/lib/types/poll";

// Mock poll data
export const mockPolls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Vote for the programming language you enjoy working with the most.",
    options: [
      { id: "1a", text: "JavaScript/TypeScript", votes: 45 },
      { id: "1b", text: "Python", votes: 32 },
      { id: "1c", text: "Java", votes: 18 },
      { id: "1d", text: "Rust", votes: 12 },
      { id: "1e", text: "Go", votes: 8 }
    ],
    totalVotes: 115,
    createdAt: new Date("2025-01-15"),
    expiresAt: new Date("2025-12-31"),
    isActive: true,
    allowMultipleVotes: false
  },
  {
    id: "2",
    title: "Which frontend framework should we use for our next project?",
    description: "Help us decide on the technology stack for our upcoming web application.",
    options: [
      { id: "2a", text: "React", votes: 67 },
      { id: "2b", text: "Vue.js", votes: 23 },
      { id: "2c", text: "Angular", votes: 15 },
      { id: "2d", text: "Svelte", votes: 9 }
    ],
    totalVotes: 114,
    createdAt: new Date("2025-02-01"),
    expiresAt: new Date("2025-12-31"),
    isActive: true,
    allowMultipleVotes: false
  },
  {
    id: "3",
    title: "What's the best time for team meetings?",
    description: "Choose the time slot that works best for most team members.",
    options: [
      { id: "3a", text: "9:00 AM - 10:00 AM", votes: 28 },
      { id: "3b", text: "10:00 AM - 11:00 AM", votes: 42 },
      { id: "3c", text: "2:00 PM - 3:00 PM", votes: 31 },
      { id: "3d", text: "3:00 PM - 4:00 PM", votes: 19 }
    ],
    totalVotes: 120,
    createdAt: new Date("2025-02-10"),
    expiresAt: new Date("2026-03-31"),
    isActive: true,
    allowMultipleVotes: false
  }
];

// Mock votes storage (in a real app, this would be in a database)
let mockVotes: Vote[] = [];

export const pollService = {
  // Get all polls
  async getPolls(): Promise<Poll[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPolls;
  },

  // Get a single poll by ID
  async getPollById(id: string): Promise<Poll | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPolls.find(poll => poll.id === id) || null;
  },

  // Submit a vote
  async submitVote(voteData: VoteSubmission): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const poll = mockPolls.find(p => p.id === voteData.pollId);
    if (!poll) {
      return { success: false, message: "Poll not found" };
    }

    if (!poll.isActive) {
      return { success: false, message: "This poll is no longer active" };
    }

    // Check if user already voted (for single-vote polls)
    if (!poll.allowMultipleVotes && voteData.userId) {
      const existingVote = mockVotes.find(v => 
        v.pollId === voteData.pollId && v.userId === voteData.userId
      );
      if (existingVote) {
        return { success: false, message: "You have already voted in this poll" };
      }
    }

    // Create new vote
    const newVote: Vote = {
      id: Math.random().toString(36).substr(2, 9),
      pollId: voteData.pollId,
      optionId: voteData.optionId,
      userId: voteData.userId,
      createdAt: new Date()
    };

    mockVotes.push(newVote);

    // Update poll option vote count
    const option = poll.options.find(o => o.id === voteData.optionId);
    if (option) {
      option.votes += 1;
      poll.totalVotes += 1;
    }

    return { success: true, message: "Vote submitted successfully!" };
  },

  // Get poll results with user vote status
  async getPollResults(pollId: string, userId?: string): Promise<PollResults | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const poll = await this.getPollById(pollId);
    if (!poll) return null;

    let userVote: Vote | undefined;
    let hasVoted = false;

    if (userId) {
      userVote = mockVotes.find(v => 
        v.pollId === pollId && v.userId === userId
      );
      hasVoted = !!userVote;
    }

    return {
      poll,
      userVote,
      hasVoted
    };
  },

  // Check if user has voted
  async hasUserVoted(pollId: string, userId?: string): Promise<boolean> {
    if (!userId) return false;
    
    return mockVotes.some(v => 
      v.pollId === pollId && v.userId === userId
    );
  }
};