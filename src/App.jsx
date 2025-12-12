import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, ChevronRight, Activity, Volume2, 
  User, CheckCircle, AlertCircle, ArrowLeft, Mic, Heart, Droplets, Zap
} from 'lucide-react';

export default function WHealthSimple() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [userData, setUserData] = useState({ weight: '', height: '', steps: '' });
  const [healthStatus, setHealthStatus] = useState(null);

  // Navigation Helpers
  const goHome = () => {
    setCurrentScreen(1);
    setHealthStatus(null); 
    setUserData({ weight: '', height: '', steps: '' });
  };
  const goToInput = () => setCurrentScreen(2);
  const goToVisual = () => setCurrentScreen(4);
  const goToAudio = () => setCurrentScreen(5);

  // Logic for Health Analysis
  const analyzeHealth = () => {
    const w = parseFloat(userData.weight);
    const h = parseFloat(userData.height) / 100; // convert cm to m
    const s = parseInt(userData.steps);

    if (!w || !h || !s) return;

    const bmi = w / (h * h);
    let status = 'Healthy';
    let message = 'Your metrics are within the optimal range.';
    let color = 'green';

    if (bmi > 25 || s < 5000) {
      status = 'Needs Attention';
      message = 'Consider increasing daily steps or managing diet.';
      color = 'orange';
    }

    setHealthStatus({ bmi: bmi.toFixed(1), status, message, color });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-6 px-4 font-sans text-slate-900">
      
      {/* Global Header */}
      <div className="relative w-full max-w-md flex items-center justify-center mb-4">
        {currentScreen !== 1 && (
          <button 
            onClick={goHome} 
            className="absolute left-0 p-2 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold text-slate-900">
          W-Health
        </h1>
      </div>

      {/* Screen Router */}
      <div className="w-full max-w-md animate-fade-in flex-1 flex flex-col justify-center">
        
        {/* SCREEN 1: HUB (Main Menu) */}
        {currentScreen === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <h2 className="text-xl font-bold mb-2">Welcome Back</h2>
            <p className="text-slate-500 mb-6">Select a module to begin your daily check-in.</p>
            
            <div className="grid gap-3">
              <MenuButton 
                icon={User} 
                title="Health Check-In" 
                subtitle="Input stats & Analyze BMI" 
                onClick={goToInput} 
              />
              <MenuButton 
                icon={Activity} 
                title="Live Vitals" 
                subtitle="View real-time sensor data" 
                onClick={goToVisual} 
              />
              <MenuButton 
                icon={Volume2} 
                title="Wellness Audio Guide" 
                subtitle="Listen to daily motivational briefing" 
                onClick={goToAudio} 
              />
            </div>
          </div>
        )}

        {/* SCREEN 2: INPUT & ANALYSIS (Compact) */}
        {currentScreen === 2 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300">
            <h2 className="text-lg font-bold mb-4 text-center">Your Daily Metrics</h2>
            <div className="space-y-3 max-w-sm mx-auto">
              {/* Row for Weight/Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={userData.weight}
                    onChange={e => setUserData({...userData, weight: e.target.value})}
                    className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm)</label>
                  <input 
                    type="number" 
                    value={userData.height}
                    onChange={e => setUserData({...userData, height: e.target.value})}
                    className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="175"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Daily Steps</label>
                <input 
                  type="number" 
                  value={userData.steps}
                  onChange={e => setUserData({...userData, steps: e.target.value})}
                  className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="5400"
                />
              </div>
              
              <button 
                onClick={analyzeHealth}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-2"
              >
                Analyze My Health
              </button>
            </div>

            {/* Compact Inline Results */}
            {healthStatus && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in text-center">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-full ${
                      healthStatus.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {healthStatus.color === 'green' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{healthStatus.status}</h3>
                 </div>
                
                <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto">{healthStatus.message}</p>

                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Your BMI</div>
                    <div className="text-base font-bold text-slate-800">{healthStatus.bmi}</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Activity</div>
                    <div className="text-base font-bold text-slate-800">{userData.steps} <span className="text-[10px] font-normal text-slate-400">steps</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 4: VISUAL (Compact) */}
        {currentScreen === 4 && <VisualSection />}

        {/* SCREEN 5: AUDIO */}
        {currentScreen === 5 && <AudioSection />}

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const MenuButton = ({ icon: Icon, title, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all group"
  >
    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
      <Icon size={20} />
    </div>
    <div className="ml-4 text-left flex-1">
      <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" />
  </button>
);

const VisualSection = () => {
  const canvasRef = useRef(null);
  const [vitals, setVitals] = useState({ bpm: 72, spo2: 98, stress: 'Low' });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        bpm: 72 + Math.floor(Math.random() * 5 - 2),
        spo2: 98 + Math.floor(Math.random() * 2 - 1),
        stress: prev.bpm > 73 ? 'Low' : 'Normal'
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let offset = 0;

    const draw = () => {
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3;
      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
          Math.sin((x + offset) * 0.05) * 10 + 
          (Math.sin((x + offset) * 0.2) > 0.9 ? -40 : 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      offset += 2;
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Live Sensor Feed</h2>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-green-600 uppercase">Connected</span>
          </div>
        </div>
        
        {/* Fixed Height Canvas */}
        <div className="relative w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner h-40 flex items-center justify-center group border border-slate-200 mb-4">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>
        </div>

        {/* Compact Dashboard */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-50 p-3 rounded-xl border border-red-100 flex flex-col items-center">
            <div className="flex items-center space-x-1 text-red-500 mb-1">
              <Heart size={14} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase">HR</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{vitals.bpm}</div>
            <div className="text-[10px] text-slate-500">Normal</div>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col items-center">
            <div className="flex items-center space-x-1 text-blue-500 mb-1">
              <Droplets size={14} />
              <span className="text-[10px] font-bold uppercase">SpO2</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{vitals.spo2}%</div>
            <div className="text-[10px] text-slate-500">Optimal</div>
          </div>

          <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 flex flex-col items-center">
            <div className="flex items-center space-x-1 text-purple-500 mb-1">
              <Zap size={14} />
              <span className="text-[10px] font-bold uppercase">Stress</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{vitals.stress}</div>
            <div className="text-[10px] text-slate-500">Stable</div>
          </div>
        </div>
      </div>
      <p className="text-slate-500 text-[10px] italic text-center max-w-xl">
        Data simulated from local sensor API. Measurements update every 2 seconds.
      </p>
    </div>
  );
};

const AudioSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0); 
  const [duration, setDuration] = useState(88); // Updated to 1:28 (88 seconds)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const speechRef = useRef(null); // Flag to allow playing
  const elapsedRef = useRef(0); // Ref to track elapsed time for event callbacks

  // Script
  const scriptSentences = [
    "Welcome to W-Health, your integrated companion for sustainable well-being.",
    "As a dedicated tool for the United Nations Sustainable Development Goal 3, our mission is to ensure healthy lives and promote well-being for all at all ages.",
    "In a modern world that never stops, your health requires more than just occasional check-ups; it demands consistent, informed, and proactive action every single day.",
    "W-Health bridges the critical gap between your personal biological data and the vital support systems within your local community.",
    "By diligently tracking metrics like your heart rate, step count, and daily energy, you are taking powerful ownership of your physical journey.",
    "By engaging with these daily briefings and taking moments for mindfulness, you are actively nurturing your mental resilience against stress.",
    "This data doesn't just help you; it contributes to a larger picture of community health, enabling faster local emergency responses and smarter resource allocation.",
    "Remember that every single step you take is a meaningful contribution to a healthier, more sustainable world.",
    "Take a moment now to breathe deeply, center yourself, and appreciate the significant progress you have made today.",
    "Let's continue building a healthier future, together."
  ];

  // Voice Selector Logic
  const getCalmVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.name.includes("Google US English")) || 
           voices.find(v => v.name.includes("Samantha")) || 
           voices.find(v => v.name.includes("Female")) || 
           voices[0];
  };

  // Sequential Speech Logic
  const speakNextSentence = (index) => {
    // If we've finished the script
    if (index >= scriptSentences.length) {
      setIsPlaying(false);
      setElapsed(0); // Reset timer UI
      elapsedRef.current = 0;
      setCurrentIndex(0); // Ready for restart
      return;
    }

    const utterance = new SpeechSynthesisUtterance(scriptSentences[index]);
    const voice = getCalmVoice();
    if (voice) utterance.voice = voice;
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      // If we are still in "playing" mode, schedule the next sentence
      if (speechRef.current) {
        setTimeout(() => {
          if (speechRef.current) {
            setCurrentIndex(index + 1);
            speakNextSentence(index + 1);
          }
        }, 500);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleSession = () => {
    if (isPlaying) {
      // PAUSE: Use browser pause to keep place
      window.speechSynthesis.pause();
      speechRef.current = false;
      setIsPlaying(false);
    } else {
      // RESUME or START
      
      // If we are finished (index 0, elapsed 0), start fresh
      if (currentIndex === 0 && elapsed === 0) {
         setDuration(88); // Reset estimate to 1:28
         speechRef.current = true;
         window.speechSynthesis.cancel(); // Clear any debris
         speakNextSentence(0);
         setIsPlaying(true);
      } 
      // If we are paused in the middle
      else {
         speechRef.current = true;
         window.speechSynthesis.resume();
         setIsPlaying(true);
         
         // Fallback: If resume() doesn't trigger speech (e.g. paused in silence gap)
         setTimeout(() => {
            if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending && speechRef.current) {
               // We were likely in a gap, force next sentence
               speakNextSentence(currentIndex);
            }
         }, 100);
      }
    }
  };

  // Timer: High-frequency update for smoothness
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsed(prev => {
          const newTime = prev + 0.05; // 50ms increments
          elapsedRef.current = newTime;
          return newTime;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Cleanup
  useEffect(() => {
    window.speechSynthesis.getVoices(); 
    return () => {
      speechRef.current = false;
      window.speechSynthesis.cancel();
    }
  }, []);

  const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate percentage based on TIME for smoothness
  const progressPercent = Math.min((elapsed / duration) * 100, 100);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold mb-6 text-center">Health Briefing</h2>
        
        <div className="w-full flex items-center gap-3 mb-4">
          <button 
            onClick={toggleSession}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg shrink-0 ${
              isPlaying ? 'bg-orange-500 shadow-orange-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${isPlaying ? 'bg-orange-500' : 'bg-blue-600'}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
               <span>{formatTime(elapsed)}</span>
               <span>{formatTime(duration)}</span>
            </div>
          </div>
          <Mic size={18} className={`shrink-0 ${isPlaying ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`} />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs leading-relaxed text-slate-600 italic text-center">
          "W-Health: Your integrated companion for SDG3, tracking vitals and empowering community well-being."
        </div>
      </div>
    </div>
  );
};