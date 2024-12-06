'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I sign up for Worksite-Scheduler?",
    answer: "To sign up for Worksite-Scheduler, click on the 'Sign Up' button on the homepage. Fill in your details, including your name, email address, and create a password. Once you've completed the form, you'll receive a confirmation email. Click the link in the email to verify your account, and you're all set!"
  },
  {
    question: "How can I view available shifts?",
    answer: "After logging in, navigate to the Dashboard. You'll see a tab labeled 'Available Shifts'. Click on this tab to view all the shifts that are currently open and available for you to take."
  },
  {
    question: "How do I take a shift?",
    answer: "On the 'Available Shifts' tab, find a shift that suits your schedule. Click the 'Take Shift' button next to the shift you want. The shift will then be added to your 'My Shifts' tab, and removed from the available shifts list."
  },
  {
    question: "Can I cancel a shift I've taken?",
    answer: "Yes, you can cancel a shift you've taken. Go to the 'My Shifts' tab on the Dashboard. Find the shift you want to cancel and click the 'Cancel Shift' button. Please note that there may be restrictions on how close to the shift start time you can cancel, so make sure to check our cancellation policy."
  },
  {
    question: "How do I contact my team members?",
    answer: "You can find contact information for your team members on the 'Teams' page. This page displays each team member's name, role, email, and phone number. For direct communication, we recommend using the email provided."
  },
  {
    question: "What should I do if I'm running late for my shift?",
    answer: "If you're running late for your shift, it's important to communicate this as soon as possible. Contact your immediate supervisor or the shift manager using the contact information provided in your shift details. Be prepared to provide an estimated arrival time."
  },
  {
    question: "How do I update my personal information?",
    answer: "To update your personal information, click on your profile icon in the top right corner of the dashboard. Select 'Profile Settings' from the dropdown menu. Here, you can edit your personal details, contact information, and notification preferences."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Worksite-Scheduler</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <Navbar />
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            >
              <button
                className="w-full text-left px-6 py-4 focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <motion.div
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </motion.div>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="px-6 py-4 bg-gray-50"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}