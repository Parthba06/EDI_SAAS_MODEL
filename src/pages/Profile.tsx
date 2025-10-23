import { useNavigate } from 'react-router-dom'
import { VscHome, VscArchive, VscAccount, VscSettingsGear, VscEdit, VscGlobe, VscMail, VscCalendar, VscVerified } from 'react-icons/vsc'
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Dock from '../components/Dock'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Profile = () => {
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
      {/* Header/TopBar - Matching Dashboard style */}
      <div className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between bg-[#F9F5EC]/5 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-[#F9F5EC]/10">
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-[#F9F5EC]">PROFILE</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="rounded-2xl bg-[#F9F5EC]/5 p-8 border border-[#F9F5EC]/10">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar with Edit Button */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-[#F9F5EC]/10 shadow-lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[#F9F5EC]/5 text-[#F9F5EC]">AS</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-[#98ff98] text-black rounded-full shadow-lg hover:bg-[#98ff98]/90 transition-colors">
                    <VscEdit size={16} />
                  </button>
                </div>

                {/* Growth Badge */}
                <Badge variant="secondary" className="bg-[#98ff98]/20 text-[#98ff98] border border-[#98ff98]/30">
                  <VscVerified className="mr-1" /> Top 10% Creator
                </Badge>

                {/* Name and Role */}
                <div>
                  <h2 className="text-2xl font-bold text-[#F9F5EC]">Ashish Singh</h2>
                  <p className="text-[#F9F5EC]/70">Digital Creator & Strategist</p>
                </div>

                {/* Basic Info */}
                <div className="w-full space-y-3 text-[#F9F5EC]/70">
                  <div className="flex items-center justify-center gap-2">
                    <VscMail className="text-[#98ff98]" />
                    <span>ashish.singh@example.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <VscGlobe className="text-[#98ff98]" />
                    <span>www.ashishsingh.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <VscCalendar className="text-[#98ff98]" />
                    <span>Joined September 2025</span>
                  </div>
                </div>

                {/* Plan Type */}
                <div className="w-full p-3 bg-[#F9F5EC]/5 border border-[#98ff98]/30 rounded-xl">
                  <p className="text-sm text-[#F9F5EC]/70">Current Plan</p>
                  <p className="text-lg font-semibold text-[#98ff98]">Enterprise</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 text-[#F9F5EC]/50">
                  <button className="p-2 hover:text-[#98ff98] transition-colors">
                    <FaTwitter size={20} />
                  </button>
                  <button className="p-2 hover:text-[#98ff98] transition-colors">
                    <FaLinkedin size={20} />
                  </button>
                  <button className="p-2 hover:text-[#98ff98] transition-colors">
                    <FaInstagram size={20} />
                  </button>
                </div>

                {/* Edit Profile Button */}
                <Button className="w-full bg-[#98ff98] hover:bg-[#98ff98]/90 text-black">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs and Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent border-[#F9F5EC]/10">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#98ff98] rounded-none border-b-2 border-transparent text-[#F9F5EC]"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="account"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#98ff98] rounded-none border-b-2 border-transparent text-[#F9F5EC]"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#98ff98] rounded-none border-b-2 border-transparent text-[#F9F5EC]"
                >
                  Preferences
                </TabsTrigger>
                <TabsTrigger 
                  value="billing"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#98ff98] rounded-none border-b-2 border-transparent text-[#F9F5EC]"
                >
                  Billing
                </TabsTrigger>
                <TabsTrigger 
                  value="integrations"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#98ff98] rounded-none border-b-2 border-transparent text-[#F9F5EC]"
                >
                  Integrations
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="overview" className="m-0">
                  <div className="space-y-6">
                    {/* Bio Section */}
                    <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                      <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">About</h3>
                      <p className="text-[#F9F5EC]/70">
                        Digital creator and strategist with 5+ years of experience in content creation and social media marketing. 
                        Passionate about helping brands tell their stories and connect with their audience in meaningful ways.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                        <p className="text-sm text-[#F9F5EC]/70">Total Posts</p>
                        <p className="text-2xl font-bold text-[#98ff98]">1,234</p>
                      </div>
                      <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                        <p className="text-sm text-[#F9F5EC]/70">Followers</p>
                        <p className="text-2xl font-bold text-[#98ff98]">45.2K</p>
                      </div>
                      <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                        <p className="text-sm text-[#F9F5EC]/70">Engagement Rate</p>
                        <p className="text-2xl font-bold text-[#98ff98]">4.7%</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="m-0">
                  <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                    <div className="space-y-6">
                      {/* Profile Settings Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Profile Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Profile Picture</label>
                            <div className="flex items-center gap-4">
                              <Avatar className="w-16 h-16 border-2 border-[#F9F5EC]/10">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-[#F9F5EC]/5 text-[#F9F5EC]">AS</AvatarFallback>
                              </Avatar>
                              <Button variant="outline" className="border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                                Change Photo
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Display Name</label>
                            <input 
                              type="text" 
                              value="Ashish Singh"
                              className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Username</label>
                            <input 
                              type="text" 
                              value="@ashish_creator"
                              className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Bio</label>
                            <textarea 
                              rows={4}
                              className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent"
                              placeholder="Tell us about yourself..."
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Security Settings */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Security Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Email Address</label>
                            <input 
                              type="email" 
                              value="ashish.singh@example.com"
                              className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent"
                            />
                          </div>

                          <Button variant="outline" className="w-full border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                            Change Password
                          </Button>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div>
                              <h4 className="text-sm font-medium text-[#F9F5EC]">Two-Factor Authentication</h4>
                              <p className="text-xs text-[#F9F5EC]/70">Add an extra layer of security to your account</p>
                            </div>
                            <Button variant="outline" className="border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                              Enable 2FA
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Connected Accounts */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Connected Accounts</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div className="flex items-center gap-3">
                              <FaTwitter className="text-[#98ff98]" size={20} />
                              <div>
                                <h4 className="text-sm font-medium text-[#F9F5EC]">Twitter</h4>
                                <p className="text-xs text-[#F9F5EC]/70">Connected as @ashish_creator</p>
                              </div>
                            </div>
                            <Button variant="outline" className="border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                              Disconnect
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div className="flex items-center gap-3">
                              <FaLinkedin className="text-[#98ff98]" size={20} />
                              <div>
                                <h4 className="text-sm font-medium text-[#F9F5EC]">LinkedIn</h4>
                                <p className="text-xs text-[#F9F5EC]/70">Not connected</p>
                              </div>
                            </div>
                            <Button variant="outline" className="border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                              Connect
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div className="flex items-center gap-3">
                              <FaInstagram className="text-[#98ff98]" size={20} />
                              <div>
                                <h4 className="text-sm font-medium text-[#F9F5EC]">Instagram</h4>
                                <p className="text-xs text-[#F9F5EC]/70">Connected as @ashish.creates</p>
                              </div>
                            </div>
                            <Button variant="outline" className="border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Account Management */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Account Management</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/5">
                            Export Data
                          </Button>
                          <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="m-0">
                  <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                    <div className="space-y-6">
                      {/* Theme Settings */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Appearance</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Theme</label>
                            <div className="grid grid-cols-3 gap-4">
                              <button className="p-4 rounded-lg bg-black border border-[#98ff98] text-[#F9F5EC] text-sm">
                                Dark
                              </button>
                              <button className="p-4 rounded-lg bg-black/50 border border-[#F9F5EC]/10 text-[#F9F5EC]/70 text-sm hover:bg-[#F9F5EC]/5">
                                Light
                              </button>
                              <button className="p-4 rounded-lg bg-black/50 border border-[#F9F5EC]/10 text-[#F9F5EC]/70 text-sm hover:bg-[#F9F5EC]/5">
                                System
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Dashboard Layout</label>
                            <div className="grid grid-cols-2 gap-4">
                              <button className="p-4 rounded-lg bg-black border border-[#98ff98] text-[#F9F5EC] text-sm">
                                Compact
                              </button>
                              <button className="p-4 rounded-lg bg-black/50 border border-[#F9F5EC]/10 text-[#F9F5EC]/70 text-sm hover:bg-[#F9F5EC]/5">
                                Spacious
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Language & Region */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Language & Region</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Language</label>
                            <select className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent">
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Time Zone</label>
                            <select className="w-full px-3 py-2 bg-black/50 border border-[#F9F5EC]/10 rounded-lg text-[#F9F5EC] focus:ring-2 focus:ring-[#98ff98]/30 focus:border-transparent">
                              <option value="UTC">UTC (GMT+0)</option>
                              <option value="EST">EST (GMT-5)</option>
                              <option value="PST">PST (GMT-8)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Notifications */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div>
                              <h4 className="text-sm font-medium text-[#F9F5EC]">Email Notifications</h4>
                              <p className="text-xs text-[#F9F5EC]/70">Receive important updates via email</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="toggle toggle-[#98ff98]" checked />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div>
                              <h4 className="text-sm font-medium text-[#F9F5EC]">Push Notifications</h4>
                              <p className="text-xs text-[#F9F5EC]/70">Get real-time alerts</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="toggle toggle-[#98ff98]" checked />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                            <div>
                              <h4 className="text-sm font-medium text-[#F9F5EC]">Weekly Reports</h4>
                              <p className="text-xs text-[#F9F5EC]/70">Receive analytics summary</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="toggle toggle-[#98ff98]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Analytics Preferences */}
                      <div className="pt-6 border-t border-[#F9F5EC]/10">
                        <h3 className="text-lg font-semibold mb-4 text-[#F9F5EC]">Analytics Preferences</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#F9F5EC]/70 mb-2">Default Time Period</label>
                            <div className="grid grid-cols-3 gap-4">
                              <button className="p-4 rounded-lg bg-black border border-[#98ff98] text-[#F9F5EC] text-sm">
                                7 Days
                              </button>
                              <button className="p-4 rounded-lg bg-black/50 border border-[#F9F5EC]/10 text-[#F9F5EC]/70 text-sm hover:bg-[#F9F5EC]/5">
                                30 Days
                              </button>
                              <button className="p-4 rounded-lg bg-black/50 border border-[#F9F5EC]/10 text-[#F9F5EC]/70 text-sm hover:bg-[#F9F5EC]/5">
                                90 Days
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="billing" className="m-0">
                  <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                    <h3 className="text-lg font-semibold mb-6 text-[#F9F5EC]">Billing & Plans</h3>
                    {/* Billing content */}
                  </div>
                </TabsContent>

                <TabsContent value="integrations" className="m-0">
                  <div className="rounded-xl p-6 bg-[#F9F5EC]/5 border border-[#F9F5EC]/10">
                    <h3 className="text-lg font-semibold mb-6 text-[#F9F5EC]">Connected Apps</h3>
                    {/* Integrations content */}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
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