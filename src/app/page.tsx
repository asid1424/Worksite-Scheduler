"use client";

import { useEffect } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Calendar, LayoutDashboard, Clock, Users, BarChart } from 'lucide-react';

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-green-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">Worksite</span>
          </div>
          <SignInButton mode="modal">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Sign In
            </button>
          </SignInButton>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Streamline Your <span className="text-purple-600">Worksite Scheduling</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Boost productivity and simplify team coordination with our intuitive scheduling platform. Manage your time effortlessly and stay on top of your projects.
          </p>
          <SignInButton mode="modal">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Get Started
            </button>
          </SignInButton>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-purple-600" />}
            title="Easy Scheduling"
            description="Effortlessly manage shifts and appointments"
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-green-600" />}
            title="Time Tracking"
            description="Precise work hour monitoring"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-yellow-600" />}
            title="Team Collaboration"
            description="Seamless coordination with team members"
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-purple-600" />}
            title="Insightful Analytics"
            description="Gain valuable insights from your data"
          />
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Worksite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  )
}