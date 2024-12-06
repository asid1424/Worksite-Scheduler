import Link from 'next/link'
import { LayoutDashboard, Users, HelpCircle } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center px-2 py-2 text-gray-700 hover:text-purple-600">
              <LayoutDashboard className="h-6 w-6 mr-2" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/teams" className="flex items-center px-2 py-2 text-gray-700 hover:text-purple-600 ml-4">
              <Users className="h-6 w-6 mr-2" />
              <span className="font-medium">Teams</span>
            </Link>
            <Link href="/faq" className="flex items-center px-2 py-2 text-gray-700 hover:text-purple-600 ml-4">
              <HelpCircle className="h-6 w-6 mr-2" />
              <span className="font-medium">FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}