import React, { useState, useEffect } from 'react'
import TimeDisplay from './components/TimeDisplay'
import DateTimeInput from './components/DateTimeInput'
import SavedTimes from './components/SavedTimes'

function App() {
  const [startTime, setStartTime] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [savedTimes, setSavedTimes] = useState([])

  // Load saved times from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedTimes')
    if (saved) {
      try {
        setSavedTimes(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved times:', error)
      }
    }
  }, [])

  // Save times to localStorage whenever savedTimes changes
  useEffect(() => {
    localStorage.setItem('savedTimes', JSON.stringify(savedTimes))
  }, [savedTimes])

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleDateTimeChange = (dateTime) => {
    setStartTime(dateTime)
  }

  const handleSaveTime = (name) => {
    if (!startTime) return

    const newSavedTime = {
      id: Date.now(),
      name: name || `Time ${savedTimes.length + 1}`,
      startTime: startTime.toISOString(),
      createdAt: new Date().toISOString()
    }

    setSavedTimes(prev => [...prev, newSavedTime])
  }

  const handleLoadTime = (savedTime) => {
    setStartTime(new Date(savedTime.startTime))
  }

  const handleDeleteTime = (id) => {
    setSavedTimes(prev => prev.filter(time => time.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Time Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Track how much time has passed since a specific moment
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <DateTimeInput onDateTimeChange={handleDateTimeChange} />
        </div>

        {startTime && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <TimeDisplay 
              startTime={startTime} 
              currentTime={currentTime}
              onSaveTime={handleSaveTime}
            />
          </div>
        )}

        {savedTimes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <SavedTimes 
              savedTimes={savedTimes}
              onLoadTime={handleLoadTime}
              onDeleteTime={handleDeleteTime}
              currentTime={currentTime}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App 