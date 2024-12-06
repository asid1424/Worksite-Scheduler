'use client'

import { Navbar } from '../components/Navbar'
import { UserButton } from '@clerk/nextjs'
import { Users, LayoutDashboard, Mail, Phone, MapPin, Linkedin, Instagram, Github } from 'lucide-react'

const teamMembers = [
  { 
    name: 'Arman Aziz', 
    role: 'Team Lead', 
    avatar: '/arman.jpg',
    email: 'azizarman94@gmail.com',
    phone: '(646) 623-1231',
    location: 'Brooklyn, NY',
    bio: 'Experienced team lead with a passion for delivering high-quality projects on time.',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    instagram: 'https://instagram.com/johndoe',
    github: 'https://github.com/johndoe'
  },
  { 
    name: 'Ahmed Sidahmed', 
    role: 'Senior Developer', 
    avatar: '/ahmed.jpg',
    email: 'ahmedsidahmed416@gmail.com',
    phone: '(929) 245-3932',
    location: 'Brooklyn, NY',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies.',
    linkedin: 'https://www.linkedin.com/in/janesmith',
    instagram: 'https://instagram.com/janesmith',
    github: 'https://github.com/janesmith'
  },
  { 
    name: 'Jayden Clermont', 
    role: 'UX Designer', 
    avatar: '/jayden.png',
    email: 'jayclermont2303@gmail.com',
    phone: '(800) 493-7562',
    location: 'Brooklyn, NY',
    bio: 'Creative designer focused on crafting intuitive and beautiful user experiences.',
    linkedin: 'https://www.linkedin.com/in/mikejohnson',
    instagram: 'https://instagram.com/mikejohnson',
    github: 'https://github.com/mikejohnson'
  },
]

export default function TeamsPage() {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Team</h2>
          <p className="text-xl text-gray-600">Meet the talented individuals behind Worksite-Scheduler</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-4">
                  <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-semibold">{member.role}</p>
                </div>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{member.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-center space-x-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                    <Instagram className="w-6 h-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                    <Github className="w-6 h-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}