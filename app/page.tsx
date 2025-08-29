import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/layout/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Your App
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A modern authentication system built with Next.js 15, TypeScript, and shadcn/ui components.
          </p>

          <div className="flex gap-4 justify-center mb-16">
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
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Authentication Features</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Secure login and registration</li>
                <li>✅ Form validation with TypeScript</li>
                <li>✅ Responsive design</li>
                <li>✅ Modern UI with shadcn/ui</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>⚡ Next.js 15 with App Router</li>
                <li>🔷 TypeScript for type safety</li>
                <li>🎨 Tailwind CSS styling</li>
                <li>🧩 shadcn/ui components</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
