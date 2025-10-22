import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc'
import Dock from '../components/Dock'

const Profile = () => {
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
    <div className="min-h-screen" style={{ backgroundColor: '#EEE5DA' }}>
      {/* Header */}
      <header className="p-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#262424' }}>
            Profile
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
            User Profile
          </h2>
          <p className="text-lg opacity-80" style={{ color: '#262424' }}>
            Manage your account settings and personal information.
          </p>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#262424' }}>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#262424' }}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#262424' }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#262424' }}>
                Preferences
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span style={{ color: '#262424' }}>Enable notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span style={{ color: '#262424' }}>Dark mode</span>
                </label>
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

export default Profile