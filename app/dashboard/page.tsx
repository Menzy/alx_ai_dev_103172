import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h2>
              <p className="text-gray-600 mb-4">
                This is a protected page that only authenticated users can access.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Protected Content</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    This content is only visible to logged-in users.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900">Secure Area</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your data is protected by Supabase authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}