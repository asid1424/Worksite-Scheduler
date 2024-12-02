"use client";

import { useEffect } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, LayoutDashboard, Users } from 'lucide-react';

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <header className="p-5">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">Worksite-Scheduler</span>
            </div>
            <SignInButton mode="modal">
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50">
                Sign In
              </button>
            </SignInButton>
          </nav>
        </header>

        <main className="container mx-auto flex-grow flex flex-col justify-center items-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-down">
            Welcome to <span className="text-purple-300">Worksite-Scheduler</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto animate-fade-in-up">
            Simplify your life with our intuitive scheduling platform. Manage your time effortlessly and boost your productivity.
          </p>
          <SignInButton mode="modal">
            <button className="bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-400 transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 animate-bounce">
              Get Started
            </button>
          </SignInButton>

          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<CheckCircle className="h-12 w-12 text-purple-300" />}
              title="Easy Scheduling"
              description="Effortlessly manage your shifts and appointments"
            />
            <FeatureCard
              icon={<Clock className="h-12 w-12 text-purple-300" />}
              title="Time Tracking"
              description="Keep track of your work hours with precision"
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-purple-300" />}
              title="Team Collaboration"
              description="Seamlessly coordinate with your team members"
            />
          </div>
        </main>

        <footer className="w-full p-8 text-center text-purple-200">
          <p>&copy; 2024 Worksite-Scheduler. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg transform hover:scale-105 transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  )
}