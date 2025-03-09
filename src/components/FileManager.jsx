import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiFile, FiUpload, FiTrash2, FiEdit2, FiArrowLeft } from 'react-icons/fi';

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Mock data structure with nested folders
  const fileSystem = {
    '/': [
      { id: 1, name: 'Documents', type: 'folder', path: '/Documents' },
      { id: 2, name: 'Images', type: 'folder', path: '/Images' },
      { id: 3, name: 'report.pdf', type: 'file' },
    ],
    '/Documents': [
      { id: 4, name: 'Work', type: 'folder', path: '/Documents/Work' },
      { id: 5, name: 'Personal', type: 'folder', path: '/Documents/Personal' },
      { id: 6, name: 'resume.pdf', type: 'file' },
    ],
    '/Images': [
      { id: 7, name: 'Vacation', type: 'folder', path: '/Images/Vacation' },
      { id: 8, name: 'profile.jpg', type: 'file' },
      { id: 9, name: 'banner.png', type: 'file' },
    ],
    '/Documents/Work': [
      { id: 10, name: 'project-specs.docx', type: 'file' },
      { id: 11, name: 'meeting-notes.txt', type: 'file' },
    ],
    '/Documents/Personal': [
      { id: 12, name: 'tax-2023.pdf', type: 'file' },
    ],
    '/Images/Vacation': [
      { id: 13, name: 'beach.jpg', type: 'file' },
      { id: 14, name: 'mountain.jpg', type: 'file' },
    ],
  };

  const getCurrentItems = () => {
    return fileSystem[currentPath] || [];
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploading file:', file.name, 'to path:', currentPath);
    }
  };

  const handleDelete = (item) => {
    console.log('Deleting:', item.name, 'from path:', currentPath);
  };

  const handleRename = (item) => {
    const newName = prompt('Enter new name:', item.name);
    if (newName) {
      console.log('Renaming', item.name, 'to', newName, 'in path:', currentPath);
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
      setSelectedFile(null);
    } else {
      setSelectedFile(item);
    }
  };

  const handleBackClick = () => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    const parentPath = pathParts.join('/') || '/';
    setCurrentPath(parentPath);
    setSelectedFile(null);
  };

  const getBreadcrumbs = () => {
    const paths = currentPath.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const fullPath = '/' + paths.slice(0, index + 1).join('/');
      return { name: path, path: fullPath };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {currentPath !== '/' && (
              <button
                onClick={handleBackClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiArrowLeft className="text-gray-600" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <span 
                onClick={() => setCurrentPath('/')}
                className="text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                root
              </span>
              {getBreadcrumbs().map((item, index) => (
                <div key={item.path} className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span
                    onClick={() => setCurrentPath(item.path)}
                    className="text-primary-600 hover:text-primary-700 cursor-pointer"
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <label className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 cursor-pointer">
            <FiUpload className="mr-2" />
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCurrentItems().map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg border ${
                  selectedFile?.id === item.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-500'
                } cursor-pointer transition-colors`}
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {item.type === 'folder' ? (
                      <FiFolder className="text-primary-500 text-xl" />
                    ) : (
                      <FiFile className="text-gray-500 text-xl" />
                    )}
                    <span className="ml-3 text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(item);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiEdit2 className="text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}