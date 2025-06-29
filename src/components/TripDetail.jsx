import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, DollarSign, Plus, CheckSquare, Edit3, Save, X } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

function TripDetail({ trips, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === parseInt(id))
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(trip || {})
  const [newChecklistItem, setNewChecklistItem] = useState('')

  if (!trip) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">旅行计划未找到</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          返回首页
        </button>
      </div>
    )
  }

  const handleSave = () => {
    onUpdate(trip.id, editData)
    setIsEditing(false)
  }

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const updatedChecklist = [...(editData.checklist || []), {
        id: Date.now(),
        text: newChecklistItem.trim(),
        completed: false
      }]
      setEditData(prev => ({ ...prev, checklist: updatedChecklist }))
      setNewChecklistItem('')
    }
  }

  const toggleChecklistItem = (itemId) => {
    const updatedChecklist = editData.checklist?.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ) || []
    setEditData(prev => ({ ...prev, checklist: updatedChecklist }))
  }

  const removeChecklistItem = (itemId) => {
    const updatedChecklist = editData.checklist?.filter(item => item.id !== itemId) || []
    setEditData(prev => ({ ...prev, checklist: updatedChecklist }))
  }

  const currentData = isEditing ? editData : trip

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{currentData.title}</h1>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
          <span>{isEditing ? '保存' : '编辑'}</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左侧：基本信息 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">旅行标题</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">目的地</label>
                    <input
                      type="text"
                      value={editData.destination}
                      onChange={(e) => setEditData(prev => ({ ...prev, destination: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">开始日期</label>
                    <input
                      type="date"
                      value={editData.startDate}
                      onChange={(e) => setEditData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">结束日期</label>
                    <input
                      type="date"
                      value={editData.endDate}
                      onChange={(e) => setEditData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预算 (元)</label>
                  <input
                    type="number"
                    value={editData.budget || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, budget: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                  <textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="input-field"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{currentData.destination}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span>
                    {format(new Date(currentData.startDate), 'yyyy年MM月dd日', { locale: zhCN })} - 
                    {format(new Date(currentData.endDate), 'MM月dd日', { locale: zhCN })}
                  </span>
                </div>
                {currentData.budget && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>预算: ¥{currentData.budget.toLocaleString()}</span>
                  </div>
                )}
                {currentData.description && (
                  <p className="text-gray-700">{currentData.description}</p>
                )}
              </div>
            )}
          </div>

          {/* 目的地列表 */}
          {currentData.destinations && currentData.destinations.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">目的地列表</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {currentData.destinations.map((dest, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={16} className="text-primary-600" />
                    <span className="text-gray-700">{dest}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右侧：旅行清单 */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">旅行清单</h2>
            
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                className="input-field flex-1"
                placeholder="添加清单项目"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="btn-primary px-3"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {(currentData.checklist || []).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-1 rounded ${
                      item.completed ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    <CheckSquare size={16} fill={item.completed ? 'currentColor' : 'none'} />
                  </button>
                  <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                  <button
                    onClick={() => removeChecklistItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {(!currentData.checklist || currentData.checklist.length === 0) && (
              <p className="text-gray-500 text-center py-4">还没有清单项目</p>
            )}
          </div>

          {/* 状态信息 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">状态信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">状态</span>
                <span className="text-primary-600 font-medium">{currentData.status || '计划中'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">创建时间</span>
                <span className="text-gray-700">
                  {format(new Date(currentData.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
                </span>
              </div>
              {currentData.checklist && (
                <div className="flex justify-between">
                  <span className="text-gray-600">清单完成度</span>
                  <span className="text-gray-700">
                    {currentData.checklist.filter(item => item.completed).length} / {currentData.checklist.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetail 