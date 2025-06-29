import React, { useState, useEffect } from 'react'
import { Folder, FileText, ArrowLeft, Home, Trash2, Edit3, Plus, Search } from 'lucide-react'

function FileManager() {
  const [currentPath, setCurrentPath] = useState('/')
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  // 模拟文件系统
  const fileSystem = {
    '/': {
      type: 'folder',
      children: ['home', 'documents', 'downloads', 'pictures']
    },
    '/home': {
      type: 'folder',
      children: ['profile.txt', 'settings.json', 'notes.md']
    },
    '/documents': {
      type: 'folder',
      children: ['work', 'personal', 'projects']
    },
    '/documents/work': {
      type: 'folder',
      children: ['report.pdf', 'presentation.pptx', 'data.xlsx']
    },
    '/documents/personal': {
      type: 'folder',
      children: ['diary.txt', 'budget.xlsx', 'contacts.json']
    },
    '/documents/projects': {
      type: 'folder',
      children: ['travel-planner', 'todo-app', 'blog']
    },
    '/downloads': {
      type: 'folder',
      children: ['image.jpg', 'document.pdf', 'video.mp4']
    },
    '/pictures': {
      type: 'folder',
      children: ['vacation', 'family', 'screenshots']
    }
  }

  useEffect(() => {
    loadCurrentDirectory()
  }, [currentPath])

  const loadCurrentDirectory = () => {
    const currentDir = fileSystem[currentPath]
    if (currentDir && currentDir.children) {
      const fileList = currentDir.children.map(name => {
        const fullPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`
        const isFolder = !name.includes('.')
        return {
          name,
          path: fullPath,
          type: isFolder ? 'folder' : 'file',
          size: isFolder ? '-' : Math.floor(Math.random() * 1000) + ' KB',
          modified: new Date().toLocaleDateString()
        }
      })
      setFiles(fileList)
    }
  }

  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      setCurrentPath(file.path)
      setSelectedFile(null)
    } else {
      setSelectedFile(file)
      openFile(file)
    }
  }

  const openFile = (file) => {
    // 根据文件类型执行不同的操作
    const extension = file.name.split('.').pop()
    
    switch (extension) {
      case 'txt':
      case 'md':
        alert(`打开文本文件: ${file.name}\n路径: ${file.path}`)
        break
      case 'json':
        alert(`打开配置文件: ${file.name}\n路径: ${file.path}`)
        break
      case 'pdf':
        alert(`打开PDF文件: ${file.name}\n路径: ${file.path}`)
        break
      case 'jpg':
      case 'png':
      case 'gif':
        alert(`打开图片文件: ${file.name}\n路径: ${file.path}`)
        break
      case 'mp4':
      case 'avi':
        alert(`打开视频文件: ${file.name}\n路径: ${file.path}`)
        break
      default:
        alert(`打开文件: ${file.name}\n路径: ${file.path}`)
    }
  }

  const goBack = () => {
    if (currentPath !== '/') {
      const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/'
      setCurrentPath(parentPath)
    }
  }

  const goHome = () => {
    setCurrentPath('/')
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const createNewFile = () => {
    if (newFileName.trim()) {
      const newFile = {
        name: newFileName,
        path: `${currentPath}/${newFileName}`,
        type: 'file',
        size: '0 KB',
        modified: new Date().toLocaleDateString()
      }
      setFiles([...files, newFile])
      setNewFileName('')
      setShowCreateModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* 终端标题栏 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm">Terminal - File Manager</div>
        <div></div>
      </div>

      {/* 路径栏 */}
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
        <button
          onClick={goHome}
          className="p-1 hover:bg-gray-700 rounded"
          title="Home"
        >
          <Home size={16} />
        </button>
        <button
          onClick={goBack}
          disabled={currentPath === '/'}
          className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
          title="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-gray-300">$</span>
        <span className="text-blue-400">cd</span>
        <span className="text-yellow-400">{currentPath}</span>
      </div>

      {/* 搜索和操作栏 */}
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="搜索文件..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-green-400 px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-green-500 flex-1"
          />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          <Plus size={14} />
          <span>新建文件</span>
        </button>
      </div>

      {/* 文件列表 */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* 表头 */}
          <div className="bg-gray-700 px-4 py-2 grid grid-cols-12 gap-4 text-sm font-semibold">
            <div className="col-span-6">文件名</div>
            <div className="col-span-2">大小</div>
            <div className="col-span-3">修改日期</div>
            <div className="col-span-1">操作</div>
          </div>

          {/* 文件列表 */}
          <div className="max-h-96 overflow-y-auto">
            {filteredFiles.map((file, index) => (
              <div
                key={index}
                className={`px-4 py-2 grid grid-cols-12 gap-4 items-center hover:bg-gray-700 cursor-pointer border-b border-gray-700 ${
                  selectedFile?.path === file.path ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleFileClick(file)}
              >
                <div className="col-span-6 flex items-center space-x-2">
                  {file.type === 'folder' ? (
                    <Folder size={16} className="text-blue-400" />
                  ) : (
                    <FileText size={16} className="text-green-400" />
                  )}
                  <span className={file.type === 'folder' ? 'text-blue-400' : 'text-green-400'}>
                    {file.name}
                  </span>
                </div>
                <div className="col-span-2 text-gray-400">{file.size}</div>
                <div className="col-span-3 text-gray-400">{file.modified}</div>
                <div className="col-span-1 flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (file.type === 'file') {
                        openFile(file)
                      }
                    }}
                    className="p-1 hover:bg-gray-600 rounded"
                    title="打开"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (window.confirm(`确定要删除 ${file.name} 吗？`)) {
                        setFiles(files.filter(f => f.path !== file.path))
                      }
                    }}
                    className="p-1 hover:bg-red-600 rounded"
                    title="删除"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 状态栏 */}
        <div className="mt-4 text-sm text-gray-400">
          共 {filteredFiles.length} 个项目
          {selectedFile && ` | 选中: ${selectedFile.name}`}
        </div>
      </div>

      {/* 新建文件模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">新建文件</h3>
            <input
              type="text"
              placeholder="输入文件名..."
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full bg-gray-700 text-green-400 px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-green-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && createNewFile()}
            />
            <div className="flex space-x-2">
              <button
                onClick={createNewFile}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                创建
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileManager 