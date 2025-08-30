"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Poll, PollOption } from "@/lib/types/poll";
import { pollService } from "@/lib/data/polls";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/lib/contexts/AuthContext";

interface VotingFormProps {
  poll: Poll;
  onVoteSubmitted: (success: boolean, message: string, optionId?: string) => void;
  hasVoted?: boolean;
  userVoteOption?: PollOption;
}

export function VotingForm({ poll, onVoteSubmitted, hasVoted = false, userVoteOption }: VotingFormProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      onVoteSubmitted(false, "Please select an option before voting");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await pollService.submitVote({
        pollId: poll.id,
        optionId: selectedOption,
        userId: user?.id
      });

      onVoteSubmitted(result.success, result.message, result.success ? selectedOption : undefined);
    } catch (error) {
      onVoteSubmitted(false, "An error occurred while submitting your vote");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  if (hasVoted && userVoteOption) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center gap-2">
            <span>✅</span>
            Thank you for voting!
          </CardTitle>
          <CardDescription className="text-green-600">
            You voted for: <strong>{userVoteOption.text}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Current Results</h3>
            <div className="space-y-3">
              {poll.options.map((option) => (
                <div key={option.id} className={`space-y-2 p-3 rounded-lg ${
                  option.id === userVoteOption.id ? "bg-green-100 border border-green-300" : "bg-gray-50"
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      option.id === userVoteOption.id ? "text-green-800" : "text-gray-700"
                    }`}>
                      {option.text} {option.id === userVoteOption.id && "👈 Your vote"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {option.votes} votes ({calculatePercentage(option.votes)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        option.id === userVoteOption.id 
                          ? "bg-green-500" 
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${calculatePercentage(option.votes)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                Total votes: <strong>{poll.totalVotes}</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cast Your Vote</CardTitle>
        <CardDescription>
          Select one option below to participate in this poll
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={selectedOption} 
            onValueChange={setSelectedOption}
            disabled={isSubmitting}
          >
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label 
                  htmlFor={option.id} 
                  className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.text}
                </Label>
                <span className="text-xs text-gray-500">
                  {option.votes} votes
                </span>
              </div>
            ))}
          </RadioGroup>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              Total votes: {poll.totalVotes}
            </div>
            <Button 
              type="submit" 
              disabled={!selectedOption || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Voting...
                </>
              ) : (
                "Submit Vote"
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}