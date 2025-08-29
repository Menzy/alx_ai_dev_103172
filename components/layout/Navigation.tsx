"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export function Navigation() {
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Auth App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : user ? (
              // Authenticated user
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              // Unauthenticated user
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}