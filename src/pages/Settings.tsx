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
    <div className="relative min-h-screen bg-background text-foreground">

      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-14 items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-4 shadow-card backdrop-blur-md">

            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">Settings</div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                placeholder="Search settings..." 
                className="w-72 rounded-xl border border-border/70 bg-muted/70 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-[border,box-shadow] duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/30" 
              />
              <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-muted/70 text-xs transition-[background,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-card">
                <span className="inline-block w-2 h-2 rounded-full bg-primary absolute top-1 right-1" />
                🔔
              </button>
              <button 
                onClick={handleBackToDashboard}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-card transition-[background,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-glow"
              >
                Dashboard
              </button>

              <div className="relative">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium shadow-glow">
                  A
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* Settings Content */}
        <div className="space-y-6">

          {/* General Settings */}
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">General</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/60 p-4">

                <div>
                  <h4 className="text-sm font-medium text-foreground">Enable Animations</h4>
                  <p className="text-xs text-muted-foreground">Smooth transitions and effects</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary/15 px-1 transition-colors duration-200">
                  <div className="h-4 w-4 rounded-full bg-primary shadow-card transition-transform duration-200"></div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/60 p-4">

                <div>
                  <h4 className="text-sm font-medium text-foreground">Auto-save Changes</h4>
                  <p className="text-xs text-muted-foreground">Save changes automatically</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary/15 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/60 border border-border/70">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Show Tooltips</h4>
                  <p className="text-xs text-muted-foreground">Display helpful tooltips</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary/15 px-1 transition-colors duration-200">
                  <div className="h-4 w-4 rounded-full bg-primary shadow-card transition-transform duration-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/60 p-4">

                <div>
                  <h4 className="text-sm font-medium text-foreground">Analytics Tracking</h4>
                  <p className="text-xs text-muted-foreground">Allow usage tracking for improvements</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-muted px-1 transition-colors duration-200">
                  <div className="h-4 w-4 rounded-full bg-foreground/60 shadow-card transition-transform duration-200"></div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/60 p-4">

                <div>
                  <h4 className="text-sm font-medium text-foreground">Share Usage Data</h4>
                  <p className="text-xs text-muted-foreground">Help us improve our service</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-muted flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-foreground/60"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/60 border border-border/70">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-xs text-muted-foreground">Enhanced account security</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary/15 flex items-center px-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Advanced</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  API Endpoint
                </label>
                <input 
                  type="text" 
                  placeholder="https://api.example.com" 
                  className="w-full rounded-lg border border-border/70 bg-muted/70 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[border,box-shadow] duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Cache Duration (hours)
                </label>
                <input 
                  type="number" 
                  placeholder="24" 
                  className="w-full rounded-lg border border-border/70 bg-muted/70 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[border,box-shadow] duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
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