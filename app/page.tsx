"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Your Polling App
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A modern polling and authentication system built with Next.js 15, TypeScript, Supabase, and shadcn/ui components.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            {!loading && user ? (
              // Authenticated user
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              // Unauthenticated user
              <>
                <Link href="/auth/login">
                  <Button size="lg" className="px-8">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="px-8">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Sample Polls Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Try Our Polling Feature</h2>
              <Link href="/polls">
                <Button variant="outline">View All Polls</Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/polls/1" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm border group-hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Programming Languages</h3>
                  <p className="text-sm text-gray-600 mb-3">Vote for your favorite programming language</p>
                  <div className="text-xs text-blue-600 group-hover:underline">
                    View Poll →
                  </div>
                </div>
              </Link>
              <Link href="/polls/2" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm border group-hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Frontend Framework</h3>
                  <p className="text-sm text-gray-600 mb-3">Help choose our next project's tech stack</p>
                  <div className="text-xs text-blue-600 group-hover:underline">
                    View Poll →
                  </div>
                </div>
              </Link>
              <Link href="/polls/3" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm border group-hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Meeting Times</h3>
                  <p className="text-sm text-gray-600 mb-3">Choose the best time for team meetings</p>
                  <div className="text-xs text-blue-600 group-hover:underline">
                    View Poll →
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Polling Features</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Interactive poll voting</li>
                <li>✅ Real-time results display</li>
                <li>✅ Vote prevention for duplicate voting</li>
                <li>✅ Anonymous and authenticated voting</li>
                <li>✅ Poll status and expiry tracking</li>
                <li>✅ Responsive voting interface</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Authentication Features</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Secure login and registration</li>
                <li>✅ Email verification with Supabase</li>
                <li>✅ Password reset functionality</li>
                <li>✅ Protected routes and navigation</li>
                <li>✅ Form validation with TypeScript</li>
                <li>✅ Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
