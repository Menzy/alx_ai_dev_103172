"use client";

import { Poll } from "@/lib/types/poll";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock } from "lucide-react";

interface PollSummaryProps {
  poll: Poll;
}

export function PollSummary({ poll }: PollSummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const isExpired = poll.expiresAt && new Date() > poll.expiresAt;
  const daysUntilExpiry = poll.expiresAt 
    ? Math.ceil((poll.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">{poll.title}</CardTitle>
            {poll.description && (
              <CardDescription className="text-base">
                {poll.description}
              </CardDescription>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            poll.isActive && !isExpired
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
            {poll.isActive && !isExpired ? "Active" : "Inactive"}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{poll.totalVotes} total votes</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(poll.createdAt)}</span>
          </div>
          {poll.expiresAt && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {isExpired 
                  ? `Expired ${formatDate(poll.expiresAt)}`
                  : daysUntilExpiry && daysUntilExpiry > 0
                    ? `${daysUntilExpiry} days remaining`
                    : "Expires today"
                }
              </span>
            </div>
          )}
        </div>
        
        {!poll.allowMultipleVotes && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can only vote once in this poll.
            </p>
          </div>
        )}
        
        {isExpired && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>This poll has expired</strong> and is no longer accepting votes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}