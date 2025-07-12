import React, { useState } from 'react'

const TimeDisplay = ({ startTime, currentTime, onSaveTime }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveName, setSaveName] = useState('')

  const calculateTimeDifference = () => {
    const diffInMs = currentTime.getTime() - startTime.getTime()
    if (diffInMs < 0) {
      return {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0
      }
    }
    const seconds = Math.floor(diffInMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    let months = (currentTime.getFullYear() - startTime.getFullYear()) * 12 + (currentTime.getMonth() - startTime.getMonth())
    if (currentTime.getDate() < startTime.getDate()) {
      months--
    }
    months = Math.max(0, months)
    return {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours % 24,
      days: days % 7,
      weeks: weeks % 4,
      months
    }
  }

  const formatNumber = (num) => num.toLocaleString()
  const timeDiff = calculateTimeDifference()
  const timeUnits = [
    { label: 'Months', value: timeDiff.months, color: 'bg-pink-600', icon: '📅' },
    { label: 'Weeks', value: timeDiff.weeks, color: 'bg-purple-700', icon: '🗓️' },
    { label: 'Days', value: timeDiff.days, color: 'bg-blue-600', icon: '📆' },
    { label: 'Hours', value: timeDiff.hours, color: 'bg-green-600', icon: '⏳' },
    { label: 'Minutes', value: timeDiff.minutes, color: 'bg-yellow-500', icon: '⏱️' },
    { label: 'Seconds', value: timeDiff.seconds, color: 'bg-red-600', icon: '⏲️' }
  ]

  const handleSave = () => {
    if (saveName.trim()) {
      onSaveTime(saveName.trim())
      setSaveName('')
      setShowSaveDialog(false)
    }
  }

  const handleQuickSave = () => {
    onSaveTime('')
    setShowSaveDialog(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="clock">⏰</span>
          Time Elapsed
        </h2>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
        >
          <span role="img" aria-label="save">💾</span>
          Save Time
        </button>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Save Time Tracking</h3>
            <input
              type="text"
              placeholder="Enter a name for this time (optional)"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Save with Name
              </button>
              <button
                onClick={handleQuickSave}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Quick Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
        {timeUnits.map((unit, index) => (
          <div key={index} className={`flex flex-col items-center justify-center ${unit.color} rounded-lg p-4 shadow-md`}>
            <span className="text-3xl md:text-4xl font-extrabold text-white mb-1 flex items-center justify-center">
              {unit.icon} {formatNumber(unit.value)}
            </span>
            <span className="text-xs md:text-sm font-medium text-white tracking-wide uppercase opacity-90">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-base font-semibold text-gray-700 mb-1">Start Time</h3>
        <p className="text-gray-900 font-bold text-lg">{startTime.toLocaleString()}</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-1">Current Time</h3>
        <p className="text-gray-900 font-bold text-lg">{currentTime.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default TimeDisplay 