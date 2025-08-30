"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Poll } from "@/lib/types/poll";
import { pollService } from "@/lib/data/polls";
import { Calendar, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPolls = async () => {
      try {
        setLoading(true);
        setError(null);
        const pollData = await pollService.getPolls();
        setPolls(pollData);
      } catch (err) {
        setError("Failed to load polls");
        console.error("Error loading polls:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPolls();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const isExpired = (poll: Poll) => {
    return poll.expiresAt && new Date() > poll.expiresAt;
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
                <p className="text-gray-600">Loading polls...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Error Loading Polls
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Active Polls
            </h1>
            <p className="text-gray-600">
              Participate in ongoing polls and see real-time results
            </p>
          </div>

          <div className="grid gap-6">
            {polls.map((poll) => (
              <Link key={poll.id} href={`/polls/${poll.id}`} className="group">
                <Card className="group-hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="group-hover:text-blue-600 transition-colors">
                          {poll.title}
                        </CardTitle>
                        {poll.description && (
                          <CardDescription className="text-base">
                            {poll.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                        poll.isActive && !isExpired(poll) 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {poll.isActive && !isExpired(poll) ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{poll.totalVotes} votes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Created {formatDate(poll.createdAt)}</span>
                      </div>
                      {poll.expiresAt && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {isExpired(poll) 
                              ? `Expired ${formatDate(poll.expiresAt)}`
                              : `Expires ${formatDate(poll.expiresAt)}`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-500">Options: </span>
                      <span className="text-gray-700">
                        {poll.options.slice(0, 3).map(opt => opt.text).join(", ")}
                        {poll.options.length > 3 && ` +${poll.options.length - 3} more`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {polls.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No polls available
              </h2>
              <p className="text-gray-600">
                Check back later for new polls to participate in.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}