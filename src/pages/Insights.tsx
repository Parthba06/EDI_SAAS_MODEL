import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc'
import { FiActivity, FiBarChart2, FiUsers, FiCalendar } from 'react-icons/fi'
import Dock from '../components/Dock'

const Insights = () => {
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

  const insightCards = [
    { 
      title: 'Revenue Growth',
      icon: <FiActivity className="text-primary text-2xl" />,
      value: '+28%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Active Users',
      icon: <FiUsers className="text-primary text-2xl" />,
      value: '2,847',
      trend: 'up',
      period: 'current total'
    },
    {
      title: 'Engagement Rate',
      icon: <FiBarChart2 className="text-primary text-2xl" />,
      value: '67%',
      trend: 'up',
      period: 'last 30 days'
    },
    {
      title: 'Upcoming Events',
      icon: <FiCalendar className="text-primary text-2xl" />,
      value: '12',
      trend: 'neutral',
      period: 'next 2 weeks'
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-14 items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-4 shadow-card backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">Insights</div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                placeholder="Search insights..." 
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
        {/* Insight Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {insightCards.map((card, index) => (
            <div key={index} className="group rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-muted/60 p-3">
                  {card.icon}
                </div>
                <span className="text-xs text-muted-foreground">{card.period}</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">{card.title}</h3>
              <p className="text-2xl font-bold text-primary">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Revenue Overview</h3>
            <div className="aspect-[16/9] rounded-lg bg-muted/60">
              {/* Chart will be implemented here */}
            </div>
          </div>

          {/* User Activity Chart */}
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">User Activity</h3>
            <div className="aspect-[16/9] rounded-lg bg-muted/60">
              {/* Chart will be implemented here */}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg border border-border/70 bg-muted/60 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FiActivity className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">New milestone reached</h4>
                  <p className="text-xs text-muted-foreground">Project Alpha has reached 1000 users</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            ))}
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

export default Insights