import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc'
import Dock from '../components/Dock'

const Settings = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/archive') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EAEAEA' }}>
      {/* Header */}
      <header className="p-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#262424' }}>
            Settings
          </h1>
          <nav className="flex items-center space-x-6">
            <button 
              onClick={handleBackToDashboard}
              className="text-sm font-medium hover:underline cursor-pointer"
              style={{ color: '#262424' }}
            >
              Back to Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#262424' }}>
            Application Settings
          </h2>
          <p className="text-lg opacity-80" style={{ color: '#262424' }}>
            Configure your application preferences and system settings.
          </p>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#262424' }}>
              General
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Enable animations</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Auto-save changes</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Show tooltips</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#262424' }}>
              Privacy & Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Analytics tracking</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Share usage data</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#262424' }}>Two-factor authentication</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#262424' }}>
              Advanced
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#262424' }}>
                  API Endpoint
                </label>
                <input 
                  type="text" 
                  placeholder="https://api.example.com" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#262424' }}>
                  Cache Duration (hours)
                </label>
                <input 
                  type="number" 
                  placeholder="24" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dock Navigation */}
      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  )
}

export default Settings