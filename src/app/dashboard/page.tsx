'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { UserButton, useUser } from '@clerk/nextjs';
import { Calendar, Clock, XCircle, CheckCircle, LayoutDashboard, Briefcase, MapPin, Filter } from 'lucide-react';
import { Shift } from './types';
import { Navbar } from '../components/Navbar'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('available');
  const [availableShifts, setAvailableShifts] = useState<Shift[]>([]);
  const [myShifts, setMyShifts] = useState<Shift[]>([]);
  const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByJob, setFilterByJob] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const fetchShifts = async () => {
      const { data: allShifts, error } = await supabase.from('shifts').select('*');
      if (!error && allShifts) {
        setAvailableShifts(allShifts.filter((shift: Shift) => !shift.taken_by));
        setFilteredShifts(allShifts.filter((shift: Shift) => !shift.taken_by));
        setMyShifts(allShifts.filter((shift: Shift) => shift.taken_by === user?.id));
      }
    }

    if (user) fetchShifts();
  }, [user]);

  useEffect(() => {
    let filtered = availableShifts;

    if (filterByDate) {
      filtered = filtered.filter((shift) => shift.date === filterByDate);
    }

    if (filterByJob) {
      filtered = filtered.filter((shift) =>
        shift.position.toLowerCase().includes(filterByJob.toLowerCase())
      )
    }

    setFilteredShifts(filtered);
  }, [filterByDate, filterByJob, availableShifts]);

  const takeShift = async (shiftId: number, shiftDate: string) => {
    if (!user) {
      alert('User is not logged in.');
      return;
    }
  
    const hasShiftOnSameDay = myShifts.some((shift) => shift.date === shiftDate);
  
    if (hasShiftOnSameDay) {
      alert('You already have a shift on this day.');
      return;
    }
  
    const { error } = await supabase
      .from('shifts')
      .update({ taken_by: user.id })
      .eq('id', shiftId)
      .is('taken_by', null);
  
    if (!error) {
      setAvailableShifts((prev) => prev.filter((shift) => shift.id !== shiftId));
      setMyShifts((prev) => [
        ...prev,
        availableShifts.find((shift) => shift.id === shiftId) as Shift,
      ])
    } else {
      alert('Failed to take the shift.');
    }
  }
  

  const cancelShift = async (shiftId: number) => {
    if (!user) {
      alert('User is not logged in.');
      return;
    }
  
    const { error } = await supabase
      .from('shifts')
      .update({ taken_by: null })
      .eq('id', shiftId)
      .eq('taken_by', user.id);
  
    if (!error) {
      setMyShifts((prev) => prev.filter((shift) => shift.id !== shiftId));
      setAvailableShifts((prev) => [
        ...prev,
        myShifts.find((shift) => shift.id === shiftId) as Shift,
      ]);
    } else {
      alert('Failed to cancel the shift.');
    }
  }
  

  const tabs = [
    { id: 'available', label: 'Available Shifts', icon: <Calendar className="w-5 h-5" /> },
    { id: 'my-shifts', label: 'My Shifts', icon: <Clock className="w-5 h-5" /> },
  ]

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 bg-purple-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center justify-center transition duration-150 ease-in-out`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'available' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Available Shifts</h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Filters:</span>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      id="date-filter"
                      type="date"
                      value={filterByDate}
                      onChange={(e) => setFilterByDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="job-filter" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <input
                      id="job-filter"
                      type="text"
                      value={filterByJob}
                      onChange={(e) => setFilterByJob(e.target.value)}
                      className="w-full p-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g. Cashier, Barista"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                          <p className="font-semibold text-gray-700">{shift.date}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <p className="text-sm">
                            {shift.time_range_start} - {shift.time_range_end}
                          </p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <p className="text-sm">{shift.position}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <p className="text-sm">Main Office</p>                        
                        </div>
                      </div>
                      <button
                        onClick={() => takeShift(shift.id, shift.date)}
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Take Shift
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'my-shifts' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Shifts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-green-500 mr-2" />
                          <p className="font-semibold text-gray-700">{shift.date}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                          Confirmed
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <p className="text-sm">
                            {shift.time_range_start} - {shift.time_range_end}
                          </p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <p className="text-sm">{shift.position}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <p className="text-sm">Main Office</p>                        
                        </div>
                      </div>
                      <button
                        onClick={() => cancelShift(shift.id)}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Cancel Shift
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}