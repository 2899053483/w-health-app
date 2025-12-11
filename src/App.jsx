import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Wind, 
  Users, 
  User, 
  Play, 
  Pause, 
  ChevronRight, 
  Droplets, 
  Flame, 
  Moon, 
  Award,
  Settings,
  Bell
} from 'lucide-react';

// --- Components for specific Screens ---

/**
 * 1. DASHBOARD INTERFACE
 * The central hub showing a snapshot of SDG3 goals (Physical & Mental).
 */
const DashboardScreen = ({ setActiveTab }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Good Morning, Alex</h1>
        <p className="text-slate-500 text-sm">Let's prioritize your well-being today.</p>
      </div>
      <div className="relative">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
          alt="Profile" 
          className="w-12 h-12 rounded-full border-2 border-emerald-500 p-0.5"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
    </div>

    {/* SDG3 Health Score Card */}
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-emerald-100 font-medium text-sm">W-HEALTH SCORE</p>
            <h2 className="text-4xl font-bold">84<span className="text-xl font-normal opacity-80">/100</span></h2>
          </div>
          <Activity className="text-emerald-100 opacity-50 w-12 h-12" />
        </div>
        <p className="text-sm text-emerald-50 bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
          You are in the top 10% today!
        </p>
      </div>
      {/* Decorative background circle */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    </div>

    {/* Quick Stats Grid */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center py-6" onClick={() => setActiveTab('physical')}>
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-2">
          <Flame size={20} />
        </div>
        <span className="text-2xl font-bold text-slate-800">1,240</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Calories</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center py-6" onClick={() => setActiveTab('mental')}>
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2">
          <Moon size={20} />
        </div>
        <span className="text-2xl font-bold text-slate-800">7h 20m</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Sleep</span>
      </div>
    </div>

    {/* Suggested Action */}
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <Wind size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Breathwork Session</h3>
          <p className="text-xs text-slate-500">5 min • Stress Relief</p>
        </div>
      </div>
      <button onClick={() => setActiveTab('mental')} className="bg-white text-blue-600 px-4 py-1.5 text-sm font-medium rounded-full shadow-sm">
        Start
      </button>
    </div>
  </div>
);

/**
 * 2. PHYSICAL HEALTH INTERFACE
 * Focuses on active management of physical stats.
 */
const PhysicalScreen = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Physical Activity</h2>
      <div className="bg-slate-100 p-2 rounded-full">
        <Settings size={20} className="text-slate-600" />
      </div>
    </div>

    {/* Activity Graph Simulation (CSS Bar Chart) */}
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-700">Steps This Week</h3>
        <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded">Avg: 8,432</span>
      </div>
      <div className="flex items-end justify-between h-32 space-x-2">
        {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
          <div key={i} className="flex flex-col items-center flex-1 group">
             <div 
               className={`w-full rounded-t-lg transition-all duration-500 ${i === 5 ? 'bg-emerald-500' : 'bg-slate-200 group-hover:bg-emerald-300'}`} 
               style={{ height: `${h}%` }}
             ></div>
             <span className="text-xs text-slate-400 mt-2">{['S','M','T','W','T','F','S'][i]}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Vitals List */}
    <div className="space-y-3">
      <h3 className="font-semibold text-slate-700">Today's Vitals</h3>
      
      {[
        { icon: Heart, color: 'rose', label: 'Heart Rate', value: '72 bpm', status: 'Normal' },
        { icon: Droplets, color: 'blue', label: 'Hydration', value: '1.2 L', status: '800ml to go' },
        { icon: Flame, color: 'orange', label: 'Active Energy', value: '450 kcal', status: 'On Track' },
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-500`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.status}</p>
            </div>
          </div>
          <span className="text-lg font-bold text-slate-700">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 3. MENTAL WELLNESS INTERFACE (Audio/Visual Tech)
 * Uses Canvas API for breathing visualization.
 */
const MentalScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Audio Refs
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Handle Audio Logic
  const toggleAudio = () => {
    if (!isPlaying) {
      // Initialize Audio Context on user gesture
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;

      // Resume context if suspended (browser policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create Oscillator (Sound Source)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure Sound: 174 Hz (Solfeggio frequency for stress)
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(174, ctx.currentTime);

      // Connect nodes: Oscillator -> Gain -> Speakers
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Smooth Fade In
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2); // Low volume (0.15)

      osc.start();
      
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } else {
      // Smooth Fade Out
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current;
      const osc = oscillatorRef.current;

      if (gain && ctx) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

        setTimeout(() => {
          if (osc) {
            osc.stop();
            osc.disconnect();
          }
        }, 1000);
      }
      setIsPlaying(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e){}
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Simulating a breathing bloom effect
      const radius = 50 + Math.sin(time) * 20; 
      const alpha = 0.5 + Math.sin(time) * 0.2;

      // Outer Glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 2);
      gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha})`); // Indigo
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core Circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="h-full flex flex-col animate-fade-in relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-slate-900 z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between items-center py-6">
        <div className="text-center">
          <h2 className="text-2xl font-light tracking-wide">Deep Focus</h2>
          <p className="text-indigo-200 text-sm mt-1">Audioscape & Breathing</p>
        </div>

        {/* Visualizer Canvas */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <canvas ref={canvasRef} width={300} height={300} className="absolute inset-0" />
          {!isPlaying && (
            <div className="w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center animate-pulse">
               <span className="text-xs text-indigo-300">Tap Play</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full space-y-8">
           <div className="flex justify-between text-xs text-indigo-300 px-4">
             <span>01:20</span>
             <span>10:00</span>
           </div>
           {/* Progress Bar */}
           <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
             <div className="bg-indigo-500 h-full w-1/4 rounded-full"></div>
           </div>

           <div className="flex items-center justify-center space-x-10">
             <button className="text-indigo-200 hover:text-white"><Settings size={20}/></button>
             <button 
               onClick={toggleAudio}
               className="w-16 h-16 bg-white text-indigo-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
             >
               {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
             </button>
             <button className="text-indigo-200 hover:text-white"><Wind size={20}/></button>
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. COMMUNITY INTERFACE
 * Social support for community resilience.
 */
const CommunityScreen = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Community</h2>
      <button className="text-emerald-600 font-semibold text-sm">Find Groups</button>
    </div>

    {/* Monthly Challenge */}
    <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex items-center space-x-4">
      <div className="bg-orange-500 text-white p-3 rounded-xl shadow-orange-200 shadow-lg">
        <Award size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800">10k Steps Challenge</h3>
        <p className="text-xs text-slate-500 mt-1">2,403 Participants • 3 Days left</p>
        <div className="w-full bg-orange-200 h-2 rounded-full mt-3">
          <div className="bg-orange-500 h-2 rounded-full w-3/4"></div>
        </div>
      </div>
    </div>

    {/* Feed */}
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-700">Recent Activity</h3>
      {[
        { name: "Sarah J.", action: "completed a 5km Run", time: "2m ago", likes: 12 },
        { name: "Mike T.", action: "reached a Meditation goal", time: "1h ago", likes: 24 },
        { name: "Local Walking Group", action: "posted a new event", time: "3h ago", likes: 8 },
      ].map((post, i) => (
        <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <div>
              <p className="text-sm font-medium text-slate-800"><span className="font-bold">{post.name}</span> {post.action}</p>
              <p className="text-xs text-slate-400">{post.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-slate-400 text-sm mt-3 border-t border-slate-50 pt-2">
             <span className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition-colors"><Heart size={14} /> <span>{post.likes}</span></span>
             <span className="hover:text-blue-500 cursor-pointer transition-colors">Comment</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 5. PROFILE & INSIGHTS INTERFACE
 * Long-term management and personal settings.
 */
const ProfileScreen = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex flex-col items-center pt-4">
      <div className="w-24 h-24 rounded-full border-4 border-emerald-500 p-1 mb-4">
         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-full h-full rounded-full bg-slate-100" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">Alex Morgan</h2>
      <p className="text-slate-500">Member since 2023</p>
    </div>

    {/* Menu Items */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {[
        { label: "My Health Data", icon: Activity, color: "emerald" },
        { label: "Goals & Targets", icon: Award, color: "orange" },
        { label: "Connected Devices", icon: Settings, color: "blue" },
        { label: "Notifications", icon: Bell, color: "purple" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg bg-${item.color}-50 text-${item.color}-600`}>
              <item.icon size={18} />
            </div>
            <span className="font-medium text-slate-700">{item.label}</span>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </div>
      ))}
    </div>

    {/* Report Generation (SDG3 Requirement: Active Management) */}
    <button className="w-full bg-slate-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2">
       <Activity size={18} />
       <span>Generate Monthly Health Report</span>
    </button>
  </div>
);


// --- Main App Container ---

export default function WHealthApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardScreen setActiveTab={setActiveTab} />;
      case 'physical': return <PhysicalScreen />;
      case 'mental': return <MentalScreen />;
      case 'community': return <CommunityScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-900 p-4">
      {/* Mobile Frame Simulation */}
      <div className="w-full max-w-md h-[800px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-slate-800 relative flex flex-col">
        
        {/* Notch / Status Bar */}
        <div className="bg-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold text-slate-800 z-20">
          <span>9:41</span>
          <div className="w-20 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-4"></div>
          <div className="flex space-x-1">
            <div className="w-4 h-2.5 bg-slate-800 rounded-sm"></div>
            <div className="w-0.5 h-2.5 bg-slate-800 rounded-sm"></div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50">
           <div className="p-5 pb-24 min-h-full">
             {renderContent()}
           </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-30">
          <NavIcon icon={Activity} label="Home" id="dashboard" activeTab={activeTab} setTab={setActiveTab} />
          <NavIcon icon={Heart} label="Move" id="physical" activeTab={activeTab} setTab={setActiveTab} />
          {/* Central Action Button */}
          <div className="relative -top-6">
            <button 
              onClick={() => setActiveTab('mental')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${activeTab === 'mental' ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-800'}`}
            >
              <Wind className="text-white" size={24} />
            </button>
          </div>
          <NavIcon icon={Users} label="Social" id="community" activeTab={activeTab} setTab={setActiveTab} />
          <NavIcon icon={User} label="You" id="profile" activeTab={activeTab} setTab={setActiveTab} />
        </div>

      </div>
      
      {/* Global Styles for Animations */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}

const NavIcon = ({ icon: Icon, label, id, activeTab, setTab }) => {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => setTab(id)}
      className={`flex flex-col items-center space-y-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};