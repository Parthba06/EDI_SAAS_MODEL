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
      icon: <FiActivity className="text-[#98ff98] text-2xl" />,
      value: '+28%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Active Users',
      icon: <FiUsers className="text-[#98ff98] text-2xl" />,
      value: '2,847',
      trend: 'up',
      period: 'current total'
    },
    {
      title: 'Engagement Rate',
      icon: <FiBarChart2 className="text-[#98ff98] text-2xl" />,
      value: '67%',
      trend: 'up',
      period: 'last 30 days'
    },
    {
      title: 'Upcoming Events',
      icon: <FiCalendar className="text-[#98ff98] text-2xl" />,
      value: '12',
      trend: 'neutral',
      period: 'next 2 weeks'
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between bg-[#F9F5EC]/5 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-[#F9F5EC]/10">
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-[#F9F5EC]">INSIGHTS</div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                placeholder="Search insights..." 
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
        {/* Insight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {insightCards.map((card, index) => (
            <div key={index} className="p-6 rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10 hover:bg-[#F9F5EC]/10 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#98ff98]/10">
                  {card.icon}
                </div>
                <span className="text-xs text-[#F9F5EC]/50">{card.period}</span>
              </div>
              <h3 className="text-sm font-medium text-[#F9F5EC]/70 mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-[#F9F5EC]">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="p-6 rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
            <h3 className="text-lg font-semibold text-[#F9F5EC] mb-6">Revenue Overview</h3>
            <div className="aspect-[16/9] bg-[#F9F5EC]/10 rounded-lg">
              {/* Chart will be implemented here */}
            </div>
          </div>

          {/* User Activity Chart */}
          <div className="p-6 rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
            <h3 className="text-lg font-semibold text-[#F9F5EC] mb-6">User Activity</h3>
            <div className="aspect-[16/9] bg-[#F9F5EC]/10 rounded-lg">
              {/* Chart will be implemented here */}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-[#F9F5EC]/5 border border-[#F9F5EC]/10 p-6">
          <h3 className="text-lg font-semibold text-[#F9F5EC] mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                <div className="w-10 h-10 rounded-full bg-[#98ff98]/20 flex items-center justify-center">
                  <FiActivity className="text-[#98ff98]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-[#F9F5EC]">New milestone reached</h4>
                  <p className="text-xs text-[#F9F5EC]/50">Project Alpha has reached 1000 users</p>
                </div>
                <span className="text-xs text-[#F9F5EC]/50">2h ago</span>
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