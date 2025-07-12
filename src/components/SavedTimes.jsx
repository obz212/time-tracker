import React from 'react'

const SavedTimes = ({ savedTimes, onLoadTime, onDeleteTime, currentTime }) => {
  const calculateElapsedTime = (startTime) => {
    const start = new Date(startTime)
    const diffInMs = currentTime.getTime() - start.getTime()
    
    if (diffInMs < 0) return { days: 0, hours: 0, minutes: 0 }
    
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return { days, hours, minutes }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCreatedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span role="img" aria-label="saved">📚</span>
        Saved Times
      </h2>
      
      <div className="space-y-4">
        {savedTimes.map((savedTime) => {
          const elapsed = calculateElapsedTime(savedTime.startTime)
          const startDate = new Date(savedTime.startTime)
          
          return (
            <div key={savedTime.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {savedTime.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Started: {formatDate(savedTime.startTime)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Saved: {formatCreatedDate(savedTime.createdAt)}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => onLoadTime(savedTime)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center gap-1"
                  >
                    <span role="img" aria-label="load">🔄</span>
                    Load
                  </button>
                  <button
                    onClick={() => onDeleteTime(savedTime.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center gap-1"
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Time Elapsed:</span>
                  <div className="flex items-center gap-4 text-sm">
                    {elapsed.days > 0 && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {elapsed.days}d
                      </span>
                    )}
                    {elapsed.hours > 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {elapsed.hours}h
                      </span>
                    )}
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {elapsed.minutes}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {savedTimes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <span role="img" aria-label="empty" className="text-4xl mb-4 block">📝</span>
          <p>No saved times yet. Start tracking a time and save it to see it here!</p>
        </div>
      )}
    </div>
  )
}

export default SavedTimes 