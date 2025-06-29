import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, X } from 'lucide-react'

function CreateTrip({ onAdd }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    destinations: []
  })
  const [newDestination, setNewDestination] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trip = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : null,
      status: '计划中',
      createdAt: new Date().toISOString()
    }
    onAdd(trip)
    navigate('/')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addDestination = () => {
    if (newDestination.trim()) {
      setFormData(prev => ({
        ...prev,
        destinations: [...prev.destinations, newDestination.trim()]
      }))
      setNewDestination('')
    }
  }

  const removeDestination = (index) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">创建新的旅行计划</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                旅行标题 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="例如：日本关西之旅"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                主要目的地 *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="例如：大阪、京都、奈良"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                开始日期 *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                结束日期 *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              预算 (元)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="input-field"
              placeholder="例如：5000"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              旅行描述
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="input-field"
              placeholder="描述你的旅行计划..."
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">详细目的地</h2>
          
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              className="input-field flex-1"
              placeholder="添加具体目的地"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDestination())}
            />
            <button
              type="button"
              onClick={addDestination}
              className="btn-primary px-4"
            >
              <Plus size={16} />
            </button>
          </div>

          {formData.destinations.length > 0 && (
            <div className="space-y-2">
              {formData.destinations.map((dest, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{dest}</span>
                  <button
                    type="button"
                    onClick={() => removeDestination(index)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary flex-1"
          >
            取消
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            创建旅行计划
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTrip 