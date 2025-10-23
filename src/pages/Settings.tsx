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
    { icon: <VscArchive size={18} />, label: 'Insights', onClick: () => navigate('/insights') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: <VscSettingsGear size={18} className="rotate-90" />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between bg-[#F9F5EC]/5 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-[#F9F5EC]/10">
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-[#F9F5EC]">SETTINGS</div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                placeholder="Search settings..." 
                className="px-3 py-2 rounded-lg border border-[#F9F5EC]/10 bg-black/50 text-sm w-80 text-[#F9F5EC] placeholder:text-[#F9F5EC]/50 focus:outline-none focus:ring-2 focus:ring-[#98ff98]/30" 
              />
              <button className="relative p-2 rounded-md bg-black/50 hover:bg-[#F9F5EC]/5 transition-colors border border-[#F9F5EC]/10">
                <span className="inline-block w-2 h-2 rounded-full bg-[#98ff98] absolute top-1 right-1" />
                🔔
              </button>
              <button 
                onClick={handleBackToDashboard}
                className="px-3 py-2 rounded-md bg-[#98ff98] hover:bg-[#98ff98]/90 text-black transition-all"
              >
                Dashboard
              </button>
              <div className="relative">
                <button className="w-10 h-10 rounded-full bg-[#98ff98] flex items-center justify-center text-black font-medium">
                  A
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28">
        {/* Settings Content */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10 p-6">
            <h3 className="text-lg font-semibold mb-6 text-[#F9F5EC]">General</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Enable Animations</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Smooth transitions and effects</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#98ff98]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#98ff98]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Auto-save Changes</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Save changes automatically</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#98ff98]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#98ff98]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Show Tooltips</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Display helpful tooltips</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#98ff98]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#98ff98]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10 p-6">
            <h3 className="text-lg font-semibold mb-6 text-[#F9F5EC]">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Analytics Tracking</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Allow usage tracking for improvements</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#F9F5EC]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#F9F5EC]/50"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Share Usage Data</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Help us improve our service</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#F9F5EC]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#F9F5EC]/50"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div>
                  <h4 className="text-sm font-medium text-[#F9F5EC]">Two-Factor Authentication</h4>
                  <p className="text-xs text-[#F9F5EC]/70">Enhanced account security</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-[#98ff98]/20 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-[#98ff98]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10 p-6">
            <h3 className="text-lg font-semibold mb-6 text-[#F9F5EC]">Advanced</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#F9F5EC]/70">
                  API Endpoint
                </label>
                <input 
                  type="text" 
                  placeholder="https://api.example.com" 
                  className="w-full px-3 py-2 rounded-lg border border-[#F9F5EC]/10 bg-black/50 text-[#F9F5EC] placeholder:text-[#F9F5EC]/50 focus:outline-none focus:ring-2 focus:ring-[#98ff98]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#F9F5EC]/70">
                  Cache Duration (hours)
                </label>
                <input 
                  type="number" 
                  placeholder="24" 
                  className="w-full px-3 py-2 rounded-lg border border-[#F9F5EC]/10 bg-black/50 text-[#F9F5EC] placeholder:text-[#F9F5EC]/50 focus:outline-none focus:ring-2 focus:ring-[#98ff98]/30"
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