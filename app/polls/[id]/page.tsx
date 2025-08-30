"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { PollSummary } from "@/components/poll/PollSummary";
import { VotingForm } from "@/components/poll/VotingForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { pollService } from "@/lib/data/polls";
import { Poll, PollOption } from "@/lib/types/poll";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

export default function PollDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const pollId = params.id as string;

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVoteOption, setUserVoteOption] = useState<PollOption | null>(null);
  const [voteMessage, setVoteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load poll data and check if user has voted
  useEffect(() => {
    const loadPollData = async () => {
      try {
        setLoading(true);
        setError(null);

        const pollData = await pollService.getPollById(pollId);
        if (!pollData) {
          setError("Poll not found");
          return;
        }

        setPoll(pollData);

        // Check if user has voted
        if (user?.id) {
          const voted = await pollService.hasUserVoted(pollId, user.id);
          setHasVoted(voted);

          if (voted) {
            // Get poll results to find user's vote
            const results = await pollService.getPollResults(pollId, user.id);
            if (results?.userVote) {
              const votedOption = pollData.options.find(opt => opt.id === results.userVote?.optionId);
              setUserVoteOption(votedOption || null);
            }
          }
        }
      } catch (err) {
        setError("Failed to load poll data");
        console.error("Error loading poll:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pollId) {
      loadPollData();
    }
  }, [pollId, user?.id]);

  const handleVoteSubmitted = async (success: boolean, message: string, optionId?: string) => {
    setVoteMessage({ type: success ? "success" : "error", text: message });

    if (success && optionId) {
      // Reload poll data to get updated vote counts
      try {
        const updatedPoll = await pollService.getPollById(pollId);
        if (updatedPoll) {
          setPoll(updatedPoll);
          setHasVoted(true);

          // Find the user's voted option using the optionId
          const votedOption = updatedPoll.options.find(opt => opt.id === optionId);
          setUserVoteOption(votedOption || null);
        }
      } catch (err) {
        console.error("Error reloading poll data:", err);
      }
    }

    // Clear message after 5 seconds
    setTimeout(() => setVoteMessage(null), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-gray-600">Loading poll...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {error || "Poll not found"}
              </h1>
              <p className="text-gray-600 mb-6">
                The poll you're looking for might have been removed or doesn't exist.
              </p>
              <Link href="/">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="space-y-6">
            <PollSummary poll={poll} />

            {voteMessage && (
              <div className={`p-4 rounded-lg ${
                voteMessage.type === "success" 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {voteMessage.text}
              </div>
            )}

            {!user ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Sign in to vote
                </h3>
                <p className="text-blue-800 mb-4">
                  You need to be logged in to participate in this poll.
                </p>
                <div className="space-x-4">
                  <Link href="/auth/login">
                    <Button>Sign In</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="outline">Create Account</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <VotingForm 
                poll={poll}
                onVoteSubmitted={handleVoteSubmitted}
                hasVoted={hasVoted}
                userVoteOption={userVoteOption || undefined}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}