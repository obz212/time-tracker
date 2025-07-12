import React, { useState } from 'react'

const quickOptions = [
  { label: '1 hour ago', hours: 1 },
  { label: '1 day ago', hours: 24 },
  { label: '1 week ago', hours: 168 },
  { label: '1 month ago', hours: 720 },
]

const DateTimeInput = ({ onDateTimeChange }) => {
  const [dateTime, setDateTime] = useState('')
  const [activeQuick, setActiveQuick] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (dateTime) {
      onDateTimeChange(new Date(dateTime))
      setActiveQuick(null)
    }
  }

  const handleQuickSelect = (hours, idx) => {
    const now = new Date()
    const pastTime = new Date(now.getTime() - hours * 60 * 60 * 1000)
    onDateTimeChange(pastTime)
    setActiveQuick(idx)
    setDateTime('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Select Start Time
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <span role="img" aria-label="calendar">📅</span>
            Date and Time
          </label>
          <input
            type="datetime-local"
            id="datetime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-lg"
        >
          Start Tracking
        </button>
      </form>
      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
          Quick Select
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickOptions.map((opt, idx) => (
            <button
              key={opt.label}
              onClick={() => handleQuickSelect(opt.hours, idx)}
              className={`py-2 px-4 rounded-lg font-medium transition duration-200 text-gray-700 focus:outline-none
                ${activeQuick === idx
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                  : 'bg-gray-100 hover:bg-gray-200'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DateTimeInput 