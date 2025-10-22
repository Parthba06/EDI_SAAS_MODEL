import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc'
import MagicBento from '../components/MagicBento'
import Dock from '../components/Dock'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
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
            Dashboard
          </h1>
          <nav className="flex items-center space-x-6">
            <button 
              onClick={handleBackToHome}
              className="text-sm font-medium hover:underline cursor-pointer"
              style={{ color: '#262424' }}
            >
              Back to Home
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#262424' }}>
            Welcome to Your Dashboard
          </h2>
          <p className="text-lg opacity-80" style={{ color: '#262424' }}>
            Explore our interactive features and tools designed to enhance your workflow.
          </p>
        </div>

        {/* MagicBento Component */}
        <div className="flex justify-center items-center">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
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

export default Dashboard