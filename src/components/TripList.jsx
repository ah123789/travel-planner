import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, Trash2, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

function TripList({ trips, onDelete }) {
  const handleDelete = (e, id) => {
    e.preventDefault()
    if (window.confirm('确定要删除这个旅行计划吗？')) {
      onDelete(id)
    }
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有旅行计划</h3>
          <p className="text-gray-600 mb-6">开始创建你的第一个旅行计划吧！</p>
          <Link to="/create" className="btn-primary inline-flex items-center space-x-2">
            <Plus size={16} />
            <span>创建旅行计划</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">我的旅行计划</h2>
        <Link to="/create" className="btn-primary inline-flex items-center space-x-2">
          <Plus size={16} />
          <span>新建计划</span>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            to={`/trip/${trip.id}`}
            className="card hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <button
                onClick={(e) => handleDelete(e, trip.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">{trip.title}</h3>
              <p className="text-gray-600">{trip.destination}</p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>
                  {format(new Date(trip.startDate), 'yyyy年MM月dd日', { locale: zhCN })} - 
                  {format(new Date(trip.endDate), 'MM月dd日', { locale: zhCN })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <DollarSign size={14} />
                <span>预算: ¥{trip.budget?.toLocaleString() || '未设置'}</span>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500">
                  {trip.destinations?.length || 0} 个目的地
                </span>
                <span className="text-sm text-primary-600 font-medium">
                  {trip.status || '计划中'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TripList 