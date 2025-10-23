import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc'
import Dock from '../components/Dock'

const Archive = () => {
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

  const archiveItems = [
    { id: 1, title: 'Project Alpha', date: '2024-01-15', type: 'Project' },
    { id: 2, title: 'Marketing Campaign Q1', date: '2024-02-20', type: 'Campaign' },
    { id: 3, title: 'User Research Study', date: '2024-03-10', type: 'Research' },
    { id: 4, title: 'Product Launch Beta', date: '2024-04-05', type: 'Launch' },
    { id: 5, title: 'Team Retrospective', date: '2024-05-12', type: 'Meeting' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EAEAEA' }}>
      {/* Header */}
      <header className="p-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#262424' }}>
            Archive
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
            Archived Items
          </h2>
          <p className="text-lg opacity-80" style={{ color: '#262424' }}>
            View and manage your archived projects, campaigns, and documents.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search archive..." 
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>All Types</option>
            <option>Project</option>
            <option>Campaign</option>
            <option>Research</option>
            <option>Launch</option>
            <option>Meeting</option>
          </select>
        </div>

        {/* Archive List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archived Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {archiveItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium" style={{ color: '#262424' }}>
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#262424' }}>
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mr-4">
                        Restore
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Archive