import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Calendar, DollarSign, CheckSquare, Settings, Terminal, Monitor } from 'lucide-react'
import TripList from './components/TripList'
import TripDetail from './components/TripDetail'
import CreateTrip from './components/CreateTrip'
import FileManager from './components/FileManager'
import './App.css'

function App() {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('travelTrips')
    return saved ? JSON.parse(saved) : []
  })
  const [mode, setMode] = useState('travel') // 'travel' 或 'terminal'

  useEffect(() => {
    localStorage.setItem('travelTrips', JSON.stringify(trips))
  }, [trips])

  const addTrip = (trip) => {
    setTrips([...trips, { ...trip, id: Date.now() }])
  }

  const updateTrip = (id, updatedTrip) => {
    setTrips(trips.map(trip => trip.id === id ? { ...trip, ...updatedTrip } : trip))
  }

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id))
  }

  // 如果是终端模式，直接显示文件管理器
  if (mode === 'terminal') {
    return (
      <div className="min-h-screen">
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMode('travel')}
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <Monitor size={16} />
              <span>切换到旅行模式</span>
            </button>
          </div>
          <div className="text-sm text-gray-400">终端文件管理器</div>
        </div>
        <FileManager />
      </div>
    )
  }

  // 旅行计划模式
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation mode={mode} setMode={setMode} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TripList trips={trips} onDelete={deleteTrip} />} />
            <Route path="/create" element={<CreateTrip onAdd={addTrip} />} />
            <Route path="/trip/:id" element={<TripDetail trips={trips} onUpdate={updateTrip} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Navigation({ mode, setMode }) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: MapPin, label: '旅行计划' },
    { path: '/create', icon: Plus, label: '创建计划' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-primary-600">旅行计划助手</h1>
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          
          {/* 模式切换按钮 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMode('terminal')}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Terminal size={16} />
              <span>终端模式</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default App 